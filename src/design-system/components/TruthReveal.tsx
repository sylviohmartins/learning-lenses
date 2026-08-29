import type { TruthBlock } from "@/content/model";
export function TruthReveal({ truth }: { truth: TruthBlock }) {
  return (
    <section className="truth-reveal">
      <span className="truth-reveal__label">REGRA REAL</span>
      <h2>{truth.title}</h2>
      <p>{truth.body}</p>
      {truth.items && (
        <ul>
          {truth.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      <p className="truth-reveal__note">
        A narrativa é uma simplificação pedagógica. A regra oficial está nas fontes.
      </p>
    </section>
  );
}
