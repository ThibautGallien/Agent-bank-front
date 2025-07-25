// my-react-app/src/pages/User/User.jsx
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Account from "../../components/Account/Account";

function User() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Données mockées des comptes (en attendant la Phase 2)
  const accounts = [
    {
      id: 1,
      title: "Argent Bank Checking (x3448)",
      amount: "$48,098.43",
      description: "Available Balance",
    },
    {
      id: 2,
      title: "Argent Bank Savings (x6712)",
      amount: "$10,928.42",
      description: "Available Balance",
    },
    {
      id: 3,
      title: "Argent Bank Credit Card (x8349)",
      amount: "$184.30",
      description: "Current Balance",
    },
  ];

  const handleEditName = () => {
    navigate("/profile");
  };

  const handleViewTransactions = (accountId) => {
    navigate(`/profile/account/${accountId}/transactions`);
  };

  if (!user) {
    return (
      <main className="main profile-page">
        <div className="header">
          <h1>Loading...</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="main profile-page">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {user.firstName} {user.lastName}!
        </h1>
        <button className="edit-button" onClick={handleEditName}>
          Edit Name
        </button>
      </div>

      <>
        <h2 className="sr-only">Accounts</h2>
        {accounts.map((account) => (
          <Account
            key={account.id}
            title={account.title}
            amount={account.amount}
            description={account.description}
            onViewTransactions={() => handleViewTransactions(account.id)}
          />
        ))}
      </>
    </main>
  );
}

export default User;
