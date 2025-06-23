/* import './App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <Main />
      </div>
      <Footer />
    </div>
  );
}

export default App; */


import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import BookingPage from './BookingPage';
import Footer from './Footer';
import './App.css';

function App() {
  return (
    <>
          <Header />
              <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
          <Footer />
    </>
  );
}

export default App;