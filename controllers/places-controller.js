const { v4: uuidv4 } = require("uuid");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "Best building ever",
    location: {
      lat: 45.789789,
      lng: 100.789465,
    },
    address: "Bisztynek Słoneczna 9",
    creator: "u1",
  },
  {
    id: "p2",
    title: "Emp. State Building",
    description: "Best ever",
    location: {
      lat: 20.789789,
      lng: 100.789465,
    },
    address: "Bisztynek Słoneczna 9",
    creator: "u1",
  },
  {
    id: "p3",
    title: "Pies State Building",
    description: "Best building",
    location: {
      lat: 11.789789,
      lng: 100.789465,
    },
    address: "Bisztynek Słoneczna 9",
    creator: "u2",
  },
];

const HttpError = require("../models/http-error");

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((place) => place.id === placeId);

  if (!place) {
    throw new HttpError("Could not found a place for a given place id.", 404);
  }

  res.json({ place });
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const foundPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  if (foundPlaces.length === 0) {
    return next(
      new HttpError("Could not found a place for a given user id.", 404)
    );
  }
  res.json(foundPlaces);
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;
  const createdPlace = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({ place: createdPlace });
};

const updatePlaceById = (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = {
    ...DUMMY_PLACES.find((place) => place.id === placeId),
  };
  const placeIndex = DUMMY_PLACES.findIndex((place) => place.id === placeId);
  (updatedPlace.title = title), (updatedPlace.description = description);

  DUMMY_PLACES[placeIndex] = updatedPlace;
  res.status(200).json({ place: updatedPlace });
};

const removePlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  DUMMY_PLACES = DUMMY_PLACES.filter((place) => place.id !== placeId);

  res.status(200).json({ message: "Deleted place." });
};

module.exports = {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlaceById,
  removePlaceById,
};
