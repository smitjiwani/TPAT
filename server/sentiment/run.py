from flask import Flask, render_template, jsonify, request
import pandas as pd
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk
import joblib

app = Flask(__name__)

def analyze_sentiment(tweet):
    sia = SentimentIntensityAnalyzer()
    polarity = sia.polarity_scores(tweet)["compound"]

    if polarity > 0.05:
        return "Positive"
    elif polarity < -0.05:
        return "Negative"
    else:
        return "Neutral"
    
df = joblib.load('sentiment_model.pkl')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/sentiment_data')
def get_sentiment_data():
    # Calculate the count of each sentiment
    sentiment_counts = df["sentiment"].value_counts()

    # Convert the sentiment_counts to a JSON format
    sentiment_data = [{"sentiment": sentiment, "count": count} for sentiment, count in sentiment_counts.items()]
    return jsonify(sentiment_data)

@app.route('/predict', methods=['POST'])
def predict_sentiment():
    if request.method == 'POST':
        text = request.form['text']
        sentiment = analyze_sentiment(text)
        return render_template('prediction.html', text=text, sentiment=sentiment)

if __name__ == "__main__":
    app.run(debug=True, port=5001)
