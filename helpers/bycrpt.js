const bcrypt = require(`bcryptjs`)

const hashPass = (val) => {
    return bcrypt.hashSync(val, 12);
}

const compareHash = (val, hashData) => {
    return bcrypt.compareSync(val, hashData);
}

module.exports = {
    hashPass,
    compareHash
}