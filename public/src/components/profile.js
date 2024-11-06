import React from 'react';

const Profile = ({ userName }) => {
  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome, {userName}!</p>
      {/* You can add additional information like user details, past results, etc. */}
    </div>
  );
};

export default Profile;