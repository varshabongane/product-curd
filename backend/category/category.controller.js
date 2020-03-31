const express = require('express');
const router = express.Router();
const categoryService = require('./category.service');

// routes

router.get('/list', getAll);
router.get('/list/:page', getAll);
router.get('/edit/:id', getById);
router.post('/create', create);
router.put('/edit/:id', update);
router.delete('/delete/:id', _delete);



function create(req, res, next) {
    categoryService.create(req.body)
        .then(() => res.status(200).json({message:'Record added successfully'}))
        .catch(err => next(err));
        ;
}

function getAll(req, res, next) {
    console.log(req.params.page);
    categoryService.getAll(req.params.page)
        .then(categories => res.json(categories))
        .catch(err => next(err));
}

function getById(req, res, next) {
    categoryService.getById(req.params.id)
        .then(category => category ? res.json(category) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    categoryService.update(req.params.id, req.body)
        .then(() => res.status(200).json({message:'Record updated successfully'}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    categoryService.delete(req.params.id)
        .then(() => res.json({message:'Record deleted successfully'}))
        .catch(err => next(err));
}

module.exports = router;
