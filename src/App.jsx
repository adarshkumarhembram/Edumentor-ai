// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Planner from "./pages/Planner";
import Summarizer from "./pages/Summarizer";
import SearchPage from "./pages/SearchPage";
import Login from "./pages/Login";

// Auth Protection
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      {/* Full height wrapper */}
      <div className="flex flex-col min-h-screen bg-gray-100 w-full">
        {/* Sticky navbar */}
        <Navbar />

        {/* Main content fills space */}
        <main className="flex-1 w-full px-4 py-6 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/planner"
              element={
                <PrivateRoute>
                  <Planner />
                </PrivateRoute>
              }
            />
            <Route
              path="/summarizer"
              element={
                <PrivateRoute>
                  <Summarizer />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
