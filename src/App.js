import { useState,useEffect} from 'react';
import './App.css';
import { PacmanLoader } from 'react-spinners';
import Navbar from './components/Navbar';
import Belowbar from './components/Belowbar';
import Hero from './components/Hero';




function App() {
  //active state for markdown content
  const [activePath, setActivePath] = useState('/markdown/about.md');
  //Loading Screen
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <PacmanLoader color="#7739c7" />
      </div>
    );
  }
  return (
    <div className="AppHeader">
      <Navbar />
      <Belowbar setActivePath={setActivePath} />
      <Hero activePath={activePath} />
    </div>
  );
}

export default App;
