import React, { useState, useEffect, useRef } from "react";
import sentences from "../utils/sentences";
import "../styles/styles.css";

const TypingSpeedTest = () => {
  const [sentence, setSentence] = useState("");
  const [input, setInput] = useState("");
  const [wpm, setWpm] = useState(null);
  const [bestWpm, setBestWpm] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const startTime = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    resetTest();
  }, []);

  useEffect(() => {
    if (input === sentence) {
      const endTime = new Date().getTime();
      const timeTaken = (endTime - startTime.current) / 60000; // in minutes
      const wordCount = sentence.split(" ").length;
      const calculatedWpm = Math.round(wordCount / timeTaken);
      setWpm(calculatedWpm);
      setIsCompleted(true);

      if (!bestWpm || calculatedWpm > bestWpm) {
        setBestWpm(calculatedWpm);
      }
    }
  }, [input, sentence, bestWpm]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (!startTime.current) {
      startTime.current = new Date().getTime();
    }

    if (sentence.startsWith(value)) {
      e.target.style.color = "black";
    } else {
      e.target.style.color = "red";
    }
  };

  const resetTest = () => {
    const randomSentence =
      sentences[Math.floor(Math.random() * sentences.length)];
    setSentence(randomSentence);
    setInput("");
    setWpm(null);
    setIsCompleted(false);
    startTime.current = null;
    inputRef.current.focus();
  };

  return (
    <div className="container">
      <h2>Typing Speed Test</h2>
      <p>Type the following sentence as quickly as you can:</p>
      <p className="sentence">{sentence}</p>

      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleInputChange}
        disabled={isCompleted}
        className="input"
        placeholder="Start typing here..."
      />

      {isCompleted && (
        <div>
          <p>Your speed: {wpm} WPM!</p>
          {wpm && bestWpm && <p>Best speed: {bestWpm} WPM</p>}
          <p>🎉 Congratulations on completing the sentence!</p>
        </div>
      )}

      <button onClick={resetTest} className="button">
        Reset Test
      </button>
    </div>
  );
};

export default TypingSpeedTest;
