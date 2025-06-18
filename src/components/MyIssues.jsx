import React, { useEffect, useState } from "react";
import axios from "axios";

const MyIssues = () => {
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/issues`);
        setIssues(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch issues");
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">My GitHub Issues</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : issues.length === 0 ? (
        <p>No issues found.</p>
      ) : (
        <ul className="space-y-4">
          {issues.map((issue) => (
            <li key={issue.id} className="border rounded p-3 bg-gray-100">
              <div className="font-bold text-blue-700">{issue.title}</div>
              <div className="text-sm text-gray-600 mb-1">
                🗂️ {issue.repo} | 📅 {new Date(issue.created_at).toLocaleDateString()} | 🏷 {issue.state}
              </div>
              <a
                href={issue.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View on GitHub →
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyIssues;
