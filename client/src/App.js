import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sass/main.scss";

import Home from "./pages/Home/Home";
import Login from "./pages/admin/Login";
import HeadLogin from "./pages/head/HeadLogin";
import MemberLogin from "./pages/members/MemberLogin";

import Committee from "./pages/admin/Committee";
import AddCommittee from "./pages/admin/AddCommittee";
import Setting from "./pages/admin/Setting";

import AddMembers from "./pages/head/AddMembers";
import CreateMeeting from "./pages/head/CreateMeeting";
import CommitteeName from "./pages/head/CommitteeName";
import AllMeeting from "./pages/head/AllMeeting";
import SpecficMeeting from "./pages/head/SpecficMeeting";
import CreateResolution from "./pages/head/CreateResolution";
import AllResolutions from "./pages/head/AllResolutions";
import CommitteeNames from "./pages/head/CommitteeNames";
import Test from "./pages/head/Test";

function App(props) {
  return (
    <div>
      <Routes>
        <Route path="/admin" element={<Login />} />
        <Route exact path="/committees" element={<Committee />}></Route>
        <Route exact path="/addcommittee" element={<AddCommittee />}></Route>
        <Route exact path="/admin/setting" element={<Setting />}></Route>

        <Route path="/head/login" element={<HeadLogin />} />
        <Route exact path="/headAllCommittees" element={<CommitteeNames />} />

        <Route path="/:meetingName" element={<AllMeeting {...props} />}>
          <Route exact path="" element={<Test {...props} />} />
          <Route path="addmembers" element={<AddMembers />} />
          <Route path="meetings/createMeeting" element={<CreateMeeting />} />
        </Route>
        <Route
          path="/:meetingName/meetings/:meetingId"
          element={<SpecficMeeting />}
        />
        <Route
          path="/:meetingName/meetings/:meetingId/resolution"
          element={<AllResolutions />}
        />
        <Route
          path="/:meetingName/meetings/:meetingId/createResolution"
          element={<CreateResolution />}
        />

        <Route path="/member/login" element={<MemberLogin />} />
        <Route exact path="/" element={<Home />}></Route>
      </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
