import React from "react";
import { useState } from "react";
import "./profile.css";



const Profile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const VectorDown = "/images/svg/VectorDown.svg";
  const VectorUp = "/images/svg/VectorUp.svg";


  const toggleMenu = () => setIsMenuOpen(profMenuState => !profMenuState);

  return (
    <div className="profile-wrapper">
      <button className="profile-btn" onClick={toggleMenu}>
        <img src="/images/svg/user-avatar.svg" alt="user-avatar" />
        <img src={isMenuOpen ? VectorUp : VectorDown} alt="arrow" />
      </button>
      {isMenuOpen && (
        <div className="profile-menu">
          <img className="profile-menu__rect" src="/images/svg/Rectangle.svg" alt=">" />
          <ul className="profile-menu__list">
            <li className="profile-menu__item">Profile</li>
            <li className="profile-menu__item">Log Out</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
