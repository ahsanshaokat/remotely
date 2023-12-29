import axios from "axios";

const generateImageURL = async (image) => {
  let CLOUDINARY_ENV="dwe6cjqga"
  let CLOUDINARY_PRESET="remotely_uploads"
  const file = new FormData();
  file.append("file", image);
  file.append("upload_preset", `${CLOUDINARY_PRESET}`);
  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_ENV}/image/upload`,
    file
  );
  return data;
};

export default generateImageURL;
