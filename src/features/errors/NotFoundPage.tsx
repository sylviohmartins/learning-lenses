import { Link } from "react-router-dom";
export function NotFoundPage() {
  return (
    <div className="error-page">
      <span className="eyebrow">404 · FORA DA EDIÇÃO</span>
      <h1>Essa fofoca não está no arquivo.</h1>
      <p>A rota ou o conteúdo procurado não existe.</p>
      <Link className="button button--primary" to="/">
        Voltar ao início
      </Link>
    </div>
  );
}
