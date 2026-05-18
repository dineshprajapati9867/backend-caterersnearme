import express from "express";
import fs from "fs";

const router = express.Router();

const FILE_PATH = "./data/caterers.json";



// GET all caterers
app.get("/api/caterers", (req, res) => {
  try {
    const data = fs.readFileSync(FILE_PATH);
    let caterers = JSON.parse(data);

    const { search, price } = req.query;

    if (search) {
      caterers = caterers.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (price === "low") {
      caterers = caterers.filter((item) => item.pricePerPlate < 400);
    }

    if (price === "medium") {
      caterers = caterers.filter(
        (item) => item.pricePerPlate >= 400 && item.pricePerPlate <= 500,
      );
    }

    if (price === "high") {
      caterers = caterers.filter((item) => item.pricePerPlate > 500);
    }

    res.json(caterers);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// GET caterer by ID
app.get("/api/caterers/:id", (req, res) => {
  try {
    const data = fs.readFileSync(FILE_PATH);
    const caterers = JSON.parse(data);

    const caterer = caterers.find((item) => item.id === Number(req.params.id));

    if (!caterer) {
      return res.status(404).json({
        message: "Caterer not found",
      });
    }

    res.json(caterer);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// POST new caterer
app.post("/api/caterers", (req, res) => {
  try {
    const { name, location, pricePerPlate, cuisines, rating, image } = req.body;

    if (
      !name ||
      !location ||
      pricePerPlate === undefined ||
      !Array.isArray(cuisines) ||
      rating === undefined
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const data = fs.readFileSync(FILE_PATH);
    const caterers = JSON.parse(data);

    const newCaterer = {
      id: Date.now(),
      name,
      location,
      pricePerPlate,
      cuisines,
      rating,
      image
    };

    caterers.push(newCaterer);

    fs.writeFileSync(FILE_PATH, JSON.stringify(caterers, null, 2));

    res.status(201).json(newCaterer);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});