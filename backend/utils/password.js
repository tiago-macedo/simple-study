const bcrypt = require("bcrypt");

const saltRounds = 10;

const hashPassword = (password) => bcrypt.hashSync(password, saltRounds);

const checkPassword = async (plainTextPassword, hashedPassword) => await bcrypt.compare(plainTextPassword, hashedPassword);

module.exports.hashPassword = hashPassword;
module.exports.checkPassword = checkPassword;