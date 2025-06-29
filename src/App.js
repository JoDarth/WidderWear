import "./App.css";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "./LoginPage";
import Header from "./Header.js";
import Footer from "./Footer.js";
import HomePage from "./HomePage.js";
import Shop from "./Shop.js";
import AddMerchPage from "./AddMerchPage.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const requireLogin = false;
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
  {requireLogin ? (
    // --- Login protection ON ---
    <>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/HomePage"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Shop"
        element={
          <ProtectedRoute>
            <Shop />
          </ProtectedRoute>
        }
      />
      <Route
        path="/AddMerchPage"
        element={
          <ProtectedRoute>
            <AddMerchPage />
          </ProtectedRoute>
        }
      />
    </>
  ) : (
    // --- Login protection OFF ---
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/HomePage" element={<HomePage />} />
      <Route path="/Shop" element={<Shop />} />
      <Route path="/AddMerchPage" element={<AddMerchPage />} />
    </>
  )}
</Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
