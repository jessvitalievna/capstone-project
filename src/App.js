import './App.css';
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

export default App;