const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");


const { config } = require('./../config/config');
const UserService = require('./user.service');
const service = new UserService();


class AuthService {
  async getUser(email, password){
    const user = await service.findByEmail(email);
    if(!user){
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user){
    const payload = {
      sub: user.id,
      role: user.role
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return(
      user,
      token
    );
  }

  async sendMail(email){
    console.log(email);
    const user = await service.findByEmail(email);
    if(!user){
      throw boom.unauthorized();
    }
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      port: 465, //Secure port
      auth: {
        user: `${config.userEmail}`,
        pass: `${config.userPass}`
      }
    });

    await transporter.sendMail({
      from: `${config.userEmail}`, // sender address
      to: `${user.email}`, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello Santi?", // plain text body
      html: "<b>Hello santi</b>", // html body
    });
    return { message: 'mail sent' };
  }
}

module.exports = AuthService;
