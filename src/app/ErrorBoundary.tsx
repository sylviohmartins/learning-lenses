import { Component, type ErrorInfo, type ReactNode } from "react";
import { Link } from "react-router-dom";
export class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Erro de interface recuperado", error, info);
  }
  render() {
    if (this.state.failed)
      return (
        <main className="error-page">
          <span className="eyebrow">ALGO SAIU DO ROTEIRO</span>
          <h1>A fofoca embolou.</h1>
          <p>
            A interface encontrou um erro inesperado, mas seus dados locais continuam guardados.
          </p>
          <Link className="button button--primary" to="/">
            Voltar ao início
          </Link>
        </main>
      );
    return this.props.children;
  }
}
