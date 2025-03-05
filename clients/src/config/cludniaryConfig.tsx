import axios from "axios";

// TypeScript Type Define Karo
export const uploadToCloudinary = async (
  file: File
): Promise<string | null> => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!file) return null;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );

    console.log(response, "cloudinary config tsx");

    return response.data.secure_url; // Yeh uploaded image ka URL return karega
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};
