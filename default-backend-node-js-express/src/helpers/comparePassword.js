const bcrypt = require('bcrypt');

const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};

module.exports = comparePassword;
