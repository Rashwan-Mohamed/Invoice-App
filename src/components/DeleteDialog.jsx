import React from "react";
import { useNavigate } from "react-router";

export default function DeleteDialog({
  id,
  handleDeleteInvoice,
  setDeleteConfirm,
  dark,
}) {
  const nave = useNavigate();
  return (
    <div className={!dark ? "deleteWrapper wdeleteWrapper" : "deleteWrapper"}>
      <section>
        <h2>Confirm Deletion</h2>
        <p>
          Are you sure you want to delete invoice {id}? This action cannot be
          undone.
        </p>
        <div className="btnsDelete">
          <button onClick={() => setDeleteConfirm(false)} className="discard">
            Cancel
          </button>
          <button
            onClick={() => {
              nave("/");
              handleDeleteInvoice(id);
              setDeleteConfirm(false);
            }}
            className="rgDelete"
          >
            Delete
          </button>
        </div>
      </section>
    </div>
  );
}
