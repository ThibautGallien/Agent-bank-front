import { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";

function EditProfile({ user, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    username: user?.username || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="edit-user-info">
      <h2>Edit user info</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="User name:"
          type="text"
          id="username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <Input
          label="First name:"
          type="text"
          id="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          disabled={true}
        />
        <Input
          label="Last name:"
          type="text"
          id="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          disabled={true}
        />
        <div className="edit-buttons">
          <Button type="submit" className="edit-button">
            Save
          </Button>
          <Button type="button" className="edit-button" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
