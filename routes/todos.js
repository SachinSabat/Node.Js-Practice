var express = require('express');
var router = express.Router();
var createHTTPError = require('http-errors')

const todos = [{ id: 1, name: 'Watch RRR', targetDate: new Date(), done: true }]

// /* GET todos listing. */
router.get('/', function(req, res, next) {
 res.json(todos)
});

/* GET todos by ID. */
router.get('/:id', function(req, res, next) {
   
    const result = todos.find(todo => todo.id === Number(req.params.id));
    if (!result) {
        return next(createHTTPError(404, "Todo Not Found!"))
    }
    res.json(result);
   });
   
/* Create Todo */
router.post('/', function(req, res, next) {
    const { body } = req;
    const newTodo = {
        id: todos.length + 1,
        name: body.name,
        targetDate: body.targetDate,
        done: false
    }
    todos.push(newTodo);
    return res.status(201).header('Location', req.url+ body.id ).json(newTodo);
   });
   
module.exports = router;