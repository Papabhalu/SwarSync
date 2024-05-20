// Updated CreateSongForm.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './CreateSongForm.css';
import axios from 'axios';

const CreateSongForm1 = () => {
  const email = "anushkabanerjee03@gmail.com";
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    mainaudiofile: null,
    image: '',
    ownerroles: '',
    description: '',
    filedescription: '',
    lyrics: '',
    genres: [],
    languages: [],
  });

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenreChange = (e) => {
    const { options } = e.target;
     selectedGenres = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setSelectedGenres(selectedGenres);
    setFormData({ ...formData, genres: selectedGenres });
  };

  const handleRoleChange = (e) => {
    const { options } = e.target;
     selectedRoles = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setSelectedRoles(selectedRoles);
    setFormData({ ...formData, ownerroles: selectedRoles });
  };

  const handleLanguageChange = (e) => {
    const { options } = e.target;
    selectedLanguages = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setSelectedLanguages(selectedLanguages);
    setFormData({ ...formData, languages: selectedLanguages });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, mainaudiofile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5000/CreateSong?email=${email}`, {
        name: formData.name.trim,
        mainaudiofile: formData.mainaudiofile,
        image: formData.image,
        ownerroles: formData.ownerroles,
        description: formData.description,
        filedescription: formData.filedescription,
        lyrics: formData.lyrics,
        genres: formData.genres,
        languages: formData.languages
      });

      if (response.data.message) {
        console.log("Song Created successfully");
        setFormData({
          name: '',
          mainaudiofile: null,
          image: '',
          ownerroles: '',
          description: '',
          filedescription: '',
          lyrics: '',
          genres: [],
          languages: []
        });
        setSelectedGenres([]);
        setSelectedRoles([]);
        setSelectedLanguages([]);
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="song-create-form">
      <div className="section">
        <h2>Song Details</h2>
        <div className="underline"></div>
        
        <form onSubmit={handleSubmit} className="form-container">
          <label>Song Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
         
          <label>Song Cover Image:</label>
          <input type="file" name="image" value={formData.image} onChange={handleChange} required />
         
          <label>Main Audio File URL:</label>
          <input type="file" name="mainaudiofile" onChange={handleFileChange} required />
          

          <label>File Description:</label>
          <textarea name="filedescription" value={formData.filedescription} onChange={handleChange} required />

          <label>Lyrics:</label>
          <textarea name="lyrics" value={formData.lyrics} onChange={handleChange} required />

          <label>Owner Roles:</label>
          <select multiple onChange={handleRoleChange}>
          <option value="Songwriter">Songwriter</option>
        <option value="Producer">Producer</option>
        <option value="Composer">Composer</option>
        <option value="Singer">Singer</option>
        <option value="Guitarist">Guitarist</option>
        <option value="Drummer">Drummer</option>
        <option value="Pianist">Pianist</option>
        <option value="Bassist">Bassist</option>
        <option value="Violinist">Violinist</option>
        <option value="Fluteist">Fluteist</option>
        <option value="Soprano">Soprano</option>
          </select>
         

          <label>Genres:</label>
          <select multiple onChange={handleGenreChange}>
          <option value="Pop">Pop</option>
        <option value="Rock">Rock</option>
        <option value="Jazz">Jazz</option>
        <option value="Classical">Classical</option>
        <option value="Hip-Hop">Hip-Hop</option>
        <option value="Country">Country</option>
        <option value="R&B">R&B</option>
        <option value="Electronic">Electronic</option>
        <option value="Latin">Latin</option>
        <option value="Folk">Folk</option>
        <option value="Blues">Blues</option>
        <option value="Soul">Soul</option>
        <option value="Reggae">Reggae</option>
      </select>

          

          <label>Languages:</label>
          <select multiple onChange={handleLanguageChange}>
          <option value="English">English</option>
        <option value="Spanish">Spanish</option>
        <option value="Hindi">Hindi</option>
        <option value="French">French</option>
        <option value="German">German</option>
        <option value="Bengali">Bengali</option>
          </select>
          

          <button type="submit" onClick={handleSubmit}>Create Song</button>
        </form>
      </div>
    </div>
  );
};

export default CreateSongForm1;
