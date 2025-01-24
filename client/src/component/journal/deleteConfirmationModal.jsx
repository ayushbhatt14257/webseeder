import React from 'react';
import "./style.css"
const DeleteConfirmationModal = ({ onDeleteConfirm, onCancel }) => {
    return (
      <div className="modal">
        <div className="modalContainer">

        {/* <div className="modal"> */}
          <h2>Confirm Deletion</h2>
          <p>Are you sure you want to delete this journal entry?</p>
          <button onClick={onDeleteConfirm}>Yes, Delete</button>
          <button onClick={onCancel}>Cancel</button>
        {/* </div> */}
        </div>
      </div>
    );
  };
export default DeleteConfirmationModal;  