// my-react-app/src/pages/Profile/Profile.jsx
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "../../store/slices/authSlice";
import Account from "../../components/Account/Account";
import EditProfile from "../../components/EditProfile/EditProfile";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state) => state.auth);

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

  const handleSaveProfile = async (newUserData) => {
    try {
      await dispatch(
        updateUserProfile({
          userName: newUserData.username,
        })
      ).unwrap();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleCancelEdit = () => {
    console.log("Cancel clicked");
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
        <EditProfile
          user={{
            username: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
          }}
          onSave={handleSaveProfile}
          onCancel={handleCancelEdit}
          isLoading={isLoading}
        />
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

export default Profile;
