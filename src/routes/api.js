const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/User');
const Miel = require('../models/Miel');
const { Op } = require('sequelize');
dotenv.config();

/**
 * POST /auth/register
 * Body: { "username": "user@example.com", "password": "password123" }
 * Crée un nouvel utilisateur avec un username et un mot de passe.
 */
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'username déjà utilisé.' });
    }

    // Hash le mot de passe
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crée le nouvel utilisateur
    const user = await User.create({ username, password: hashedPassword });

    res.status(201).json({ message: 'Utilisateur créé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /auth/login
 * Body: { "username": "user@example.com", "password": "password123" }
 * Retourne un token JWT si les identifiants sont valides.
 */
router.post('/me-connecter', async (req, res) => {
  try {
    const { nom_utilisateur, mdp } = req.body;
    const username = nom_utilisateur;
    const password = mdp;
    // Recherche de l'utilisateur
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: 'Identifiants invalides.' });
    }

    // Compare les mots de passe
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Identifiants invalides.' });
    }

    // Génération du token
    const payload = { id: user.id, username: user.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    res.json({ letoken: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/miels', async (req, res) => {
  try {
    // Recherche de l'utilisateur
    let data = req.query;
    if (data.tags) {
      const tags = data.tags.split(',');
      const miels = await Miel.findAll();
      let filredMield = {};
      miels.forEach((miel) => {
        console.log(miel.description.includes('bio'));
        tags.forEach((tag) => {
          console.log(tag);
          console.log(miel.description.includes(tag));
          if (miel.description.includes(tag)) {
            filredMield[miel.id] = miel;
          }
        });
      });

      res.json({ filredMield });
    } else {
      const miels = await Miel.findAll();
      res.json({ miels });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/miels', async (req, res) => {
  try {
    // Recherche de l'utilisateur
    const { nom, description, prix } = req.body;

    await Miel.create({ nom, description, prix });

    const miels = await Miel.findAll();
    res.json({ miels });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/miels/:id', async (req, res) => {
  try {
    // Recherche de l'utilisateur
    const id = req.params.id;

    const miel = await Miel.findByPk(id);
    res.json({ miel });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/miels/:id/prix/:price', async (req, res) => {
  try {
    const miel = await Miel.findByPk(req.params.id);
    // Recherche de l'utilisateur
    await miel.update({ prix: req.params.price });

    res.json({ miel });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/miels/:id', async (req, res) => {
  try {
    const miel = await Miel.findByPk(req.params.id);
    if (miel) {
      await miel.destroy();
      res.json({ message: 'miel supprimé' });
    } else {
      res.status(404).json({ error: 'Miel non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
