import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./App";
import ResponsesPage from "./responses/page";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/responses" element={<ResponsesPage />} />
      </Routes>
      <Toaster position="top-center" richColors />
    </BrowserRouter>
  </React.StrictMode>
);
