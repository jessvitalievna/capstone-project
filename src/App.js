import './App.css';
import Header from './Header';
import Nav from './Nav';
import Main from './Main';
import Footer from './Footer';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Nav />
      <div className="main-content">
        <Main />
      </div>
      <Footer />
    </div>
  );
}

export default App;