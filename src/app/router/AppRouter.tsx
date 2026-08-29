import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "@/app/shell/AppShell";
import { HomePage } from "@/features/home/HomePage";
import { OnboardingPage } from "@/features/onboarding/OnboardingPage";
import { LearnPage } from "@/features/learn/LearnPage";
import { EpisodePage } from "@/features/learn/EpisodePage";
import { FinalAssessmentPage } from "@/features/learn/FinalAssessmentPage";
import { ReviewPage } from "@/features/review/ReviewPage";
import { DossierPage } from "@/features/dossier/DossierPage";
import { ConceptPage } from "@/features/dossier/ConceptPage";
import { SourcesPage } from "@/features/sources/SourcesPage";
import { SettingsPage } from "@/features/settings/SettingsPage";
import { NotFoundPage } from "@/features/errors/NotFoundPage";
export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="onboarding" element={<OnboardingPage />} />
          <Route path="learn" element={<LearnPage />} />
          <Route path="learn/:moduleId" element={<Navigate to="/learn" replace />} />
          <Route path="episode/:episodeId" element={<EpisodePage />} />
          <Route path="assessment" element={<FinalAssessmentPage />} />
          <Route path="review" element={<ReviewPage />} />
          <Route path="dossier" element={<DossierPage />} />
          <Route path="dossier/:conceptId" element={<ConceptPage />} />
          <Route path="sources" element={<SourcesPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="not-found" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
