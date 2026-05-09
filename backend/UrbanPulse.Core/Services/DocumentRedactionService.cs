using Google.Cloud.Vision.V1;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using SixLabors.ImageSharp.PixelFormats;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace UrbanPulse.Core.Services;

public class DocumentRedactionService
{
    private readonly Cloudinary _cloudinary;

    public DocumentRedactionService(Cloudinary cloudinary)
    {
        _cloudinary = cloudinary;
    }

    private static readonly string[] SensitivePatterns = new[]
    {
        @"^\d{13}$",
        @"^[A-Z]{1,2}\d{5,8}$",
        @"^[A-Z]{2}\d{6}$",
        @"^\d{4}$",
        @"^\d{2}/\d{2,4}$",
        @"^\d{2}\.\d{2}\.\d{4}$",
    };

    public async Task<string?> RedactAndUploadAsync(string imageUrl)
    {
        Console.WriteLine($"[REDACT] Starting...");
        try
        {
            Console.WriteLine($"[REDACT] Step 1: Downloading image from {imageUrl}");
            using var httpClient = new HttpClient();
            httpClient.Timeout = TimeSpan.FromSeconds(30);
            var imageBytes = await httpClient.GetByteArrayAsync(imageUrl);
            Console.WriteLine($"[REDACT] Step 2: Downloaded {imageBytes.Length} bytes");

            Console.WriteLine($"[REDACT] Step 3: Calling Google Vision API");
            var visionClient = ImageAnnotatorClient.Create();
            var image = Google.Cloud.Vision.V1.Image.FromBytes(imageBytes);
            var response = await visionClient.DetectTextAsync(image);
            Console.WriteLine($"[REDACT] Step 4: Vision returned {response.Count} annotations");

            Console.WriteLine($"[REDACT] Step 5: Loading image into ImageSharp");
            using var img = SixLabors.ImageSharp.Image.Load<Rgba32>(imageBytes);
            Console.WriteLine($"[REDACT] Step 6: Image loaded {img.Width}x{img.Height}");

            foreach (var annotation in response.Skip(1))
            {
                var text = annotation.Description?.Trim() ?? "";
                Console.WriteLine($"[REDACT] Checking text: '{text}' -> sensitive: {IsSensitive(text)}");
                if (!IsSensitive(text)) continue;

                var vertices = annotation.BoundingPoly?.Vertices;
                if (vertices == null || vertices.Count < 4) continue;

                var minX = vertices.Min(v => v.X);
                var minY = vertices.Min(v => v.Y);
                var maxX = vertices.Max(v => v.X);
                var maxY = vertices.Max(v => v.Y);

                var padding = 4;
                minX = Math.Max(0, minX - padding);
                minY = Math.Max(0, minY - padding);
                maxX = Math.Min(img.Width, maxX + padding);
                maxY = Math.Min(img.Height, maxY + padding);

                var width = maxX - minX;
                var height = maxY - minY;

                if (width <= 0 || height <= 0) continue;

                Console.WriteLine($"[REDACT] Blurring zone: {minX},{minY} -> {maxX},{maxY} size: {width}x{height}");

                var rect = new Rectangle(minX, minY, width, height);

                using var zone = img.Clone(ctx => ctx.Crop(rect));
                zone.Mutate(ctx => ctx.BoxBlur(10));
                img.Mutate(ctx => ctx.DrawImage(zone, new SixLabors.ImageSharp.Point(minX, minY), 1f));
            }

            Console.WriteLine($"[REDACT] Step 7: Saving to stream");
            using var outputStream = new MemoryStream();
            await img.SaveAsJpegAsync(outputStream);
            outputStream.Position = 0;

            Console.WriteLine($"[REDACT] Step 8: Uploading to Cloudinary");
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription("redacted.jpg", outputStream),
                Folder = "documents_redacted",
                Transformation = new Transformation().Quality("auto"),
            };

            var uploadResult = await _cloudinary.UploadAsync(uploadParams);
            if (uploadResult.Error != null)
            {
                Console.WriteLine($"[REDACT] Cloudinary error: {uploadResult.Error.Message}");
                return null;
            }

            Console.WriteLine($"[REDACT] Step 9: Done! URL: {uploadResult.SecureUrl}");
            return uploadResult.SecureUrl.ToString();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[REDACT] Error at: {ex.GetType().Name}: {ex.Message}");
            Console.WriteLine($"[REDACT] StackTrace: {ex.StackTrace}");
            return null;
        }
    }

    private static bool IsSensitive(string text)
    {
        if (string.IsNullOrWhiteSpace(text)) return false;

        foreach (var pattern in SensitivePatterns)
        {
            if (System.Text.RegularExpressions.Regex.IsMatch(text, pattern))
                return true;
        }

        if (System.Text.RegularExpressions.Regex.IsMatch(text, @"\d{6,}"))
            return true;

        return false;
    }
}