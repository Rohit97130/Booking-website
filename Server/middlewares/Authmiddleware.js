const jwt = require('jsonwebtoken');


module.exports = function(req,res,next){
    try{

       const authHeader  = req.headers.authorization;
       console.log("Auth Header:", authHeader);
      if (!authHeader || authHeader === 'Bearer null') {
      return res.send({ success: false, message: "No token provided" });
      }
         const token  =  authHeader.split(" ")[1]; 
         const verifiedtoken = jwt.verify(token,process.env.secret_key_jwt);  
      
         req.userId = verifiedtoken.userId;
         next();
    }
   catch (err) {
    console.error("JWT Verification failed:", err.message);
    return res.status(401).send({ success: false, message: "Token Invalid" });
  }
}