import React, { useState } from "react";
import "./AddFile.css"; // Import your CSS file
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const AddFile = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/OwnerAddFile?email=${localStorage.getItem("userEmail")}&songid=${localStorage.getItem("songid")}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/success"); // Redirect to success page or any other page after successful upload
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error accordingly
    }
  };

  return (
    <div className="add-file-form">
      <div className="section">
        <h2>Add File</h2>
        <div className="underline"></div>
        <form onSubmit={handleSubmit}>
          <label>Upload Song:</label>
          <input type="file" onChange={handleFileChange} />
          <label>Description:</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
};

export default AddFile;
