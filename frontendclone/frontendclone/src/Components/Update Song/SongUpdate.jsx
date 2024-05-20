import React, { useState } from "react";
import "./SongUpdate.css"; // Import your CSS file
import ImageUpload from "./UploadImage.jsx";

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

const SongUpdate = () => {
//   const [personalDetails, setPersonalDetails] = useState({
//     name: "",
//     email: "",
//     socialMediaHandles: {
//       facebook: "",
//       instagram: "",
//       twitter: "",
//       youtube: "",
//     },
//     dob: "",
//     address: "",
//     bio: "",
//   });

  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setPersonalDetails({
//       ...personalDetails,
//       [name]: value,
//     });
//   };

  const handleRoleChange = (e) => {
    const { value } = e.target;
    setSelectedRoles((prevRoles) =>
      prevRoles.includes(value)
        ? prevRoles.filter((role) => role !== value)
        : [...prevRoles, value]
    );
  };

  

  

//   const handleUpdateProfile = () => {
//     // Implement your update profile logic here
//     console.log("Profile updated!");
//   };

  return (
    <div className="song-update-form">
      <div className="songThumbnail">
        <ImageUpload />
      </div>

      <div className="section">
        <h2>Update Song Details</h2>
        <div className="underline"></div>
        <form>
          <label>Description:</label>
          <textarea
            name="description"
          ></textarea>

          <label>Lyrics:</label>
          <textarea
            name=""
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
        <h2>Other Info</h2>
        <div className="underline"></div>
        <form>
          <label>Languages:</label>
          <select name="languages" id="lang">
            <option value="Select">Select</option>
            <option value="Hindi">Hindi</option>
            <option value="Bengali">Bengali</option>
            <option value="English">English</option>
            <option value="Japanese">Japanese</option>
            <option value="Marathi">Marathi</option>
            <option value="Korean">Korean</option>
          </select>
          
          <hr />
          

          <label>Genres:</label>
          <select name="genres" id="genre">
            <option value="Select">Select</option>
            <option value="Rock">Rock</option>
            <option value="Hip Hop">Hip Hop</option>
            <option value="Jazz">Jazz</option>
            <option value="Classical">Classical</option>
            <option value="Electronic">Electronic</option>
          </select>
        </form>
      </div>
      <div className="update-button-section">
        <button>Update</button>
      </div>
    </div>
  );
};

export default SongUpdate;
