const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    // Bearer hbsfnkjnjknsjvnk
    // [Bearer,hbsfnkjnjknsjvnk] after splitting
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized access , token is missing" });

        }

        let decodedData;
        decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedData.id;
        
        // req.userRole = decodedData.role;

        next();
    }catch (error) {
        res.status(401).json({ message: "Unauthorized access, invalid token", error: error.message})

    }
}

module.exports = auth;