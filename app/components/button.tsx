type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  content?: string;
};

export function Button({
  type,
  content,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={` ${className} bg-accent-yellow text-primary-black hover:bg-accent-yellow-hover cursor-pointer px-2 py-2 font-medium transition-colors duration-300 ease-in-out`}
      {...props}
    >
      {children || content}
    </button>
  );
}
