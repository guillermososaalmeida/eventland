const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const dotenv = require("dotenv");
dotenv.config();

//Creamos el almacen
const storageUser = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "proyectoEventland/userStorage",
    allowedFormats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
  },
});

const storageEvent = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "proyectoEventland/eventStorage",
    allowedFormats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
  },
});

const storageOrganization = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "proyectoEventland/organizationStorage",
    allowedFormats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
  },
});

const storageCity = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "proyectoEventland/cityStorage",
    allowedFormats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
  },
});

const storageEstablishment = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "proyectoEventland/establishmentStorage",
    allowedFormats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
  },
});

//Creamos la función de subir imagenes
const uploadUser = multer({ storage: storageUser });
const uploadEvent = multer({ storage: storageEvent });
const uploadOrganization = multer({ storage: storageOrganization });
const uploadCity = multer({ storage: storageCity });
const uploadEstablishment = multer({ storage: storageEstablishment });

//Función de borrado de imagenes
const deleteImgCloudinary = (imgUrl) => {
  const imgSplited = imgUrl.split("/");
  const nameSplited = imgSplited[imgSplited.length - 1].split(".");
  const folderSplited = imgSplited[imgSplited.length - 3];
  const subFolderSplited = imgSplited[imgSplited.length - 2];
  const public_id = `${folderSplited}/${subFolderSplited}/${nameSplited[0]}`;

  cloudinary.uploader.destroy(public_id, () => {
    console.log("Image deleted in cloudinary");
  });
};

const configCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    api_key: process.env.CLOUDINARY_API_KEY,
  });
};

module.exports = {
  uploadUser,
  uploadEvent,
  uploadOrganization,
  uploadCity,
  uploadEstablishment,
  deleteImgCloudinary,
  configCloudinary,
};
