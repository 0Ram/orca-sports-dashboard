const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.static('public'));

// API endpoint to fetch matches
app.get('/api/matches', async (req, res) => {
    try {
        // Using a free football API (you might need to get a free API key)
        const response = await fetch('https://api.football-data.org/v4/matches', {
            headers: {
                'X-Auth-Token': '1ef72e5b358f4038b3f86dd69692e622' // Replace with your actual API key
            }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching matches:', error);
        res.status(500).json({ error: 'Failed to fetch matches' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});