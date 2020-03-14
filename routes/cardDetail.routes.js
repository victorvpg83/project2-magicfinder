const express = require("express");
const router = express.Router();
const api = require("../public/javascripts/api")


router.get("/:id", (req, res) => {

  api.getCardById(req.params.id)
    .then(response => {
console.log(response)
      res.render("cardDetail", {
        user: req.user,
        card: response
      });
    })
    .catch(err => console.log(err))
});


module.exports = router;