import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ActivationPage, LoginPage, SignupPage } from "./routes/Routes";
import { useEffect } from "react";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";

function App() {
  useEffect(() => {
    Store.dispatch(loadUser());
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
