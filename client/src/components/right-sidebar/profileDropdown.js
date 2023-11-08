import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import React, { useState } from 'react';

function ProfileDropdown() {
  const navigate = useNavigate();

  let token = localStorage.getItem('token');
  let decodedToken = jwt_decode(token);

  const placeholderImageUrl =
    'https://images-cdn.exchange.art/non_live_data/creator_data/fx2ccWDBMYN60nOnq5PhIcKVmM23/brands/JUGZ/avatar-539a591a-38cf-455f-bf23-dceb7bea74f9.image/png?optimize=low&auto=avifwebp'; // Replace with your placeholder image URL

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/Login');
    window.location.reload();
  };

  return (
    <>
      <div className="text-end profile-dropdown-container">
        <Dropdown>
          <Dropdown.Toggle className="user-dropdown">
            {decodedToken.image ? (
              <img
                className="nav-profile-pic"
                src={`http://localhost:3001/profileImages/${decodedToken.image}`}
                alt="..."
              />
            ) : (
              <img
                className="nav-profile-pic"
                src={placeholderImageUrl}
                alt="Placeholder"
              />
            )}
            <span>
              {decodedToken.firstName} {decodedToken.lastName}
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <div className="profile-dropdown-links">
              <Link to="/profile">My Profile</Link>
              {/* <Link to="/setting">Settings</Link> */}
              {'loggedIn' && 'isAdmin' && <Link to="/admin">Admin</Link>}
              <Link to="/CommunityRequests">Request</Link>
              <Dropdown.Divider />
              <Link to="/Login" onClick={handleLogout}>
                Log Out
              </Link>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
}

export default ProfileDropdown;
