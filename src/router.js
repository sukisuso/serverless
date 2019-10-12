const router = require('express').Router();
const vld = require('./validator');

router.get('/:collection', (req, res) => res.json(200));
router.get('/:collection/:id', (req, res) => res.json(200));
router.post('/:collextion', (req, res) => res.json(200));
router.put('/:collextion/:id', (req, res) => res.json(200));
router.delete('/:collextion/:id', (req, res) => res.json(200));

module.exports = router;
