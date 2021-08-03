const express = require('express');
const { checkLoggedIn } = require('../../middleware/auth');
const { grantAccess } = require('../../middleware/roles');
const router = express.Router();

// model
const { Article } = require('../../models/article_model');