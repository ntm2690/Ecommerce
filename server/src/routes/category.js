// const express = require('express')
// const router = express.Router()
// const { requireSignin, adminMiddleware } = require('../common-middleware')
// const { addCategory, getCategories, updateCategories, deleteCategories } = require('../controllers/category')
// const shortid = require('shortid')
// const path = require('path')
// const multer = require('multer')

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(path.dirname(__dirname), 'uploads'))
//   },
//   filename: function (req, file, cb) {
//     cb(null, shortid.generate() + '-' + file.originalname)
//   }
// })
// const upload = multer({ storage })

// router.post('/category/create',requireSignin, adminMiddleware, upload.single('categoryImage'), addCategory)
// router.get('/category/getcategory', getCategories)
// router.post('/category/update', upload.single('categoryImage'), updateCategories)
// router.post('/category/delete', deleteCategories)

// module.exports = router
const express = require("express");
const {
  addCategory,
  getCategories,
  updateCategories,
  deleteCategories,
} = require("../controllers/category");
const {
  requireSignin,
  adminMiddleware,
  superAdminMiddleware,
} = require("../common-middleware");
const router = express.Router();
const shortid = require("shortid");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/category/create",
  requireSignin,
  superAdminMiddleware,
  upload.single("categoryImage"),
  addCategory
);
router.get("/category/getcategory", getCategories);
router.post(
  "/category/update",
  requireSignin,
  superAdminMiddleware,
  upload.array("categoryImage"),
  updateCategories
);
router.post(
  "/category/delete",
  requireSignin,
  superAdminMiddleware,
  deleteCategories
);

module.exports = router;
//done