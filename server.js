const express = require("express");
const wordList = require("./word_list");

const app = express();
const PORT = process.env.PORT || 3000;

// Add CORS support
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

function getDailyWord() {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const dayNumber = Math.floor(new Date(today).getTime() / (1000 * 60 * 60 * 24));
    const index = dayNumber % wordList.length;
    return wordList[index];
}

app.get("/word", (req, res) => {
    const word = getDailyWord();
    res.json({ word });
});

app.get("/", (req, res) => {
    res.send("Daily Wordle Word API");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
[file content end]