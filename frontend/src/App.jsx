import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ActivationPage, LoginPage, SignupPage } from "./routes/Routes";
import { useEffect } from "react";
import axios from "axios";
import { server } from "./server";
import { toast } from "react-toastify";

function App() {
  useEffect(() => {
    axios
      .get(`${server}/user/get-user`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/activation" element={<ActivationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// video => 03:41:00
