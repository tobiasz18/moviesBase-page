const express = require('express');
const { checkLoggedIn } = require('../../middleware/auth');
const { grantAccess } = require('../../middleware/roles');
const router = express.Router();

// model
const { Article } = require('../../models/article_model');

// add single article ------------------------ DONE
// admin get, patch, delete single article --- DONE
// get articles no auth-----------------------
// fetch articles load more ------------------
// featcj articles, with pagination ----------

router.route('/admin/add_articles')
  .post(checkLoggedIn, grantAccess('createAny', 'article'), async (req, res) => {
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

router.route('/admin/articles/:id')
  .get(checkLoggedIn, grantAccess('readAny', 'article'), async (req, res) => {
    try {
      const _id = req.params.id;

      const article = await Article.findById(_id);
      if (!article || article.length === 0) {
        return res.status(400).json({ message: "Article not found" });
      }

      res.status(200).json(article);

    } catch (error) {
      return res.status(400).send({ message: 'Error fetching article', error });
    }
  })
  .patch(checkLoggedIn, grantAccess('readAny', 'article'), async (req, res) => {
    try {
      const _id = req.params.id;
      const article = await Article.findByIdAndUpdate(
        { _id: _id },
        {
          "$set": {
            ...req.body
          }
        },
        { new: true }
      );

      if (!article) return res.status(400).json({ message: 'Article not found' });

      res.status(200).json(article);
    } catch (error) {
      return res.status(400).send({ message: 'Error updating article', error });
    }
  })
  .delete(checkLoggedIn, grantAccess('deleteAny', 'article'), async (req, res) => {
    try {
      const _id = req.params.id;
      const article = await Article.findByIdAndDelete(_id);

      if (!article) return res.status(400).json({ message: 'Article not found' });

      res.status(200).json({ _id: article._id });
    } catch (error) {
      return res.status(400).send({ message: 'Error deleting', error });
    }
  })

module.exports = router;