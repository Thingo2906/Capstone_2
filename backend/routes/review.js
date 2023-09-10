"use strict";
/** Routes for users. */
const express = require("express");
// const jsonschema = require("jsonschema");
const { BadRequestError } = require("../expressError");
const router = new express.Router();
const Review = require("../models/review")
const { ensureCorrectUserOrAdmin} = require("../middleware/auth");
// const reviewNewSchema = require("../schemas/reviewNew.json");
//const reviewUpdateSchema = require("../schemas/reviewUpdate.json");

/** POST /reviews/:username/:movieid/add
 * Create a new review
 * Authorization required:  admin or same user-as-:username
 */
router.post(
  "/:username/:movie_id/add",
  ensureCorrectUserOrAdmin,
  async function (req, res, next) {
    try {
      const { username, movie_id } = req.params;
      const { comment } = req.body;

      const addedReview = await Review.addReview(username, movie_id, comment);

      return res.status(201).json({ added: addedReview });
    } catch (err) {
      return next(err);
    }
  }
);

/** GET /reviews/:movieid
 * Get all reviews for a specific movie
 * Authorization required:  admin or same user-as-:username
 */
router.get("/:movie_id", ensureCorrectUserOrAdmin, async function(req, res, next){
    try{
        const reviews = await Review.getReviewsForMovie(req.params.movie_id);
        return res.json({reviews})
    }catch(err){
        return next(err)
    }
} );

// Get a specific review by username and movie_id
router.get("/:username/:movie_id", ensureCorrectUserOrAdmin,
  async function (req, res, next) {
    try {
      const { username, movie_id } = req.params;
      const review = await Review.getReviewByUsernameAndMovieId(
        username,
        movie_id
      );

      if (!review) {
        return res.status(404).json({ error: "Review not found" });
      }

      return res.json({ review });
    } catch (error) {
      return next(error);
    }
  }
);

/** PUT /reviews/:id
 * Update a review
 * Authorization required: logged in user or admin
 */

/** PATCH /reviews/:id
 * Update a review
 * Authorization required: logged in user or admin
 */
router.patch("/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    // const validator = jsonschema(req.body, reviewUpdateSchema);
    //     if (!validator.valid){
    //         const errs = validator.errors.map(e => e.stack);
    //         return new BadRequestError(errs);
    //     }
    const { id } = req.params;
    const { comment } = req.body;

    const updatedReview =await Review.updateReview(id, comment);
    console.log("update", updatedReview);
    

    return res.json({updatedReview});
  } catch (error) {
    return next(error);
  }
});

/** DELETE /reviews/:id
 * Delete a review
 * Authorization required: logged in user or admin
 */
router.delete("/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      const { id } = req.params;

      await Review.deleteReview(id);

      return res.json({ removed: id});
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;
