import cloudinary from "cloudinary";

//v2 uses CLOUDINARY_URL automatically if set in env
cloudinary.v2.config({
  cloud_name: "dgx9candm",
  api_key: "166164277698621",
  api_secret: "t6hG2qSfdISuPhIYQB-lKos_ZVg",
});

export default cloudinary.v2;
