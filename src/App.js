import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';

function App() {
  return (




    <Router>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/editUser/:id" element={<EditUser />} />

      </Routes>

    </Router>



     

  );
}

export default App;
