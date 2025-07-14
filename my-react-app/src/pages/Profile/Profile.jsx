import { useState } from "react";
import Account from "../../components/Account/Account";
import EditProfile from "../../components/EditProfile/EditProfile";
import Button from "../../components/Button/Button";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    firstName: "Tony",
    lastName: "Jarvis",
    username: "Tony",
  });

  // Données mockées des comptes
  const accounts = [
    {
      id: 1,
      title: "Argent Bank Checking (x8349)",
      amount: "$2,082.79",
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

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = (newUserData) => {
    setUser((prev) => ({
      ...prev,
      username: newUserData.username,
    }));
    setIsEditing(false);
    // TODO: API call to update profile
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleViewTransactions = (accountId) => {
    console.log("View transactions for account:", accountId);
    // TODO: Navigation vers page transactions
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        {isEditing ? (
          <EditProfile
            user={user}
            onSave={handleSaveProfile}
            onCancel={handleCancelEdit}
          />
        ) : (
          <>
            <h1>
              Welcome back
              <br />
              {user.firstName} {user.lastName}!
            </h1>
            <Button className="edit-button" onClick={handleEditProfile}>
              Edit Name
            </Button>
          </>
        )}
      </div>

      {!isEditing && (
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
      )}
    </main>
  );
}

export default Profile;
