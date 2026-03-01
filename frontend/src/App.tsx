import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { PublicShare } from "./pages/PublicShare"; // Import the new page

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect the empty "/" path to signin or dashboard */}
        <Route path="/" element={<Navigate to="/signin" />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/share/:shareLink" element={<PublicShare />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
