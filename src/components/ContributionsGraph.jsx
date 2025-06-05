import { useEffect, useState } from 'react';
import axios from 'axios';
// import './ContributionGraph.css'; // Ensure this is created

const ContributionGraph = ({ username }) => {
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    axios.get(`/api/contributions/${username}`)
      .then(res => setContributions(res.data))
      .catch(err => console.error(err));
  }, [username]);

  const getColor = (level) => {
    const colors = ['#151b23', '#c6e48b', '#7bc96f', '#239a3b', '#196127'];
    return colors[Math.min(level, colors.length - 1)];
  };

  return (
    <div className="contrib-graph">
      {contributions.map((week, i) => (
        <div key={i} className="contrib-week">
          {week.map((count, j) => (
            <div
              key={j}
              className="contrib-square"
              title={`${count} contributions`}
              style={{ backgroundColor: getColor(count) }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ContributionGraph;
