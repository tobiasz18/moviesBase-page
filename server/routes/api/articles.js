const express = require('express');
const { sortArgsHelper } = require('../../config/helpers');
const { checkLoggedIn } = require('../../middleware/auth');
const { grantAccess } = require('../../middleware/roles');
const router = express.Router();

// model
const { Article } = require('../../models/article_model');
const { Category } = require("../../models/category_model");

// add single article ------------------------ DONE
// admin get, patch, delete single article --- DONE
// get articles no auth-----------------------DONE
// fetch articles load more ------------------DONE
// featcj articles, with pagination ----------DONE

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

// get article without auth
router.route('/getById/:id')
  .get(async (req, res) => {
    try {
      const _id = req.params.id;
      const article = await Article.find({ _id: _id, status: 'public' });
      if (!article || article.length === 0) {
        return res.status(400).json({ message: "Article not found" });
      }
      res.status(200).json(article);
    } catch (error) {
      return res.status(400).send({ message: 'Error fetching article', error });
    }
  })

router.route('/loadmore')
  .post(async (req, res) => {
    try {
      let sortArgs = sortArgsHelper(req.body);

      const articles = await Article
        .find({ status: 'public' })
        .sort([[sortArgs.sortBy, sortArgs.order]])
        .skip(sortArgs.skip)
        .limit(sortArgs.limit)

      res.status(200).json(articles)
    } catch (error) {
      res.status(400).json({ message: 'Error fetching articles', error });
    }
  });

router.route("/admin/paginate")
  .post(checkLoggedIn, grantAccess('readAny', 'articles'), async (req, res) => {
    try {

      // let aggregateQuery = Article.aggregate([
      //   { $match: { status: "public" } }
      // ])

      const limit = req.body.limit ? req.body.limit : 5;
      const aggQuery = Article.aggregate();
      const options = {
        page: req.body.page,
        sort: { _id: 'desc' },
        limit
      }
      const articles = await Article.aggregatePaginate(aggQuery, options);
      res.status(200).json(articles);

    } catch (error) {
      res.status(400).json({ message: 'Error paginate', error });
    }
  });


/* Articles Categoies */

router.route('/categories')
  .post(checkLoggedIn, grantAccess('createAny', 'categories'), async (req, res) => {
    try {
      const category = new Category(req.body)
      const result = await category.save()

      res.status(200).json(result)
    } catch (error) {
      res.status(400).json({ message: 'Error getting categoeis', error: error });
    }
  })
  .get(async (req, res) => {
    try {
      const categories = await Category.find()

      res.status(200).json(categories)
    } catch (error) {
      res.status(400).json({ message: 'Error categoies not found', error: error });
    }
  })




module.exports = router;