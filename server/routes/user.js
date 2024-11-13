const express = require("express");
const router = express.Router();
const db = require('../data/pg');

db.query('SELECT NOW()', [])
    .then(() => {
        console.log('Connexion réussie à la base de données PostgreSQL');
    })
    .catch(err => {
        console.error('Erreur de connexion à la base de données PostgreSQL', err);
    });


router.get('/user/:id', async (req, res) => {
    const {id} = req.params;
    try {
        await db.query('SET search_path TO persons;');

        const result = await db.query(`
            SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'persons';
        `);
        console.log(result.rows); // Affiche les tables du schéma

        const dbInfo = await db.query('SELECT current_database(), current_schema();');
        console.log('Base de données et schéma actuel:', dbInfo.rows);
        return res.send(result.rows);


       const {rows} = await db.query('SELECT * FROM persons.users WHERE id = $1', [id]);
        if (rows.length > 0) {
            console.log('Utilisateur trouvé:', rows[0]); // Vérification du résultat
            res.send(rows[0]);
        } else {
            res.status(404).send({message: 'Utilisateur non trouvé'});
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({message: 'Erreur lors de la récupération de l\'utilisateur'});
    }
})
module.exports = router;