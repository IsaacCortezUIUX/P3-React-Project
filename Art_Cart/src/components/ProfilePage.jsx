// src/components/ProfilePage.jsx
import React from 'react';
import { useUser } from './UserContext'; // Import the context

function ProfilePage() {
  const { currentUser } = useUser(); // Get the current user from the context

  if (!currentUser) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="profile-page">
      <button>Back</button>
      <h2>Profile</h2>
      <p>Name: {currentUser.name}</p>
      <p>Email: {currentUser.email}</p>
    </div>
  );
}

export default ProfilePage;
