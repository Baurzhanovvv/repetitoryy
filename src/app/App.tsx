import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { EnglishPage } from "./pages/EnglishPage";
import { KazakhPage } from "./pages/KazakhPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/english" element={<EnglishPage />} />
        <Route path="/kazakh" element={<KazakhPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}