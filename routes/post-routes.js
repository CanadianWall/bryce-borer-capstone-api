const router = require('express').Router();
const postController = require('../controllers/post-controller');

router.route('/')
.get(postController.index)
.post(postController.add);

router.route('/trend')
.get(postController.trend)

router.route("/:id")
.get(postController.findOne)
.patch(postController.update)
.delete(postController.remove);

module.exports = router;
