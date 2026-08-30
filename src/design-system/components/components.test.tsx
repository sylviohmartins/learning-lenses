import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProvider } from "@/app/providers/AppProvider";
import { PredictionChoice } from "./PredictionChoice";
import { QuizOption } from "./QuizOption";
import { FeedbackPanel } from "./FeedbackPanel";
import { SourceDrawer } from "./SourceDrawer";
import { MasteryMeter } from "./MasteryMeter";
import { ReviewCard } from "./ReviewCard";
import { scheduleInitialReview } from "@/domain/review/review";
import { FixedClock } from "@/domain/review/clock";
import { concepts } from "@/content";
import { Icon } from "@/design-system/primitives/Icon";

describe("componentes centrais", () => {
  it("Icon usa SVG coerente e só recebe nome quando necessário", () => {
    const { rerender } = render(<Icon name="home" data-testid="decorative-icon" />);
    expect(screen.getByTestId("decorative-icon")).toHaveAttribute("aria-hidden", "true");
    rerender(<Icon name="info" title="Informação" />);
    expect(screen.getByRole("img", { name: "Informação" })).toBeInTheDocument();
  });
  it("PredictionChoice e QuizOption expõem radios nomeados", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <>
        <PredictionChoice
          choices={[
            { id: "a", label: "Opção A" },
            { id: "b", label: "Opção B" },
          ]}
          value=""
          onChange={onChange}
          name="p"
        />
        <QuizOption name="extra" label="Extra" />
      </>,
    );
    await user.click(screen.getByRole("radio", { name: "Opção B" }));
    expect(onChange).toHaveBeenCalledWith("b");
    expect(screen.getByRole("radio", { name: "Extra" })).toBeInTheDocument();
  });
  it("FeedbackPanel anuncia acerto e erro sem depender apenas de cor", () => {
    const { rerender } = render(
      <FeedbackPanel correct correctText="Causa correta" wrongText="Correção" />,
    );
    expect(screen.getByRole("status")).toHaveTextContent("isso");
    rerender(<FeedbackPanel correct={false} correctText="Causa" wrongText="Onde quebra" />);
    expect(screen.getByRole("status")).toHaveTextContent("essa fofoca veio pela metade");
  });
  it("SourceDrawer abre, exibe metadados e fecha por teclado", async () => {
    const user = userEvent.setup();
    render(
      <AppProvider>
        <SourceDrawer sourceIds={["ec-132-2023"]} />
      </AppProvider>,
    );
    await user.click(screen.getByRole("button", { name: "De onde saiu essa fofoca?" }));
    expect(screen.getByRole("dialog")).toHaveTextContent("Emenda Constitucional");
    expect(screen.getByRole("link", { name: /Abrir fonte oficial/ })).toHaveAttribute(
      "target",
      "_blank",
    );
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  it("MasteryMeter possui nome, valor e nível", () => {
    render(<MasteryMeter mastery={74} level="understood" />);
    expect(screen.getByRole("meter", { name: /74%/ })).toHaveAttribute("aria-valuenow", "74");
    expect(screen.getByText("Compreendido")).toBeInTheDocument();
  });
  it("ReviewCard diferencia agenda de revisão pronta", async () => {
    const user = userEvent.setup();
    const onStart = vi.fn();
    const review = scheduleInitialReview(
      "cbs",
      "a-final-cbs",
      new FixedClock(new Date("2026-08-29T00:00:00.000Z")),
      "r",
    );
    render(
      <ReviewCard
        review={review}
        concept={concepts.find((item) => item.id === "cbs")!}
        due
        onStart={onStart}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Revisar agora" }));
    expect(onStart).toHaveBeenCalledOnce();
  });
});
