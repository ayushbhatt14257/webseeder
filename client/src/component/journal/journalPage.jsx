// import React, { useState, useEffect } from "react";
// import { fetchEntries } from "../services/journalService";
// import { deleteJournalEntry } from "../services/journalService";
// import JournalFormModal from "./JournalFormModal";
// import MotivationalQuoteModal from "./MotivationalQuoteModal";

// const JournalPage = () => {
//   const [entries, setEntries] = useState([]);
//   const [moodFilter, setMoodFilter] = useState("");
//   const [showFormModal, setShowFormModal] = useState(false);
//   const [showQuoteModal, setShowQuoteModal] = useState(false);
//   const [motivationalQuote, setMotivationalQuote] = useState("");
//   const [selectedJournal, setSelectedJournal] = useState(null);
//   const [isUpdated, setIsUpdated] = useState(false);
  

//   // Fetch journal entries
//   useEffect(() => {
//     const loadEntries = async () => {
//       const data = await fetchEntries();
//       setEntries(data);
//     };
//     loadEntries();

//     // Only fetch if there is an update
//     if (isUpdated) {
//       setIsUpdated(false); // Reset the flag after fetching
//     }
//   }, [isUpdated]);

//   // Filter entries based on mood
//   const filteredEntries = entries.filter(
//     (entry) => !moodFilter || entry.mood === moodFilter
//   );

//   // Add new entry to the list
//   const addNewEntry = (newEntry) => {
//     setEntries((prevEntries) => [newEntry, ...prevEntries]); // Add to the top of the list
//     isUpdated(true);
//   };

//   // Update an existing journal entry
//   const handleUpdate = (updatedEntry) => {
//     if (updatedEntry) {
//       setEntries((prevEntries) =>
//         prevEntries.map((entry) =>
//           entry._id === updatedEntry._id ? updatedEntry : entry
//         )
//       );
//     }
//     setIsUpdated(true);
//   };

//   // Delete journal entry
//   const handleDelete = async (id) => {
//     const confirmation = window.confirm(
//       "Are you sure you want to delete this entry?"
//     );
//     if (confirmation) {
//       await deleteJournalEntry(id); // Call API to delete the entry
//       setEntries((prevEntries) =>
//         prevEntries.filter((entry) => entry._id !== id)
//       ); // Remove from state
//     }
//   };

//   return (
//     <div>
//       <h1>Journal Entries</h1>

//       <select
//         onChange={(e) => setMoodFilter(e.target.value)}
//         value={moodFilter}
//       >
//         <option value="">All moods</option>
//         <option value="Happy">Happy</option>
//         <option value="Neutral">Neutral</option>
//         <option value="Sad">Sad</option>
//       </select>

//       <button
//         onClick={() => {
//           setSelectedJournal(null); // Ensure no selected journal
//           setShowFormModal(true);
//         }}
//       >
//         Add New Journal Entry
//       </button>

//       <ul>
//         {filteredEntries.map((entry) => (
//           <li key={entry._id}>
//             <h3>{entry.title}</h3>
//             <p>{entry.content}</p>
//             <p>Mood: {entry.mood}</p>
//             <p>{new Date(entry.date).toLocaleString()}</p>
//             <button
//               onClick={() => {
//                 setSelectedJournal(entry);
//                 setShowFormModal(true);
//               }}
//             >
//               Edit
//             </button>
//             <button onClick={() => handleDelete(entry._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>

//       {/* Journal Form Modal */}
//       {showFormModal && (
//         <JournalFormModal
//           closeFormModal={() => setShowFormModal(false)}
//           setShowQuoteModal={setShowQuoteModal}
//           setMotivationalQuote={setMotivationalQuote}
//           addNewEntry={addNewEntry} // Pass addNewEntry to update the state
//           selectedJournal={selectedJournal}
//           handleUpdate={handleUpdate}
//         />
//       )}

//       {/* Motivational Quote Modal */}
//       {showQuoteModal && (
//         <MotivationalQuoteModal
//           quote={motivationalQuote}
//           closeModal={() => setShowQuoteModal(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default JournalPage;

// import React, { useState, useEffect } from "react";
// import { fetchEntries } from "../services/journalService";
// import { deleteJournalEntry } from "../services/journalService";
// import JournalFormModal from "./JournalFormModal";
// import MotivationalQuoteModal from "./MotivationalQuoteModal";
// import DeleteConfirmationModal from "./deleteConfirmationModal"


// const JournalPage = () => {
//   const [entries, setEntries] = useState([]);
//   const [moodFilter, setMoodFilter] = useState("");
//   const [showFormModal, setShowFormModal] = useState(false);
//   const [showQuoteModal, setShowQuoteModal] = useState(false);
//   const [motivationalQuote, setMotivationalQuote] = useState("");
//   const [selectedJournal, setSelectedJournal] = useState(null);
//   const [isUpdated, setIsUpdated] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [entryToDelete, setEntryToDelete] = useState(null);

//   // Fetch journal entries
//   useEffect(() => {
//     const loadEntries = async () => {
//       const data = await fetchEntries();
//       setEntries(data);
//     };
//     loadEntries();

//     if (isUpdated) {
//       setIsUpdated(false);
//     }
//   }, [isUpdated]);

//   const addNewEntry = (newEntry) => {
//     setEntries((prevEntries) => [newEntry, ...prevEntries]);
//     setIsUpdated(true);
//   };

//   const handleUpdate = (updatedEntry) => {
//     if (updatedEntry) {
//       setEntries((prevEntries) =>
//         prevEntries.map((entry) =>
//           entry._id === updatedEntry._id ? updatedEntry : entry
//         )
//       );
//     }
//     setIsUpdated(true);
//   };

//   const confirmDelete = async () => {
//     if (entryToDelete) {
//       await deleteJournalEntry(entryToDelete);
//       setEntries((prevEntries) =>
//         prevEntries.filter((entry) => entry._id !== entryToDelete)
//       );
//       setEntryToDelete(null);
//       setShowDeleteModal(false);
//     }
//   };

//   const cancelDelete = () => {
//     setEntryToDelete(null);
//     setShowDeleteModal(false);
//   };

//   const filteredEntries = entries.filter(
//     (entry) => !moodFilter || entry.mood === moodFilter
//   );

//   return (
//     <div>
//       <h1>Journal Entries</h1>

//       <select
//         onChange={(e) => setMoodFilter(e.target.value)}
//         value={moodFilter}
//       >
//         <option value="">All moods</option>
//         <option value="Happy">Happy</option>
//         <option value="Neutral">Neutral</option>
//         <option value="Sad">Sad</option>
//       </select>

//       <button
//         onClick={() => {
//           setSelectedJournal(null);
//           setShowFormModal(true);
//         }}
//       >
//         Add New Journal Entry
//       </button>

//       <ul>
//         {filteredEntries.map((entry) => (
//           <li key={entry._id}>
//             <h3>{entry.title}</h3>
//             <p>{entry.content}</p>
//             <p>Mood: {entry.mood}</p>
//             <p>{new Date(entry.date).toLocaleString()}</p>
//             <button
//               onClick={() => {
//                 setSelectedJournal(entry);
//                 setShowFormModal(true);
//               }}
//             >
//               Edit
//             </button>
//             <button
//               onClick={() => {
//                 setEntryToDelete(entry._id);
//                 setShowDeleteModal(true);
//               }}
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>

//       {showFormModal && (
//         <JournalFormModal
//           closeFormModal={() => setShowFormModal(false)}
//           setShowQuoteModal={setShowQuoteModal}
//           setMotivationalQuote={setMotivationalQuote}
//           addNewEntry={addNewEntry}
//           selectedJournal={selectedJournal}
//           handleUpdate={handleUpdate}
//         />
//       )}

//       {showQuoteModal && (
//         <MotivationalQuoteModal
//           quote={motivationalQuote}
//           closeModal={() => setShowQuoteModal(false)}
//         />
//       )}

//       {showDeleteModal && (
//         <DeleteConfirmationModal
//           onDeleteConfirm={confirmDelete}
//           onCancel={cancelDelete}
//         />
//       )}
//     </div>
//   );
// };

// export default JournalPage;
import React, { useState, useEffect } from "react";
import { fetchEntries } from "../services/journalService";
import { deleteJournalEntry } from "../services/journalService";
import JournalFormModal from "./JournalFormModal";
import MotivationalQuoteModal from "./MotivationalQuoteModal";
import DeleteConfirmationModal from "./deleteConfirmationModal";
import './new.css'

const JournalPage = () => {
  const [entries, setEntries] = useState([]);
  const [moodFilter, setMoodFilter] = useState("");
  const [showFormModal, setShowFormModal] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [motivationalQuote, setMotivationalQuote] = useState("");
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);

  // Fetch journal entries
  useEffect(() => {
    const loadEntries = async () => {
      const data = await fetchEntries();
      setEntries(data);
    };
    loadEntries();

    if (isUpdated) {
      setIsUpdated(false);
    }
  }, [isUpdated]);

  const addNewEntry = (newEntry) => {
    setEntries((prevEntries) => [newEntry, ...prevEntries]);
    setIsUpdated(true);
  };

  const handleUpdate = (updatedEntry) => {
    if (updatedEntry) {
      setEntries((prevEntries) =>
        prevEntries.map((entry) =>
          entry._id === updatedEntry._id ? updatedEntry : entry
        )
      );
    }
    setIsUpdated(true);
  };

  const confirmDelete = async () => {
    if (entryToDelete) {
      await deleteJournalEntry(entryToDelete);
      setEntries((prevEntries) =>
        prevEntries.filter((entry) => entry._id !== entryToDelete)
      );
      setEntryToDelete(null);
      setShowDeleteModal(false);
    }
  };

  const cancelDelete = () => {
    setEntryToDelete(null);
    setShowDeleteModal(false);
  };

  const filteredEntries = entries.filter(
    (entry) => !moodFilter || entry.mood === moodFilter
  );

  return (
    <div>
      <h1 className="homeh1">Journal Entries</h1>

      <select className="homeSelect"
        onChange={(e) => setMoodFilter(e.target.value)}
        value={moodFilter}
      >
        <option value="">All moods</option>
        <option value="Happy">Happy</option>
        <option value="Neutral">Neutral</option>
        <option value="Sad">Sad</option>
      </select>

      <button className="homeBtn"
        onClick={() => {
          setSelectedJournal(null);
          setShowFormModal(true);
          
        }}
      >
        Add New Journal Entry
      </button>

      <ul className="homeUl">
        {filteredEntries.map((entry) => (
          <li key={entry._id} className="homeLi"> 
            <h3>{entry.title}</h3>
            <p>{entry.content}</p>
            <p>Mood: {entry.mood}</p>
            <p>{new Date(entry.date).toLocaleString()}</p>
            <button className="homeBtn"
              onClick={() => {
                setSelectedJournal(entry);
                setShowFormModal(true);
              }}
            >
              Edit
            </button>
            <button className="homeBtn"
              onClick={() => {
                setEntryToDelete(entry._id);
                setShowDeleteModal(true);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {showFormModal && (
        <JournalFormModal
          closeFormModal={() => setShowFormModal(false)}
          setShowQuoteModal={setShowQuoteModal}
          setMotivationalQuote={setMotivationalQuote}
          addNewEntry={addNewEntry}
          selectedJournal={selectedJournal}
          handleUpdate={handleUpdate}
        />
      )}

      {showQuoteModal && (
        <MotivationalQuoteModal
          quote={motivationalQuote}
          closeModal={() => setShowQuoteModal(false)}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmationModal
          onDeleteConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default JournalPage;
