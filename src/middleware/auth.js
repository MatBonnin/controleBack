const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (req.originalUrl === '/register' || req.originalUrl === '/me-connecter') {
    next();
  } else {
    // Vérifie si l'en-tête Authorization existe et commence par 'Bearer '
    const token =
      authHeader && authHeader.startsWith('Believe ')
        ? authHeader.split(' ')[1]
        : null;

    if (!token) {
      return res.status(401).json({ error: 'Accès refusé. Token manquant.' });
    }

    // Vérifie la validité du token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Token invalide.' });
      }
      req.user = user; // Optionnel : stocke les informations de l'utilisateur dans la requête
      next();
    });
  }
};

module.exports = authenticateToken;
