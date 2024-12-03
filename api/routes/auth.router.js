const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


const { config } = require('./../config/config');
const AuthService = require('./../services/auth.service');

const service = new AuthService();
const router = express.Router();


router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const rta = service.signToken(user);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/recovery',
  // Aquí deberían de ir validaciones de datos
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const rta = await service.sendRecovery(email);
      return res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/change-password',
  // Se debe crear una validación de datos
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const rta = await service.changePassword(token, newPassword);
      return res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
