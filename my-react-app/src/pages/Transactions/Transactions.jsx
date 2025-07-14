// my-react-app/src/pages/Transactions/Transactions.jsx
import { useParams, useNavigate } from "react-router-dom";
import TransactionItem from "../../components/TransactionItem/TransactionItem";

function Transactions() {
  const { accountId } = useParams();
  const navigate = useNavigate();

  // Données mockées du compte
  const accountData = {
    1: {
      title: "Argent Bank Checking (x3448)",
      amount: "$48,098.43",
      description: "Available Balance",
    },
    2: {
      title: "Argent Bank Savings (x6712)",
      amount: "$10,928.42",
      description: "Available Balance",
    },
    3: {
      title: "Argent Bank Credit Card (x8349)",
      amount: "$184.30",
      description: "Current Balance",
    },
  };

  // Données mockées des transactions
  const mockTransactions = [
    {
      id: 1,
      date: "27/02/20",
      description: "Golden Sun Bakery",
      amount: "$8.00",
      balance: "$298.00",
      transactionType: "Electronic",
      category: "Food",
      note: "lorem ipsum",
    },
    {
      id: 2,
      date: "27/02/20",
      description: "Golden Sun Bakery",
      amount: "$8.00",
      balance: "$298.00",
      transactionType: "Electronic",
      category: "Food",
      note: "lorem ipsum",
    },
    {
      id: 3,
      date: "27/02/20",
      description: "Golden Sun Bakery",
      amount: "$8.00",
      balance: "$298.00",
      transactionType: "Electronic",
      category: "Food",
      note: "lorem ipsum",
    },
    {
      id: 4,
      date: "27/02/20",
      description: "Golden Sun Bakery",
      amount: "$8.00",
      balance: "$298.00",
      transactionType: "Electronic",
      category: "Food",
      note: "lorem ipsum",
    },
    {
      id: 5,
      date: "27/02/20",
      description: "Golden Sun Bakery",
      amount: "$8.00",
      balance: "$298.00",
      transactionType: "Electronic",
      category: "Food",
      note: "lorem ipsum",
    },
  ];

  const account = accountData[accountId];

  const handleClose = () => {
    navigate("/profile");
  };

  if (!account) {
    return (
      <main className="main profile-page">
        <div className="header">
          <h1>Account not found</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="main profile-page">
      <div className="account-transactions">
        {/* Header du compte */}
        <div className="account-header">
          <div className="account-info">
            <h2>{account.title}</h2>
            <p className="account-balance">{account.amount}</p>
            <p className="account-description">{account.description}</p>
          </div>
          <button className="close-button" onClick={handleClose}>
            <i className="fa-solid fa-times"></i>
          </button>
        </div>

        {/* Liste des transactions */}
        <div className="transactions-list">
          {/* Header des colonnes */}
          <div className="transactions-header">
            <div className="transaction-column">Date</div>
            <div className="transaction-column">Description</div>
            <div className="transaction-column">Amount</div>
            <div className="transaction-column">Balance</div>
            <div className="transaction-column"></div>
          </div>

          {/* Items de transaction */}
          {mockTransactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Transactions;
