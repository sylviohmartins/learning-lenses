import type { InputHTMLAttributes } from "react";
export function QuizOption({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="quiz-option">
      <input type="radio" {...props} />
      <span className="quiz-option__mark" aria-hidden="true" />
      <span>{label}</span>
    </label>
  );
}
