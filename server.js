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

function getDailyRandomWord() {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    
    // Use the date string as a seed for consistent randomness per day
    let hash = 0;
    for (let i = 0; i < today.length; i++) {
        const char = today.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Use the hash to generate a consistent random index for the day
    const randomIndex = Math.abs(hash) % wordList.length;
    return wordList[randomIndex];
}

app.get("/word", (req, res) => {
    const word = getDailyRandomWord();
    res.json({ word });
});

app.get("/", (req, res) => {
    res.send("Daily Random Wordle Word API");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});