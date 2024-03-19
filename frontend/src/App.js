import logo from './logo.svg';

import { About, Footer, Header, Skills, Testmonial, Work } from './container'
// import { Navbar } from './components';
import Navbar from './components/Navbar/Navbar';
import LocomotiveScroll from 'locomotive-scroll';
import './App.scss'
function App() {
  const locomotiveScroll = new LocomotiveScroll();
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
