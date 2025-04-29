import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./index.css";
import DocumentationPage from "./pages/DocumentationPage";
import HomePage from "./pages/HomePage";
import SoundLibraryPage from "./pages/SoundLibraryPage";

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/docs" element={<DocumentationPage />} />
          <Route path="/sounds" element={<SoundLibraryPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
