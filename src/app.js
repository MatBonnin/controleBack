const express = require('express');
const sequelize = require('./sequelize');
const dotenv = require('dotenv');
const cors = require('cors'); // Importer cors
dotenv.config();

const corsOptions = {
  origin: 'http://localhost:5173', // Remplace par l'URL du front-end
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
const authRouter = require('./routes/api');
const app = express();
app.use(express.json());

const authenticateToken = require('./middleware/auth');
// Utiliser le middleware CORS
app.use(cors(corsOptions));

// Routes d'authentification (non protégées)
app.use('/', authenticateToken, authRouter);

sequelize
  .sync({ force: false })
  .then(async () => {
    console.log('Base de données synchronisée');
  })
  .catch((err) => {
    console.error('Erreur de synchronisation de la base de données :', err);
  });

// Exporter l'application pour qu'elle puisse être utilisée dans les routes dynamiques
module.exports = app;

// Démarrer le serveur uniquement si le fichier est exécuté directement
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
  });
}
