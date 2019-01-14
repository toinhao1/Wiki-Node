const express = require("express");
const router = express.Router();
const wikiController = require("../controllers/wikiController")
const validation = require("./validation");

router.get("/wikis/", wikiController.index);
router.get("/wikis/new", wikiController.new);
router.get("/wikis/:id", wikiController.show);
router.get("/wikis/:id/edit", validation.validateWiki, wikiController.edit);

router.post("/wikis/create", validation.validateWiki, wikiController.create);
router.post("/wikis/:id/update", validation.validateWiki, wikiController.update);
router.post("/wikis/:id/destroy", wikiController.destroy);

module.exports = router;
