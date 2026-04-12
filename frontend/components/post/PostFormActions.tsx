interface PostFormActionsProps {
  onDiscard: () => void;
  onPost: () => void;
}

export default function PostFormActions({ onDiscard, onPost }: PostFormActionsProps) {
  return (
    <div className="flex items-center justify-between mb-10">
      <button
        onClick={onDiscard}
        className="bg-red-emergency text-white font-bold w-30 h-11 rounded-xl cursor-pointer hover:bg-red-emergency/80 transition-colors duration-100"
      >
        Discard
      </button>
      <button
        onClick={onPost}
        className="bg-green-light text-black w-30 py-2 rounded-xl font-bold cursor-pointer hover:bg-green-light/85 transition-colors duration-200"
      >
        Post
      </button>
    </div>
  );
}
