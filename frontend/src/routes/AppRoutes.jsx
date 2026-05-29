import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import CreateNeedPage from "../pages/CreateNeedPage";
import CreateAvailabilityPage from "../pages/CreateAvailabilityPage";
import MyNeedsPage from "../pages/MyNeedsPage";
import MyAvailabilitiesPage from "../pages/MyAvailabilitiesPage";
import NeedMatchesPage from "../pages/NeedMatchesPage";
import DonationRequestsPage from "../pages/DonationRequestsPage";
import MyRequestsPage from "../pages/MyRequestsPage";

export default function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="/needs/new"
          element={<CreateNeedPage />}
        />

        <Route
          path="/availabilities/new"
          element={<CreateAvailabilityPage />}
        />

        <Route
          path="/my-needs"
          element={<MyNeedsPage />}
        />

        <Route
          path="/my-availabilities"
          element={<MyAvailabilitiesPage />}
        />

        <Route
          path="/needs/:id/matches"
          element={<NeedMatchesPage />}
        />

        <Route
          path="/donation-requests"
          element={<DonationRequestsPage />}
        />

        <Route
          path="/my-requests"
          element={<MyRequestsPage />}
        />

      </Routes>

    </BrowserRouter>

  )
}