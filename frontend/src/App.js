import logo from './logo.svg';
import './App.css';

import { About, Footer, Header, Skills, Testmonial, Work } from './container'
// import { Navbar } from './components';
import Navbar from './components/Navbar/Navbar';
import './App.scss'
function App() {
  return (
    <div className='app'>
      <Navbar />
      <Header />
      <About />
      <Work />
      <Skills />
      <Testmonial />
      <Footer />
    </div>
  );
}

export default App;
