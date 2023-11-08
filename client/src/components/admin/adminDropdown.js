import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from "react-router-dom";

function ProfileDropdown() {
  const navigate = useNavigate();

  const handleadminLogout = () => {
    //localStorage.removeItem("token");
    navigate('/Home');
    window.location.reload();
  };
  return (
    <>
      <div className='text-end profile-dropdown-container'>
        <Dropdown>
          <Dropdown.Toggle className='user-dropdown'>
            <img
              className='nav-profile-pic'
              src="https://images-cdn.exchange.art/non_live_data/creator_data/fx2ccWDBMYN60nOnq5PhIcKVmM23/brands/JUGZ/avatar-539a591a-38cf-455f-bf23-dceb7bea74f9.image/png?optimize=low&auto=avifwebp"
              alt="..."
            />
            <span>Admin</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <div className='profile-dropdown-links'>
              <Link to="/profile">My Profile</Link> {/* Use Link here */}
              <Link to="/setting">Settings</Link> {/* Use Link here */}
              {'loggedIn' && 'isAdmin' && (
                <Link to="/admin">Admin</Link>
              )}
              <Dropdown.Divider />
              <Link to="/Home" onClick={'handleadminLogout'}>
                Log Out
              </Link> {/* Use Link here */}
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
}

export default ProfileDropdown;
