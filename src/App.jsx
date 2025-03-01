import "./App.css";
import { Routes, Route } from "react-router-dom";

//pages
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import UserSettingsPage from "./pages/UserSettingsPage";
import GroupSettingsPage from "./pages/GroupSettingsPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutUsPage from "./pages/AboutUsPage";

function App() {
  return (
    <>
      <Navbar />

      <main>
      <div className="main-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route
            path="/settings/users/:userId"
            element={<UserSettingsPage />}
          />
          <Route
            path="/settings/groups/:groupId"
            element={<GroupSettingsPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
