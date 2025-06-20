const express = require("express");
const axios = require("axios");
const { desc } = require("framer-motion/client");
const cors = require("cors");


require("dotenv").config({ path: "./server/.env" });

const app = express();
app.use(
  cors({
    origin: "https://portfolio-website-rho-sand.vercel.app",
    credentials: true,
  })
);
app.use(express.json());
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
app.get("/api/issues", async (req, res) => {
  try {
    const response = await axios.get("https://api.github.com/issues", {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
      params: {
        per_page: 100, // Optional: fetch more issues at once
      },
    });

    const issues = response.data.map((issue) => ({
      id: issue.id,
      title: issue.title,
      repo: issue.repository.full_name,
      url: issue.html_url,
      state: issue.state,
      created_at: issue.created_at,
    }));

    res.json(issues);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch issues" });
  }
});

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.post("/api/chat", async (req, res) => {
  const { message, model } = req.body;

  // Only use Gemini if the model is gemini-2-flash (from your models array)
  if (model === "gemini-2-flash") {
    try {
      const geminiRes = await axios.post(
        `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
        {
          contents: [{ parts: [{ text: message }] }],
        }
      );
      const aiText =
        geminiRes.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't generate a response.";
      const aiResponse = {
        id: Date.now() + 1,
        text: aiText,
        timestamp: new Date(),
        model: model,
        isUser: false,
      };
      console.log("Gemini response:", aiResponse);
      return res.json({ aiMessage: aiResponse });
    } catch (err) {
      console.error("Gemini API error:", err?.response?.data || err.message);
      return res
        .status(500)
        .json({ error: "Error communicating with Gemini API." });
    }
  }

  // Fallback: Simulated response for other models
  const aiResponse = {
    id: Date.now() + 1,
    text: "I'm a demo AI assistant. This is a simulated response to show how the interface works!",
    timestamp: new Date(),
    model: model,
    isUser: false,
  };

  res.json({ aiMessage: aiResponse });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));