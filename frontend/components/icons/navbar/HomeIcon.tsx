import React from "react";

interface HomeIconProps extends React.SVGProps<SVGSVGElement> {}

export default function HomeIcon({
  width = 124,
  height = 65,
  className,
  ...props
}: HomeIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 124 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
      {...props}
    >
      <rect width="123.057" height="64.9145" fill="url(#pattern0_1448_2815)" />
      <defs>
        <pattern
          id="pattern0_1448_2815"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_1448_2815"
            transform="matrix(0.00586131 0 0 0.0111111 0.236241 0)"
          />
        </pattern>
        <image
          id="image0_1448_2815"
          width="90"
          height="90"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAACjElEQVR4nO3cvW4TURCG4ZFAJhSg0AKiggI6aMIdQAM9EhQ0VEBKWroYuIJUKYLooYIb4KchVBRQEYFTIogUkBLxoo22sAyJHfvsOTNz5ikje/f7JqtNRmtZJIQQQgghDAHmgEfAANgA+s3Phl8TZgScBN7yr/fAmVmPH2R3yBeBL+ztG7BQOqdpwC3gF+M1r7k54TF7Q7eg0V9YczvqSS2AQ8ATDu5x894xx26GuZ++1AA4Bjxnei+B+X2OP3olj9oQ74CzwEdm9wk4v8c5xhLPgCvAd9L5CVz7z3nqHTRwB9gmvR3ggdQ+aOAIsEL3ngFH23OOJZUsIV3ZXW4meaF4ASy0/7fmNtE5xQPgBrCFYuJgCeljgBhfQl5ghFgEnEu0hGQj1nSwhGQhlgCL7cJgjhh6ErKKbXOiWYElpCt6n9wAl4B1/BgAl0UTC0vIlH4Dt0vP19QSMqNl4HCpIR+3tIQk8Ao4kXvI5paQRD4DF3IN+arFJSTxk5vrXQ/Z7BKS2B/gYRcDbj4L8TR1WgdWk34OBFgq3UixpZSDLvE0xIpBDDqPrykHXcNSouLW0WuHHVd2iQ9FUhkphcpIDDqPGHQmMehMYtCZxKAziUFnEoPOxNWgpYJsrsqgOJurMijO5qoMirO5KoPibK7KoDibqzIozuaqDIqzuSqD4myuyqA4m6syKM7mqgyKs7kqg+JsrsqgOJurMijO5qoMirO5KoPibK7KoDibqzIozuaqDIqzuSqD4myuyqA4m6syKM7mqgyKs01TZpN6/Cg56HfU403JQd+nHndLf7foB/xbK/5N6cBp58NeA06JBu2Vfa+5jzn5A7kJvG5uF8Wv5BBCCCGEEEIIIQTR5y8J5kAMJ46sRAAAAABJRU5ErkJggg=="
        />
      </defs>
    </svg>
  );
}