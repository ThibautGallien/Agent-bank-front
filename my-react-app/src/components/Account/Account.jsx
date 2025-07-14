import Button from "../Button/Button";

function Account({ title, amount, description, onViewTransactions }) {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount">{amount}</p>
        <p className="account-amount-description">{description}</p>
      </div>
      <div className="account-content-wrapper cta">
        <Button className="transaction-button" onClick={onViewTransactions}>
          View transactions
        </Button>
      </div>
    </section>
  );
}

export default Account;
