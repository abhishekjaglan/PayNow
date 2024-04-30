const jwt = require('jsonwebtoken');

const tokenValidator = async(req, res, next) => {
    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization;
                                   
    if(authHeader && (authHeader.startsWith('Bearer'))){
        token = authHeader.split(" ")[1];
        
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                res.status(401).json({
                    msg: "Token not valid, user not authorized"
                });
            }

            console.log({decoded});
            req.user = decoded.user;
            req.UserId = decoded.user.UserId;
            console.log(decoded.user.UserId)
            next();
        });

    }else{
        res.status(401);
            throw new Error("User not authorized or token is missing !!");
    }
}

module.exports = {tokenValidator};