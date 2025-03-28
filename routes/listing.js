const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedin, isOwner, validateListing } = require("../middleware");
const listingController = require("../controller/listing");

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedin, upload.single("listing[image]"), wrapAsync(listingController.createListing));

router.get("/new", isLoggedin, listingController.renderForm);

router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedin, isOwner,upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedin, isOwner, wrapAsync(listingController.destroyListing));

router.get("/:id/edit", isLoggedin, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;