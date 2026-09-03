import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ContentProvider } from "./content/ContentProvider";

// админку в основной бандл не тянем — она нужна одному-двум людям
const AdminPage = lazy(() => import("./pages/AdminPage").then((m) => ({ default: m.AdminPage })));
import { HomePage } from "./pages/HomePage";
import { EnglishPage } from "./pages/EnglishPage";
import { KazakhPage } from "./pages/KazakhPage";
import { ThankYouPage } from "./pages/ThankYouPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { OfferPage } from "./pages/OfferPage";

export default function App() {
  return (
    <ContentProvider>
      <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/english" element={<EnglishPage />} />
        <Route path="/kazakh" element={<KazakhPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/offer" element={<OfferPage />} />
        <Route
          path="/admin"
          element={
            <Suspense fallback={<div style={{ padding: 40 }}>Загрузка редактора…</div>}>
              <AdminPage />
            </Suspense>
          }
        />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/thanks" element={<ThankYouPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </Router>
    </ContentProvider>
  );
}