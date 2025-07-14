// my-react-app/src/components/Account/Account.jsx
function Account({ title, amount, description, onViewTransactions }) {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount">{amount}</p>
        <p className="account-amount-description">{description}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button
          className="transaction-button"
          onClick={onViewTransactions}
          aria-label="View transactions"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </section>
  );
}

export default Account;
