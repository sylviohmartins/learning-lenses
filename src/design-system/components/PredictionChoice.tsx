import { QuizOption } from "./QuizOption";
import type { Choice } from "@/content/model";
export function PredictionChoice({
  choices,
  value,
  onChange,
  name,
}: {
  choices: Choice[];
  value?: string;
  onChange(value: string): void;
  name: string;
}) {
  return (
    <div className="choice-list">
      {choices.map((choice) => (
        <QuizOption
          key={choice.id}
          name={name}
          value={choice.id}
          label={choice.label}
          checked={value === choice.id}
          onChange={() => onChange(choice.id)}
        />
      ))}
    </div>
  );
}
