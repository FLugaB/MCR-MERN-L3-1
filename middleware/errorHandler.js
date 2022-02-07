

const errorLog = (err, req, res, next) => {

    let code = 500
    let message = "Internal server error"

    if (err.name === `JsonWebTokenError`) {
          code = 401
          message = err.errors[0].message
    } else if (err.name === "USER_NOT_FOUND" || err.name === "BSONTypeError") {
        code = 404
        message = "User Not Found"
    } else if ( err.name === "USERNAME_NOT_NULL" ) {
        code = 400
        message = "Username Required"
    } else if ( err.name === "EMAIL_NOT_NULL" ) {
        code = 400
        message = "Email Required"
    } else if ( err.name === "PASSWORD_NOT_NULL" ) {
        code = 400
        message = "Password Required"
    } else if ( err.name === "ROLE_NOT_NULL" ) {
        code = 400
        message = "Role Required"
    } else if ( err.name === "EMAIL_UNIQUE" ) {
        code = 400
        message = "Email must be Unique"
    } 

    console.log(err, `ini error`)
    res.status(code).json({message})

}

module.exports = errorLog