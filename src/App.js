import { useState,useEffect} from 'react';
import './App.css';
import { PacmanLoader } from 'react-spinners';
function App() {
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
      <PacmanLoader/>
      </div>
    );
  }
  return (
    <div className="App">
    Welcome
    </div>
  );
}

export default App;
