import React from "react";

function List({ list, onRemove, onEdit, id }) {
  return (
    <div className="todos">
      {list}
      <button
        onClick={() => {
          onRemove(id);
        }}
        className="btn remove-btn"
      >
        Remove
      </button>

      <button
        onClick={() => {
          onEdit(id);
        }}
        className="btn edit-btn"
      >
        {/*when editing mode is clicked, then show ediable content otherwise no*/}
        Edit
      </button>
    </div>
  );
}

export default List;
