import { ButtonProps } from "../interfaces/interfaces";

export function MovieButton({ icon, text, className }: ButtonProps) {
  return (
    <button className={className}>
      <img src={icon} alt={text} className="icon-button-slider" />
      <span>{text}</span>
    </button>
  );
}
