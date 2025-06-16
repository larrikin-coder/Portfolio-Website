import { useState, useEffect } from "react";
import "./App.css";
import { PacmanLoader } from "react-spinners";
import Navbar from "./components/Navbar";
import Belowbar from "./components/Belowbar";
import Hero from "./components/Hero";
import "github-markdown-css/github-markdown.css";
import {Routes,Route} from "react-router-dom";
import MyIssues from "./components/MyIssues";

function App() {
  //active state for markdown content
  const [activePath, setActivePath] = useState("/markdown/about.md");
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
      <Routes>
        {/* <Hero activePath={activePath} /> */}
        <Route path="/" element={<Hero activePath={activePath} />} />

        <Route
          path="/repositories"
          element={<Hero activePath="markdown/projects.md" />}
        />
        <Route
          path="/techstack"
          element={<Hero activePath="markdown/techstack.md" />}
        />
        <Route
          path="/MyIssues"
          element={<MyIssues/>}
        />
      </Routes>
      {/* <PinnedRepos /> */}
    </div>
  );
}

export default App;
