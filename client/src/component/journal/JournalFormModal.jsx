import React, { useState, useEffect } from "react";
import {
  createJournalEntry,
  updateJournalEntry,
} from "../services/journalService";

import "./style.css";
const JournalFormModal = ({
  closeFormModal,
  setShowQuoteModal,
  setMotivationalQuote,
  addNewEntry,
  selectedJournal,
  handleUpdate,
}) => {
  const [title, setTitle] = useState(
    selectedJournal ? selectedJournal.title : ""
  );
  const [content, setContent] = useState(
    selectedJournal ? selectedJournal.content : ""
  );
  const [mood, setMood] = useState(
    selectedJournal ? selectedJournal.mood : "Happy"
  );

  useEffect(() => {
    if (selectedJournal) {
      setTitle(selectedJournal.title);
      setContent(selectedJournal.content);
      setMood(selectedJournal.mood);
    }
  }, [selectedJournal]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEntry = {
      title,
      content,
      mood,
    };

    let response;

    if (selectedJournal) {
      // Update existing entry
      response = await updateJournalEntry(selectedJournal._id, newEntry);
      handleUpdate(response.updatedEntry); // Update the entry in the list
    } else {
      // Add new entry
      response = await createJournalEntry(newEntry);
      addNewEntry(response.newEntry);
      setMotivationalQuote(response.motivationalQuote);
      setShowQuoteModal(true);
    }

    closeFormModal();
  };

  return (
    
    <div className="modal">
      <div className="modalContainer">
      <form onSubmit={handleSubmit} className="form">
        <h3>
          {selectedJournal ? "Edit Journal Entry" : "Create New Journal Entry"}
        </h3>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          />
        <select value={mood} onChange={(e) => setMood(e.target.value)}>
          <option value="Happy">Happy</option>
          <option value="Neutral">Neutral</option>
          <option value="Sad">Sad</option>
        </select>
        <button type="submit">{selectedJournal ? "Update" : "Submit"}</button>
        <button type="button" onClick={closeFormModal}>
          Cancel
        </button>
      </form>
    </div>
</div>
  );
};

export default JournalFormModal;
