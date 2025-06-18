import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
// import './ContributionGraph.css';


const days = ['Mon', '', 'Wed', '', 'Fri', '', ''];
const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const ContributionGraph = ({ username }) => {
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/contributions/${username}`)
      .then(res => setContributions(res.data))
      .catch(err => console.error(err));
  }, [username]);

  const getColor = (level) => {
    const colors = ['#151b23', '#c6e48b', '#7bc96f', '#239a3b', '#196127'];
    return colors[Math.min(level, colors.length - 1)];
  };

  // Estimate first day of the year for label alignment
  const getMonthLabels = () => {
    const labels = [];
    const totalWeeks = contributions.length;
    for (let i = 0; i < totalWeeks; i++) {
      if (i % 4 === 0) {
        // Every ~4 weeks = ~1 month
        labels.push(months[Math.floor(i / 4) % 12]);
      } else {
        labels.push('');
      }
    }
    return labels;
  };

  const monthLabels = getMonthLabels();

  return (
    <div className="d-flex">
      {/* Weekday labels */}
      <div className="d-flex flex-column me-2 mt-4" style={{ fontSize: '0.75rem', color: '#ccc' }}>
        {days.map((day, i) => (
          <div key={i} style={{ height: '14px' }}>{day}</div>
        ))}
      </div>

      <div>
        {/* Month labels */}
        <div className="d-flex ms-3 mb-1" style={{ fontSize: '0.75rem', color: '#ccc' }}>
          {monthLabels.map((label, i) => (
            <div key={i} className="text-center" style={{ width: '14px' }}>{label}</div>
          ))}
        </div>

        {/* Contribution squares */}
        <div className="d-flex">
          {contributions.map((week, i) => (
            <div key={i} className="d-flex flex-column" style={{marginRight: "0.2rem"}}>
              {week.map((count, j) => (
                <motion.div
                  key={j}
                  className="contrib-square"
                  style={{ backgroundColor: getColor(count) }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.01 * (i * 7 + j) }}
                  title={`${count} contributions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContributionGraph;
