import authConfigs from "../config/auth.config.js";

export const validUser = (req, res, next) => {
    const token = req.cookies["user-token"];
    const decoded = authConfigs.decodeToken(token);
    // console.log(decoded); 

    if (decoded === null) {
        return res.status(401).json({
            massage: "You Are not LogIn, Plaese Login.",
        });
    } else {
        req.headers.emial = decoded["email"];
        req.headers._id = decoded["id"];
        next();
    };
};