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
      <main className="main-content">
        <Main>…</Main>
      </main>
      <Footer />
    </div>
  );
}

export default App;