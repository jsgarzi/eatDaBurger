var express = require("express");

var router = express.Router();

var burger = require("../models/burgers.js");

router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

router.get("/burgers", function (req, res) {
    burger.all(function (data) {
        res.json({ burgers: data });
    });
});

router.post("/burgers", function (req, res) {
    burger.create([
        "name", "ate"
    ], [
        req.body.name, req.body.ate
    ], function (result) {
        res.json(result)
    });
});

router.put("/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.update({
        ate: req.body.ate
    }, condition, function (result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.json({ id: req.params.id });
        }
    });
});

router.delete("/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    burger.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;
