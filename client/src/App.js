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
import AllMeeting from "./pages/head/AllMeeting";
import SpecficMeeting from "./pages/head/SpecficMeeting";
import CreateResolution from "./pages/head/CreateResolution";
import AllResolutions from "./pages/head/AllResolutions";
import HeadLogin from "./pages/head/HeadLogin";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/head/login" element={<HeadLogin />} />
          <Route path='/admin' element={<Login />} />
          <Route path="/:meetingName/meetings/:meetingId/resolution" element={<AllResolutions />} />
          <Route path="/:meetingName/meetings/:meetingId/createResolution" element={<CreateResolution />} />
          <Route path="/:meetingName/meetings/:meetingId" element={<SpecficMeeting />} />
          <Route path="/:meetingName/meetings" element={<AllMeeting />} />
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/committees" element={<Committee/>}></Route>
          <Route exact path="/addcommittee" element={<AddCommittee/>}></Route>
          <Route exact path="/setting" element={<Setting/>} ></Route>
          
          {/* <Route exact path="/createMeeting" element={<CreateMeeting/>} ></Route> */}
          <Route exact path="/:committeeName" element={<CommitteeName/>} ></Route>
          <Route exact path="/:committeeName/addmembers" element={<AddMembers/>} ></Route>
          <Route exact path="/createMeeting" element={<CreateMeeting/>} ></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
