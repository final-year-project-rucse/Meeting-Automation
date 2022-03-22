import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sass/main.scss";

import Home from "./pages/Home/Home"
import Login from './pages/admin/Login';
import Committee from './pages/committee/Committee';
import AddCommittee from './pages/committee/AddCommittee';
import Setting from './pages/committee/Setting';
import AddMembers from "./pages/committee/AddMembers";
import CreateMeeting from "./pages/head/CreateMeeting";
import CommitteeName from "./pages/head/CommitteeName";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/admin' element={<Login />} />
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/committees" element={<Committee/>}></Route>
          <Route exact path="/addcommittee" element={<AddCommittee/>}></Route>
          <Route exact path="/setting" element={<Setting/>} ></Route>
          <Route exact path="/addmembers" element={<AddMembers/>} ></Route>
          {/* <Route exact path="/createMeeting" element={<CreateMeeting/>} ></Route> */}
          <Route exact path="/committeeName" element={<CommitteeName/>} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
