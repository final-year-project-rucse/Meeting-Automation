import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sass/main.scss";

<<<<<<< HEAD
import Home from "./pages/Home/Home";
import Login from "./pages/admin/Login";
import Profile from "./sass/pages/profile/Profile";
=======
import Home from "./pages/Home/Home"
import Login from './pages/admin/Login';
import Committee from './pages/committee/Committee';

>>>>>>> bb60e3d89fe2f2578d873371da84bbe329df9874
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
<<<<<<< HEAD
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin" element={<Login />} />
          <Route exact path="/" element={<Home />}></Route>
=======
          <Route path='/admin' element={<Login />} />
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/committees" element={<Committee/>}></Route>
>>>>>>> bb60e3d89fe2f2578d873371da84bbe329df9874
          {/* <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/dashboard" element={<Dashboard/>}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
