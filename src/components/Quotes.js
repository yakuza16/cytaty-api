import React, { useState, useEffect } from "react";
import axios from "axios";

const Quotes = () => {
  const [quotesArray, fetchAllQuotes] = useState([]);
  const [randomIndex, rollTheDice] = useState(0);
  const [previousQuotes, setPreviousQuotes] = useState("");
  const [isPreviousActive, setIsPrevious] = useState(false);
  useEffect(() => {
    downloadQuotes();
  }, []);

  async function downloadQuotes() {
    await axios
      .get(
        "https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json"
      )
      .then((res) => {
        const allQuotes = [];
        res.data.forEach((data) => allQuotes.push(data.quote));
        fetchAllQuotes([...allQuotes]);
        const quotesLength =
          Math.floor(Math.random() * (res.data.length - 0)) + 0;
        rollTheDice(() => quotesLength);
      });
  }

  const handleRandomQuote = () => {
    rollTheDice(() => Math.floor(Math.random() * (quotesArray.length - 0)) + 0);
    setPreviousQuotes(randomIndex);
    setIsPrevious((prev) => (prev = false));
  };

  const handlePreviousQuote = () => {
    setIsPrevious((prev) => (prev = true));
  };

  return (
    <div>
      {isPreviousActive ? (
        <p>{quotesArray[previousQuotes]}</p>
      ) : (
        <p>{quotesArray[randomIndex]}</p>
      )}
      <button onClick={handleRandomQuote}>Other random quote</button>
      <button onClick={handlePreviousQuote}>Previous quote </button>
    </div>
  );
};

export default Quotes;
