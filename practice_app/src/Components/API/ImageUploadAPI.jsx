import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ImageUploadAPI = () => {
  const [image, setImage] = useState(null);
  const [imgurl, setImgUrl] = useState("");
  const [recipe, setRecipe] = useState("");
  const [description, setDescription] = useState("");
  const [available, setAvailable] = useState(true);

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  const RecipeChange = (e) => {
    setRecipe(e.target.value);
  };

  const DescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const AvailableChange = (e) => {
    setAvailable(e.target.checked);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("recipe", recipe);
    formData.append("description", description);
    formData.append("available", available);

    const res = await axios.post(
      "http://127.0.0.1:8000/api/imageupload/",
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    setImgUrl(`${res.data.image}`);
  };
  return (
    <>
      <div>
        <input type="file" onChange={handleChange} />
        <div>
          <label>Recipe Name:</label>
          <input type="text" value={recipe} onChange={RecipeChange} />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={DescriptionChange} />
        </div>
        <div>
          <label>Available:</label>
          <input
            type="checkbox"
            checked={available}
            onChange={AvailableChange}
          />
        </div>
        <button onClick={handleSubmit}>Upload Image</button>
        {imgurl && (
          <div>
            <h3>Uploaded Image:</h3>
            <img src={imgurl} alt="Uploaded" style={{ width: "300px" }} />
          </div>
        )}
        <Link to="/update-image">Update Image</Link>
      </div>
    </>
  );
};

export default ImageUploadAPI;
