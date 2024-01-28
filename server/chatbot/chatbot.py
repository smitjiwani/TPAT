import sys
import json
import random
import pickle
import nltk
import numpy as np
import os

from nltk.stem import WordNetLemmatizer
from keras.models import Sequential, load_model
from keras.layers import Dense

os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"

# Initialize the Lancaster Stemmer
lematizer = WordNetLemmatizer()

# Load the intents data from a JSON file
with open("intent.json") as file:
    data = json.load(file)


# Define a function to develop the neural network model
def develop_model(input_size, output_size):
    model = Sequential(
        [
            Dense(8, input_shape=(input_size,), activation="relu"),
            Dense(8, activation="relu"),
            Dense(8, activation="relu"),
            Dense((output_size), activation="softmax"),
        ]
    )
    model.compile(
        optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"]
    )
    return model


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
    if use_pre_trained_model and pre_trained_model:
        results = pre_trained_model.predict([bag_of_words(inp, words)])[0]
    else:

        results = model.predict([bag_of_words(inp, words)], verbose = 0)[0]

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
            "I apologize but I can't quite get you, could you please repeat your query",
            [],
        )


# Initialize variables for pre-trained model and flag for using it
pre_trained_model = None
use_pre_trained_model = False

# Attempt to load pre-processing data and pre-trained model
try:
    with open("data.pickle", "rb") as f:
        words, labels, training, output = pickle.load(f)
    try:
        pre_trained_model = load_model("model_keras.keras")
        use_pre_trained_model = True
    except FileNotFoundError:
        pass
except FileNotFoundError:
    # If pre-processing data or pre-trained model not found, perform data processing and training
    words = []
    labels = []
    docs_x = []
    docs_y = []

    for intent in data["intents"]:
        for pattern in intent["patterns"]:
            wrds = nltk.word_tokenize(pattern)
            words.extend(wrds)
            docs_x.append(wrds)
            docs_y.append(intent["tag"])
        if intent["tag"] not in labels:
            labels.append(intent["tag"])

    words = [lematizer.lemmatize(w.lower()) for w in words if w != "?"]
    words = sorted(list(set(words)))
    labels = sorted(labels)

    training = []
    output = []
    out_empty = [0 for _ in range(len(labels))]

    for x, doc in enumerate(docs_x):
        bag = []
        wrds = [lematizer.lemmatize(w.lower()) for w in doc]
        for w in words:
            if w in wrds:
                bag.append(1)
            else:
                bag.append(0)
        output_row = out_empty[:]
        output_row[labels.index(docs_y[x])] = 1

        training.append(bag)
        output.append(output_row)

    training = np.array(training)
    output = np.array(output)

    with open("data.pickle", "wb") as f:
        pickle.dump((words, labels, training, output), f)

    input_size = len(training[0])
    output_size = len(output[0])

    # Create and train the neural network model
    model = develop_model(input_size, output_size)
    model.fit(training, output, epochs=1000, batch_size=8, verbose=0)
    model.save("model_keras.keras")

out, queries = reply(sys.argv[1])
print(f"{{'out': '{out}', 'queries': {queries}}}")
