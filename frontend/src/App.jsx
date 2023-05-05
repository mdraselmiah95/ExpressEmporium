import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./routes/Routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
