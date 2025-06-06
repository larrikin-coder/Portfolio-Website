const express = require("express");
const axios = require("axios");
const { desc } = require("framer-motion/client");
require("dotenv").config({ path: "./server/.env" });

const app = express();
const PORT = process.env.PORT || 5000;
console.log(process.env.GITHUB_TOKEN);
app.get("/api/contributions/:username", async (req, res) => {
  const { username } = req.params;

  const query = `
    query {
      user(login: "${username}") {
        contributionsCollection {
          contributionCalendar {
          
            weeks {
              contributionDays {
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await axios.post(
      "https://api.github.com/graphql",
      { query },
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    const weeks =
      response.data.data.user.contributionsCollection.contributionCalendar
        .weeks;
    const contributions = weeks.map((week) =>
      week.contributionDays.map((day) => day.contributionCount)
    );

    res.json(contributions);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch contributions" });
  }
});


app.get("/api/repos/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
        params: {
          sort: "updated",
          per_page: 100, // Adjust as needed
        },
      });
      const repos = response.data.map((repo) => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        url: repo.html_url,
      }));
      res.json(repos);
    } catch (error) {
      console.error(error.response?.data || error.message);
      res.status(500).json({ error: "Failed to fetch repositories" });
    }

});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));