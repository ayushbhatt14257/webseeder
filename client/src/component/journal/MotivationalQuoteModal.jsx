import React from 'react';
import "./style.css"

const MotivationalQuoteModal = ({ quote, closeModal }) => {
  return (
    <div className="modal">
      <div className="modalContainer">

      <blockquote>
        <p>{quote.quote}</p>
        <footer>- {quote.author}</footer>
      </blockquote>
      <button onClick={closeModal}>Close</button>
    </div>
    </div>
  );
};

export default MotivationalQuoteModal;
