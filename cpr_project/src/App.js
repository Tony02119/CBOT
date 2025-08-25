import './App.css';
import Navbar from "./components/Navbar/Navbar";
import DisclaimerPopup from './components/DisclaimerPopup/DisclaimerPopup';
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Quiz from "./pages/Quiz/Quiz";
import Instructions from './pages/Instructions/Instructions';
import Instruction from './pages/Instructions/Instruction';
import Chatbot from "./pages/Chatbot/Chatbot";
import About from "./pages/About/About"
import { Routes, Route, Outlet, BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {

  //Popup
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('disclaimerAcceptedAt');
    const now = Date.now();
    if (!accepted || now - parseInt(accepted, 10) > 86400000) {
      setShowPopup(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('disclaimerAcceptedAt', Date.now().toString());
    setShowPopup(false);
  };

  // To handle the every pages layout
  const Layout = () => {
    return (
      <div>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  };


  // Routing throuh the pages
  return (
    <>
    {showPopup && <DisclaimerPopup onAccept={handleAccept} />}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="instructions" element={<Instructions />} />
          <Route path="cprinstruction" element={<Instruction />} />
          <Route path="aedinstruction" element={<Instruction />} />
          <Route path="chatbot" element={<Chatbot />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;