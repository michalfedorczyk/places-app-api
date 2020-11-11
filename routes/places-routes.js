const express = require("express");

const {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlaceById,
  removePlaceById,
} = require("../controllers/places-controller");

const router = express.Router();

router.get("/:pid", getPlaceById);

router.get("/user/:uid", getPlacesByUserId);

router.post("/", createPlace);

router.patch("/:pid", updatePlaceById);

router.delete("/:pid", removePlaceById);

module.exports = router;
