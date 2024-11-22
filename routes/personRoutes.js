// routes/personRoutes.js
const express = require('express');
const router = express.Router();
const Person = require('../models/personModel');

// GET /person - List all people
router.get('/', async (req, res) => {
    try {
        const people = await Person.find();
        res.json(people);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /person - Create a new person
router.post('/', async (req, res) => {
    const person = new Person(req.body);
    try {
        const newPerson = await person.save();
        res.status(201).json(newPerson);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /person/:id - Update a person
router.put('/:id', async (req, res) => {
    try {
        const person = await Person.findById(req.params.id);
        if (!person) return res.status(404).send('Person not found.');

        Object.assign(person, req.body);
        const updatedPerson = await person.save();
        res.json(updatedPerson);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /person/:id - Delete a person
router.delete('/:id', async (req, res) => {
    try {
        const person = await Person.findById(req.params.id);
        if (!person) return res.status(404).send('Person not found.');

        await person.remove();
        res.json({ message: 'Person deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
