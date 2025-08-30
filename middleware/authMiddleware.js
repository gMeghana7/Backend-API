import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token;

  
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      token = authHeader.split(" ")[1]; 
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

     
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next(); 
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized, token invalid" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized, token missing" });
  }
};

export default protect;
