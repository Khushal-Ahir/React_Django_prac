// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const UpdateImage = () => {
//   const [imgData, setImgData] = useState([]);
//   const [updateImgData, setUpdateImgData] = useState([]);
//   const [editData, setEditData] = useState(false);

//   const handleEdit = (data) => {
//     setEditData(data);
//   };
//   const updateData = async () => {
//     const response = await axios.put(
//       `http://127.0.0.1:8000/api/imageupload/${editData.id}`
//     );
//   };
//   useEffect(() => {
//     const fetchImage = async () => {
//       const response = await axios.get(
//         "http://127.0.0.1:8000/api/imageupload/"
//       );
//       setImgData(response.data);
//       console.log(response.data);
//     };

//     fetchImage();
//   }, []);

//   return (
//     <>
//       {imgData.map((item, idx) => (
//         <div className="fetch_image">
//           {editData ? (
//             <div className="form-wrapper">
//               <form action="" method="post" onSubmit={updateData}>
//                 <label>Image</label>
//                 <input type="file" name="image" value={item.image} />

//                 <label htmlFor="">Recipe</label>
//                 <input type="text" value={item.recipe} />

//                 <button type="submit">Update</button>
//               </form>
//             </div>
//           ) : (
//             <div className="wrapper-class" key={idx}>
//               <img src={item.image} alt={item.image} />
//               <span>
//                 <strong>{item.recipe}</strong>
//               </span>
//               <button onClick={() => handleEdit(item)}>Edit</button>
//             </div>
//           )}
//         </div>
//       ))}
//     </>
//   );
// };

// export default UpdateImage;

import axios from "axios";
import React, { useEffect, useState } from "react";

const UpdateImage = () => {
  const [imgData, setImgData] = useState([]);
  const [updateImgData, setUpdateImgData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [isActive, setIsActive] = useState(false);

  // Handle editing an image entry
  const handleEdit = (data) => {
    setEditData(data);
    setIsActive(data.is_active); // Set the active status from the current data
  };

  // Handle the active status toggle
  const handleToggleActive = () => {
    setIsActive(!isActive);
  };

  // Handle image update
  const updateData = async (e) => {
    e.preventDefault();

    // Create form data to send image and other info
    const formData = new FormData();
    formData.append("image", updateImgData ? updateImgData : editData.image); // If an image is updated, use it, else keep old image
    formData.append("recipe", e.target.recipe.value);
    formData.append("is_active", isActive); // Set the active status

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/imageupload/${editData.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        // Fetch the updated data
        fetchImage();
        setEditData(null);
      }
    } catch (error) {
      console.error("Error updating image:", error);
    }
  };

  // Fetch image data from the server
  const fetchImage = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/imageupload/");
    setImgData(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <>
      {imgData.map((item, idx) => (
        <div className="fetch_image" key={idx}>
          {editData && editData.id === item.id ? (
            <div className="form-wrapper">
              <form onSubmit={updateData}>
                <label>Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={(e) => setUpdateImgData(e.target.files[0])}
                />

                <label>Recipe</label>
                <input type="text" name="recipe" defaultValue={item.recipe} />

                <label>Active</label>
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={handleToggleActive}
                />

                <button type="submit">Update</button>
              </form>
            </div>
          ) : (
            <div className="wrapper-class">
              <img src={item.image} alt={item.recipe} />
              <span>
                <strong>{item.recipe}</strong>
              </span>
              <p>Status: {item.is_active ? "Active" : "Inactive"}</p>
              <button onClick={() => handleEdit(item)}>Edit</button>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default UpdateImage;
