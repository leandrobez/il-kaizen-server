const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  
  const authToken = req.headers.authorization;

  if (!authToken)
    return res.status(401).json({ 
      error: true, 
      message: {
        type: 'warning', 
        value: 'No token provided. Access Denied.'
      }
    });

  const checkToken = authToken.split(' ');

  if (!checkToken.length === 2)
    return res.status(401).json({
     error: true, 
     message: {
      type: 'warning',
      value: 'Token error'
     }
   });

  const type = checkToken[0],
    token = checkToken[1];

  //check the token
  if (!/^Bearer$/i.test(type))
    return res.status(401).json({ 
      error: true, 
      message: {
        type: 'danger',
        value: 'Token error - bad formatted'
      }
    });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    try {
     
      if (err){
        return res.status(401).json({
          error: true,
          message: {
            type: 'danger',
            value: err.message+ ' '+'Token inválido. Você não tem permissão para fazer essa requisição'
          }
        });
      }
      req.userID = decoded.id;
      next();
    } catch (error) {
      return res.status(400).json({ 
        error: true,
        message: {
          type: 'danger',
          message: error.errors
        } 
      });
    }
  });
};
