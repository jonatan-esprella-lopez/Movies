interface ButtonProps {
  icon: string;
  text: string;
  className: string;
}

export function MovieButton({ icon, text, className }: ButtonProps) {
  return (
    <button className={className}>
      <img src={icon} alt={text} className="icon-button-slider" />
      <span>{text}</span>
    </button>
  );
}
