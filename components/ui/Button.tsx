interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export default function Button({ text, ...restProps }: ButtonProps) {
  return (
    <button
      {...restProps}
      className="w-35 h-11 bg-white text-black rounded-full cursor-pointer text-lg hover:shadow-sm shadow-green-100/60 transition-all duration-200"
    >
      {text}
    </button>
  );
}
