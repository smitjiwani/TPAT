import sys
import json
import random
import pickle
import nltk
import numpy as np
import os

from nltk.stem import WordNetLemmatizer
from keras.models import load_model

os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"

# Initialize the Lancaster Stemmer
lematizer = WordNetLemmatizer()

# Load the intents data from a JSON file
with open("intent.json") as file:
    data = json.load(file)

# Attempt to load pre-processing data and pre-trained model
with open("data.pickle", "rb") as f:
    words, labels, training, output = pickle.load(f)


# Define a function to convert a user query into a bag of words
def bag_of_words(query, words):
    bag = [0 for _ in range(len(words))]
    s_words = nltk.word_tokenize(query)
    s_words = [lematizer.lemmatize(word.lower()) for word in s_words if word != "?"]

    for i in s_words:
        if i in words:
            bag[words.index(i)] = 1
    return bag


# Define the chat function
def reply(inp):
    results = model.predict([bag_of_words(inp, words)])[0]

    results_index = np.argmax(results)
    tag = labels[results_index]

    if results[results_index] > 0.7:
        for tg in data["intents"]:
            if tg["tag"] == tag:
                responses = tg["responses"]
                queries = tg.get("queries", []) 
                return (random.choice(responses), queries)
    else:
        return (
            "I apologise but I can't quite get you, could you please repeat your query",
            [],
        )


model = load_model("model_keras.keras")

out, queries = reply(sys.argv[1])
print(f"{{'out': '{out}', 'queries': {queries}}}")
