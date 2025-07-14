// my-react-app/src/components/TransactionItem/TransactionItem.jsx
import { useState } from "react";

function TransactionItem({ transaction }) {
  // Protection contre les valeurs undefined
  if (!transaction) {
    return <div>Loading transaction...</div>;
  }

  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Protection contre les valeurs undefined avec valeurs par défaut
  const [editData, setEditData] = useState({
    category: transaction?.category || "Food",
    note: transaction?.note || "",
  });

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    setIsEditing(false); // Fermer l'édition si on collapse
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Ici on ferait l'appel API pour sauvegarder
    console.log("Saving transaction data:", editData);
    setIsEditing(false);
  };

  return (
    <div className="transaction-item">
      {/* Ligne principale */}
      <div className="transaction-row" onClick={toggleExpand}>
        <div className="transaction-column">{transaction.date || "N/A"}</div>
        <div className="transaction-column">
          {transaction.description || "N/A"}
        </div>
        <div className="transaction-column">{transaction.amount || "N/A"}</div>
        <div className="transaction-column">{transaction.balance || "N/A"}</div>
        <div className="transaction-column">
          <button className="expand-button">{isExpanded ? "∧" : "∨"}</button>
        </div>
      </div>

      {/* Détails dépliables */}
      {isExpanded && (
        <div className="transaction-details">
          <div className="transaction-detail-row">
            <span className="detail-label">Transaction type</span>
            <span className="detail-value-aligned">
              {transaction.transactionType || "N/A"}
            </span>
          </div>

          <div className="transaction-detail-row">
            <span className="detail-label">Category</span>
            <div className="detail-value-aligned">
              {isEditing ? (
                <select
                  className="detail-input"
                  value={editData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                >
                  <option value="Food">Food</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Transport">Transport</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Bills">Bills</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <>
                  {editData.category}
                  <button className="edit-icon" onClick={handleEdit}>
                    <i className="fa-solid fa-pencil"></i>
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="transaction-detail-row">
            <span className="detail-label">Note</span>
            <div className="detail-value-aligned">
              {isEditing ? (
                <input
                  type="text"
                  className="detail-input"
                  value={editData.note}
                  onChange={(e) => handleInputChange("note", e.target.value)}
                />
              ) : (
                <>
                  {editData.note}
                  <button className="edit-icon" onClick={handleEdit}>
                    <i className="fa-solid fa-pencil"></i>
                  </button>
                </>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="transaction-actions">
              <button className="edit-button" onClick={handleSave}>
                Save
              </button>
              <button
                className="edit-button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TransactionItem;
