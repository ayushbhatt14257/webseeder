import React from 'react';
import "./style.css"

const MotivationalQuoteModal = ({ quote, closeModal }) => {
  return (
    <div className="modal">
      <blockquote>
        <p>{quote.quote}</p>
        <footer>- {quote.author}</footer>
      </blockquote>
      <button onClick={closeModal}>Close</button>
    </div>
  );
};

export default MotivationalQuoteModal;
