import {Routes,Route} from 'react-router-dom';
import LandingPage from "./Pages/LandingPage";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<SignUp/>}/>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
    </Routes>
    </>
    );
}

export default App
