import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header';
import Footer from './components/footer';
import Content from './components/content';
import Navbar1 from './components/navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Read from './components/read';
import Create from './components/create';
import Edit from './components/edit';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* Displays Nav Bar */}
        <Navbar1></Navbar1>

        {/* Routes to selected page */}
        <Routes>
          {/* Routes to Home page */}
          <Route path='/' element={<Content></Content>}></Route>

          {/* Routes to Read page */}
          <Route path='/read' element={<Read></Read>}></Route>

          {/* Routes to Create page */}
          <Route path='/create' element={<Create></Create>}></Route>

          {/* Routes to Edit page */}
          <Route path='/edit/:id' element={<Edit></Edit>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
