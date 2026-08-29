import type { StoryMessage } from "@/content/model";
export function MessageBubble({ message }: { message: StoryMessage }) {
  return (
    <article className={`message message--${message.character.toLowerCase()}`}>
      <span className="message__avatar" aria-hidden="true">
        {message.character.slice(0, 1)}
      </span>
      <div>
        <h3>{message.character}</h3>
        <p>{message.text}</p>
      </div>
    </article>
  );
}
