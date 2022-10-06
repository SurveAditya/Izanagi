import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/Usermodel.js";

const protect = asyncHandler(async (req, res) => {
    let token
    //The HTTP Authorization request header can be used to provide credentials that authenticate a user agent with a server, allowing access to a protected resource.
    //the token is sent as a bearer token
    //req.header.auhthorization will give us the token we had to use
    //split becuase it is always Bearer token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        try {
          token = req.headers.authorization.split(' ')[1]
    
          const decoded = jwt.verify(token, process.env.JWT_SECRET)
          console.log(decoded)
          //if we console.log decoded then we will get
          //id:(whatever id the token has) iat:(issued at that is the date) exp:(expiration) 
          req.user = await User.findById(decoded.id).select('-password')
          //this req.user we will have access to in all of our protected routes
          //since it is a middleware we call next()
          next()
        } catch (error) {
          console.error(error)
          res.status(401)
          throw new Error('Not authorized, token failed')
        }
      }
    
      if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
      }
   

})

export { protect }