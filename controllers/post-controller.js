const knex = require('knex')(require('../knexfile'));

const index = (_req, res) => {
  knex('post')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving Posts: ${err}`)
    );
};

const trend = (req, res) => {
  knex('post')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving Posts: ${err}`)
    );
}

const findOne = (req, res) => {
  knex("post")
    .where({ id: req.params.id })
    .then((postsFound) => {

      if (postsFound.length === 0) {
        return res
          .status(404)
          .json({ message: `Post with ID: ${req.params.id} not found` });
      }

      const postData = postsFound[0];

      res.status(200).json(postData);
    })
    .catch(() => {
      res.status(500).json({
        message: `Unable to retrieve user data for user with ID: ${req.params.id}`,
      });
    });
}

const posts = (req, res) => {
  knex("post")
    .join("user", "user.post_id", "post.id")
    .where({ post_id: req.params.id })
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json({
        message: `Unable to retrieve user for post with ID: ${req.params.id} ${error}`,
      });
    });
};

const add = (req, res) => {
  if (!req.body.food_name || !req.body.calories) {
    return res
      .status(400)
      .send("Food data not found. Unable to add meal");
  }
console.log(req.body)
  knex("post")
    .insert(req.body)
    .then((result) => {
      return knex("post")
        .where({ id: result[0] })
    })
    .then((createdPost) => {
      res.status(201).json(createdPost);
    })
    .catch(() => {
      res.status(500).json({ message: "Unable to create new meal" });
    })
};

const update = (req, res) => {
  knex("post")
    .where({ id: req.params.id })
    .update(req.body)
    .then(() => {
      return knex("post").where({
        id: req.params.id,
      });
    })
    .then((updatedPost) => {
      res.json(updatedPost[0]);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: `Unable to update meal with ID: ${req.params.id}` });
    });
};

const remove =  (req, res) => {
  knex("post")
    .where({ id: req.params.id })
    .del()
    .then((result) => {
      if (result === 0) {
        return res.status(400).json({
          message: `Meal with ID: ${req.params.id} to be deleted not found.`,
        });
      }

      // no content response
      res.status(204).send();
    })
    .catch(() => {
      res.status(500).json({ message: "Unable to delete meal" });
    });
};

module.exports = {
  index,
  findOne,
  posts,
  add,
  update,
  remove,
  trend
}
