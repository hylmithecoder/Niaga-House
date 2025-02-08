const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

// Definisi path upload yang konsisten
const UPLOADS_DIR = path.join(__dirname, "../public/uploads");
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Konfigurasi multer dengan path yang sudah diperbaiki
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

const DATA_FILE = path.join(__dirname, "../public/properties.json");
const loadProperties = () => {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE));
};
const saveProperties = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// Upload gambar & tambahkan properti
app.post("/properties", upload.single("image"), (req, res) => {
  const properties = loadProperties();
  const newProperty = {
    id: properties.length + 1,
    title: req.body.title,
    location: req.body.location,
    description: req.body.description,
    no_hp: req.body.no_hp,
    price: req.body.price,
    specs: req.body.specs,
    image: req.file ? `/uploads/${req.file.filename}` : null,
  };

  properties.push(newProperty);
  saveProperties(properties);
  res.json(newProperty);
});

app.put("/properties/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  let properties = loadProperties();
  const index = properties.findIndex((prop) => prop.id == id);

  if (index !== -1) {
    if (req.file) {
      if (properties[index].image) {
        const oldImagePath = path.join(UPLOADS_DIR, path.basename(properties[index].image));
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      properties[index].image = `/uploads/${req.file.filename}`;
    }
    properties[index] = { ...properties[index], ...req.body };
    saveProperties(properties);
    res.json(properties[index]);
  } else {
    res.status(404).json({ message: "Properti tidak ditemukan" });
  }
});

app.get("/properties", (req, res) => {
  res.json(loadProperties());
});

app.get("/properties/:id", (req, res) => {
  const { id } = req.params;
  const properties = loadProperties();
  const property = properties.find((prop) => prop.id == id);

  if (property) {
    res.json(property);
  } else {
    res.status(404).json({ message: "Properti tidak ditemukan" });
  }
});

app.delete("/properties/:id", (req, res) => {
  const { id } = req.params;
  let properties = loadProperties();
  const property = properties.find((prop) => prop.id == id);

  if (property && property.image) {
    const imagePath = path.join(UPLOADS_DIR, path.basename(property.image));
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  properties = properties.filter((prop) => prop.id != id);
  saveProperties(properties);
  res.json({ message: "Properti dihapus" });
});

app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

// Arahkan semua permintaan lainnya ke aplikasi React
app.use(express.static(path.join(__dirname, '../build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
