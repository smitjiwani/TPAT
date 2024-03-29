import { Router } from 'express'
import fs from 'fs'
import pkg from 'node-nlp'

const { SentimentAnalyzer } = pkg

const sia = new SentimentAnalyzer();

async function loadModel() {
  const data = await fs.promises.readFile('sentiment/model.json', 'utf-8')
  return JSON.parse(data)
}

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

const router = Router()

export const predictSentiment = async (req, res) => {
  try {
    const { text } = req.body;
    const sentiment = analyzeSentiment(text);
    console.log(sentiment)
    res.status(200).json({ text, sentiment })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const getSentimentData = async (req, res) => {
  try {
    const df = await loadModel()
    const sentimentCounts = df.sentiment.reduce((counts, sentiment) => {
      counts[sentiment] = (counts[sentiment] || 0) + 1;
      return counts;
    }, {})

    console.log(sentimentCounts)

    const sentimentData = Object.entries(sentimentCounts).map(([sentiment, count]) => ({
      sentiment,
      count
    }))

    res.status(200).json(sentimentData)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

router.get('/sentimentdata', getSentimentData)
router.post('/predict', predictSentiment)

export default router