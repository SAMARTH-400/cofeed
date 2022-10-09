import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import { useSelector } from "react-redux";
import Chat from "./pages/Chat";

function App() {
  const user = useSelector((state) => state.authReducer.authData);
  return (
    <div style={{  height: window.location.href === "http://localhost:3000/chat" ? "calc(100vh - 2rem)" : "auto"  }} >
      <Routes>
        <Route path="/" element={user ? <Navigate to="home" /> : <Navigate to="auth" />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/auth" />}/>
        <Route path="/auth" element={user ? <Navigate to="/home" /> : <Auth />} />
        <Route path="/profile/:id" element={user ? <Profile /> : <Navigate to="/auth" />} />
        <Route path="/chat" element={user ? <Chat /> : <Navigate to="/auth" />} />
      </Routes>
    </div>
  );
}

export default App;
