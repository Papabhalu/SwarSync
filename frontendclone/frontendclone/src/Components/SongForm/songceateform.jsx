import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './CreateSongForm.css';
import axios from 'axios';


let email=localStorage.getItem('userEmail')

console.log(process.env.REACT_APP_BACKEND_URL);
const CreateSongForm = () => {
  const { email, name } = useParams();
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


  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenreChange = (e) => {
    const { options } = e.target;
    const selectedGenres = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setFormData({ ...formData, genres: selectedGenres });
  };

  const handleRoleChange = (e) => {
    const { options } = e.target;
    const selectedRoles = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setFormData({ ...formData, ownerroles: selectedRoles });
  }

  const handleLanguageChange = (e) => {
    const { options } = e.target;
    const selectedLanguages = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
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
        }
        );
      }
      else{
        alert(response.data.error);
    }
      // Handle success (e.g., redirect to a different page)
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: 'auto' }}>
      <label>Song Name:</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} required />

      <label>Description:</label>
      <textarea name="description" value={formData.description} onChange={handleChange} required />

      <label>Image URL:</label>
      <input type="text" name="image" value={formData.image} onChange={handleChange} required />

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

      <label>Main Audio File URL:</label>
      <input type="text" name="mainaudiofile" onChange={handleChange} required />

      <label>File Description:</label>
      <textarea name="filedescription" value={formData.filedescription} onChange={handleChange} required />

      <label>Lyrics:</label>
      <textarea name="lyrics" value={formData.lyrics} onChange={handleChange} required />

      <button type="submit" onClick={handleSubmit}>Create Song</button>
    </form>
  );
};

export default CreateSongForm;
