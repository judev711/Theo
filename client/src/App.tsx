import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { useAuth, RedirectToSignIn } from "@clerk/clerk-react";
import React from "react";

import Loader from "./components/Loader";

// Pages
import Login from "./components/Login";
import Acceuil from "./components/Acceuil";
import DashboardC from "./components/DashboardC";
import Profile from "./components/Profile";
import Notification from "./components/Notification";
import Leaves from "./components/Leaves";
import Reportproblem from "./components/Reportproblem";
import Register from "./components/Register";
import Presence from "./components/Presence";
import Erreur from "./components/Erreur";
import Toast from "./components/Toastify";
import DarkMode from "./components/DarkMode";
import Statics from "./components/Statics";
import Getlocation from "./components/GetLocation"
import Infos from "./components/Infos";
import NOTIF from "./components/NOTIF";
// import PresenceConfirmation from "./components/PresenceConfirmation";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return <Loader />;
  if (!isSignedIn) return <RedirectToSignIn redirectUrl="/presence" />;

  return <>{children}</>;
};

// 🔥 Configuration Clerk pour la redirection après connexion


// Routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Acceuil />} />
      <Route path="/Acceuil" element={<Acceuil />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/notif" element={<Toast />} />
      <Route path="/darkmode" element={<DarkMode />} />
      <Route path="/Stat" element={<Statics />} />
      <Route path="/getP" element={<Getlocation />} />
      <Route path="/infos" element={<Infos/>}/>
      <Route path="news" element={<NOTIF/>}/>

      {/* Pages protégées */}
      <Route
        path="/presence"
        element={
          <ProtectedRoute>
            <Presence />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <DashboardC />
          </ProtectedRoute>
        }
      />
      <Route
        path="/userdetail"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notification />
          </ProtectedRoute>
        }
      />
      <Route
        path="/leaves"
        element={
          <ProtectedRoute>
            <Leaves />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reportproblem"
        element={
          <ProtectedRoute>
            <Reportproblem />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Erreur />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
