// Create web server
var express = require('express');
var router = express.Router();

// Create database connection
var connection = require('../db');

// Get all comments
router.get('/', function(req, res, next) {
    var sql = "SELECT * FROM comment";
    connection.query(sql, function(err, result) {
        if (err) throw err;
        res.json(result);
    });
});

// Get comments by post id
router.get('/:id', function(req, res, next) {
    var sql = "SELECT * FROM comment WHERE post_id = ?";
    connection.query(sql, req.params.id, function(err, result) {
        if (err) throw err;
        res.json(result);
    });
});

// Create comment
router.post('/', function(req, res, next) {
    var sql = "INSERT INTO comment (post_id, content, author, created_at) VALUES (?, ?, ?, ?)";
    connection.query(sql, [req.body.post_id, req.body.content, req.body.author, req.body.created_at], function(err, result) {
        if (err) throw err;
        res.json(result);
    });
});

// Delete comment
router.delete('/:id', function(req, res, next) {
    var sql = "DELETE FROM comment WHERE id = ?";
    connection.query(sql, req.params.id, function(err, result) {
        if (err) throw err;
        res.json(result);
    });
});

module.exports = router;