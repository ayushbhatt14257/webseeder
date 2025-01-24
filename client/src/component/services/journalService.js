// src/services/journalService.js
const API_URL = "http://localhost:5000/api/entries";

export const fetchEntries = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(API_URL, {
    headers: {
      Authorization: ` ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const createJournalEntry = async (newEntry) => {
  const token = localStorage.getItem("token");
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: ` ${token}`,
    },
    body: JSON.stringify(newEntry),
  });
  const data = await response.json();
  return data;
};

export const updateJournalEntry = async (id, updatedEntry) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: ` ${token}`,
    },
    body: JSON.stringify(updatedEntry),
  });
  const data = await response.json();
  return data;
};

export const deleteJournalEntry = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: ` ${token}`,
    },
  });
  const data = await response.json();
  return data;
};
