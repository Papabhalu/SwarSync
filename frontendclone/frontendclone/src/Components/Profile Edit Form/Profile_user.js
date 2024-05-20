import React, { useState } from "react";
import "./Form.css"; // Import your CSS file
import ImageUpload from "./UploadImage.js";
import { useNavigate } from 'react-router-dom'; 
import axios from "axios";

const musicGenres = [
  "Rock",
  "Pop",
  "Hip Hop",
  "Jazz",
  "Classical",
  "Electronic",
];
const languages = [
  "English",
  "Hindi",
  "Bengali",
  "Marathi",
  "Japanese",
  "Korean",
];

const UserProfile = () => {
  const navigate = useNavigate();
  const [personalDetails, setPersonalDetails] = useState({
    name: "",
    email: "",
    socialMediaHandles: {
      facebook: "",
      instagram: "",
      twitter: "",
      youtube: "",
    },
    dob: "",
    address: "",
    bio: "",
  });

  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalDetails({
      ...personalDetails,
      [name]: value,
    });
    
  };

  const handleRoleChange = (e) => {
    const { value } = e.target;
    setSelectedRoles((prevRoles) =>
      prevRoles.includes(value)
        ? prevRoles.filter((role) => role !== value)
        : [...prevRoles, value]
    );
  };

  const handleGenreChange = (e) => {
    const { value } = e.target;
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(value)
        ? prevGenres.filter((genre) => genre !== value)
        : [...prevGenres, value]
    );
  };

  const handleLanguageChange = (e) => {
    const { value } = e.target;
    setSelectedLanguages((prevLanguages) =>
      prevLanguages.includes(value)
        ? prevLanguages.filter((lang) => lang !== value)
        : [...prevLanguages, value]
    );
  };

  const handleUpdateProfile = async () => {
    try {
      const email = localStorage.getItem('userEmail');
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/UpdateProfile?email=${email}`, // replace with your actual endpoint
        {
          name: personalDetails.name,
          gender: personalDetails.gender,
          facebookUrl: personalDetails.socialMediaHandles.facebook,
          instagramUrl: personalDetails.socialMediaHandles.instagram,
          xUrl: personalDetails.socialMediaHandles.twitter,
          sportifyUrl: personalDetails.socialMediaHandles.youtube,
    dob: personalDetails.dob,
    location: personalDetails.address,
    bio: personalDetails.bio,
    roles: selectedRoles,
    genres: selectedGenres,
    languages: selectedLanguages

        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      
      if (response.data.message) {
        console.log('Profile updated successfully:');
        navigate(`/Dashboard`);
      }else{
        console.log('Profile update failed:');
      }
    } catch (error) {
      console.error('Error updating profile:', error.response || error.message || error);
    }
  };

  return (
    <div className="user-profile-form">
      <div className="profileImage">
        <ImageUpload />
      </div>

      <div className="section">
        <h2>Personal Details</h2>
        <div className="underline"></div>
        <form>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={personalDetails.name}
            onChange={handleInputChange}
          />

<label>Email:</label>
          <input
            type="text"
            name="email"
            value={localStorage.getItem('userEmail')}
            onChange={handleInputChange}
            disabled
          />

          <label>Gender:</label>
          <select
            name="gender"
            value={personalDetails.gender}
            onChange={handleInputChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <label>Social Media Handles:</label>
          <input
            type="text"
            name="facebookHandle"
            value={personalDetails.socialMediaHandles.facebook}
            onChange={handleInputChange}
            placeholder="Facebook"
          />
          <input
            type="text"
            name="instagramHandle"
            value={personalDetails.socialMediaHandles.instagram}
            onChange={handleInputChange}
            placeholder="Instagram"
          />
          <input
            type="text"
            name="twitterHandle"
            value={personalDetails.socialMediaHandles.twitter}
            onChange={handleInputChange}
            placeholder="Twitter"
          />
          <input
            type="text"
            name="sportifyHandle"
            value={personalDetails.socialMediaHandles.youtube}
            onChange={handleInputChange}
            placeholder="Youtube"
          />

          <label>DOB:</label>
          <input
            type="date"
            name="dob"
            value={personalDetails.dob}
            onChange={handleInputChange}
          />

          <label>Address:</label>
          <textarea
            name="address"
            value={personalDetails.address}
            onChange={handleInputChange}
          ></textarea>

          <label>Bio:</label>
          <textarea
            name="bio"
            value={personalDetails.bio}
            onChange={handleInputChange}
          ></textarea>
        </form>
      </div>

      <div className="section">
        <h2>Roles</h2>
        <div className="underline"></div>
        <form>
          {[
            "Singer",
            "Songwriter",
            "Producer",
            "Composer",
            "Guitarist",
            "Drummer",
            "Pianist",
            "Bassist",
            "Violinist",
            "Fluteist",
            "Soprano",
          ].map((role) => (
            <label key={role}>
              <input
                type="checkbox"
                value={role}
                checked={selectedRoles.includes(role)}
                onChange={handleRoleChange}
              />
              {role}
            </label>
          ))}
          <div>Selected Roles: {selectedRoles.join(", ")}</div>
        </form>
      </div>

      <div className="section">
        <h2>Interests</h2>
        <div className="underline"></div>
        <form>
          <label>Genres:</label>
          <select multiple value={selectedGenres} onChange={handleGenreChange}>
            {musicGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <div>Selected Genres: {selectedGenres.join(", ")}</div>

          <hr />

          <label>Languages:</label>
          <select
            multiple
            value={selectedLanguages}
            onChange={handleLanguageChange}
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          <div>Selected Languages: {selectedLanguages.join(", ")}</div>
        </form>
      </div>
      <div className="update-button-section">
        <button onClick={handleUpdateProfile}>Update Profile</button>
      </div>
    </div>
  );
};

export default UserProfile;
