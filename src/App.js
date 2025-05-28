import { useState,useEffect} from 'react';
import './App.css';
import { PacmanLoader } from 'react-spinners';
import Navbar from './components/Navbar';






function App() {
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
    </div>
  );
}

export default App;
