import {BrowserRouter, Routes, Route} from 'react-router-dom'
import "./sass/main.scss";
import Home from "./components/pages/Home/Home"
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          {/* <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/dashboard" element={<Dashboard/>}></Route> */}
          </Routes>
			</BrowserRouter>
    </div>
  );
}

export default App;
