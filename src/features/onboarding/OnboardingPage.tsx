import { useNavigate } from "react-router-dom";
import { useApp } from "@/app/providers/AppProvider";
import { Button } from "@/design-system/components/Button";
export function OnboardingPage() {
  const { completeOnboarding } = useApp();
  const navigate = useNavigate();
  return (
    <div className="onboarding">
      <span className="onboarding__stamp">COMO FUNCIONA</span>
      <h1>Aprenda a Reforma Tributária como se alguém estivesse te contando uma fofoca.</h1>
      <p>
        Você acompanha a história, decide em quem acreditar e depois descobre o que a regra
        realmente diz.
      </p>
      <div className="onboarding__principle">
        <span aria-hidden="true">01</span>
        <p>
          <strong>A conversa abre a porta.</strong>
          <br />A fonte oficial fecha a questão.
        </p>
      </div>
      <Button
        onClick={() => {
          completeOnboarding();
          navigate("/episode/ep-1");
        }}
      >
        Começar a fofoca
      </Button>
    </div>
  );
}
