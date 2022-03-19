import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sass/main.scss";

import Home from "./pages/Home/Home";
import Login from "./pages/admin/Login";
import Profile from "./sass/pages/profile/Profile";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin" element={<Login />} />
          <Route exact path="/" element={<Home />}></Route>
          {/* <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/dashboard" element={<Dashboard/>}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
