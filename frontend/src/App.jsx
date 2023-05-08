import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, SignupPage } from "./routes/Routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// video => 03:41:00
