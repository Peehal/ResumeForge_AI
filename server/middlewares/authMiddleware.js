import jwt from "jsonwebtoken"

export const protect = (req, res, next) => {

    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({message:`Unauthorized`});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // token is generated from user._id so we can get from it 
    
        req.userId = decoded.userId;

        next();

    } catch (error) {
        return res.status(401).json({message:`Unauthorized`});
    }

}

