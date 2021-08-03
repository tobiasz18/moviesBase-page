const express = require('express');
const { checkLoggedIn } = require('../../middleware/auth');
const { grantAccess } = require('../../middleware/roles');
const router = express.Router();

// model
const { Article } = require('../../models/article_model');

// add single article ------------------------ DONE
// admin get, patch, delete single article ---
// get articles no auth-----------------------
// fetch articles load more ------------------
// featcj articles, with pagination ----------

router.route('/admin/add_articles')
.post(checkLoggedIn, grantAccess('createAny', 'article'), async(req, res) => {
  try {
    // optional run some code to validate here
    const article = new Article({
      ...req.body,
      score: parseInt(req.body.score)
    });
    const result = await article.save();
    res.status(200).json(result)

  } catch (error) {
    res.status(400).json({ message: 'Error', error: error });
  }
})


module.exports = router;