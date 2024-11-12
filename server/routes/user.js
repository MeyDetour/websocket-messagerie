const express = require("express");
const router = express.Router();
const db = require('../data/pg');
router.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await db.query('SELECT * FROM persons.users WHERE id = $1', [id]);
        res.send(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Erreur lors de la récupération de l\'utilisateur' });
    }
})
module.exports = router;