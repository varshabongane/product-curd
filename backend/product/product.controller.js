const express = require('express');
const router = express.Router();
const productService = require('./product.service');

// routes

router.get('/list', getAll);
router.get('/list/:page', getAll);
router.get('/edit/:id', getById);
router.post('/create', create);
router.put('/edit/:id', update);
router.delete('/delete/:id', _delete);



function create(req, res, next) {
    productService.create(req.body)
        .then(() => res.status(200).json({message:'Record added successfully'}))
        .catch(err => next(err));
        ;
}

function getAll(req, res, next) {
    console.log(req.params.page);
    productService.getAll(req.params.page)
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getById(req, res, next) {
    productService.getById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    productService.update(req.params.id, req.body)
        .then(() => res.status(200).json({message:'Record updated successfully'}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    productService.delete(req.params.id)
        .then(() => res.json({message:'Record deleted successfully'}))
        .catch(err => next(err));
}

module.exports = router;
