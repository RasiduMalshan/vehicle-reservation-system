import { useState, useEffect } from "react";
import axios from "axios";

const Profile = ({ user }) => {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    address: "",
    telephone: "",
    destinationDetails: "",
    password: ""
  });

  useEffect(() => {
    if (user) {
      axios.get(`/api/customers/${user.id}`)
        .then(response => setProfile(response.data))
        .catch(error => console.error("Error fetching profile:", error));
    }
  }, [user]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    axios.put(`/api/customers/${user.id}`, profile)
      .then(() => setEditMode(false))
      .catch(error => console.error("Error updating profile:", error));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile</h2>
      {editMode ? (
        <>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            name="telephone"
            value={profile.telephone}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            name="destinationDetails"
            value={profile.destinationDetails}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={profile.password}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          />
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        </>
      ) : (
        <>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Address:</strong> {profile.address}</p>
          <p><strong>Telephone:</strong> {profile.telephone}</p>
          <p><strong>Destination Details:</strong> {profile.destinationDetails}</p>
          <button onClick={() => setEditMode(true)} className="bg-gray-500 text-white px-4 py-2 rounded mt-4">Edit</button>
        </>
      )}
    </div>
  );
};

export default Profile;