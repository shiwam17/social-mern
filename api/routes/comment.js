const router = require("express").Router();
const Post = require('../models/Post');

router.put("/createComment", async (req, res) => {
    let post_id = req.body.post_id
    let user_id = req.body.user_id
    let comment = req.body.comment

    await Post.findOneAndUpdate
    (
        {_id: post_id}, 
        {$push: {comments: [{comment: comment,commentedUser: user_id}]}}, 
        {new:true}
    )
    .then(function (post) {res.send(post)})
    .catch(err => {console.error(err)})
  });

    module.exports = router;