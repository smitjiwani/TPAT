import express from 'express';
import fs from 'fs';
import { SentimentIntensityAnalyzer } from 'node-nlp';
import bodyParser from 'body-parser';

const api = express();
const sia = new SentimentIntensityAnalyzer();

// Load the pre-trained model
const df = JSON.parse(fs.readFileSync('sentiment_model.json', 'utf-8'));

// Middleware for parsing JSON requests
api.use(bodyParser.json());

// Function to analyze sentiment
function analyzeSentiment(tweet) {
    const polarity = sia.getSentiment(tweet).score;

    if (polarity > 0.05) {
        return "Positive";
    } else if (polarity < -0.05) {
        return "Negative";
    } else {
        return "Neutral";
    }
}


api.get('/sentiment_data', (req, res) => {
    const sentimentCounts = df.sentiment.reduce((counts, sentiment) => {
        counts[sentiment] = (counts[sentiment] || 0) + 1;
        return counts;
    }, {});

    const sentimentData = Object.entries(sentimentCounts).map(([sentiment, count]) => ({
        sentiment,
        count
    }));

    res.json(sentimentData);
});

api.post('/predict', (req, res) => {
    const { text } = req.body;

    if (text) {
        const sentiment = analyzeSentiment(text);
        res.json({ text, sentiment });
    } else {
        res.status(400).json({ error: 'No text provided' });
    }
});


