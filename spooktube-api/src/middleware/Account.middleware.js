import * as expressValidator from "express-validator";
import jwt from "jsonwebtoken";
import Account from "../models/Account.model.js";
import AccountService from "../services/Account.service.js";

export default class AccountMiddleware {
    static authenticateToken = (req, res, next) => {
        let token = req.headers["authentication"];
        
        if (!token) {
            return res.status(401).send({ message: "No token provided" });
        }
        
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err)
                return res.status(401).send({ message: "Token not recognized" });
            
            req.body.userId = decoded.id;

            next();
        });
    }
    
    static validateNewPassword = () => {
        try {
            return [
                expressValidator
                    .body("newPassword")
                    .notEmpty()
                    .withMessage("Please enter a password"),
                AccountMiddleware.handleValidationErrors,
            ];
        } catch (e) {
            console.log(e);
            return [];
        }
    };
    
    static validateNewEmail = () => {
        try {
            return [
                expressValidator
                    .body("newEmail")
                    .isEmail()
                    .withMessage("New email was invalid"),
                AccountMiddleware.handleValidationErrors,
            ];
        } catch (e) {
            console.log(e);
            return [];
        }
    };
    
    static validateProfileDetails = () => {
        try {
            return [
                expressValidator
                    .body("username")
                    .notEmpty()
                    .withMessage("Please enter a username")
                    .escape(),
                AccountMiddleware.handleValidationErrors,
            ];
        } catch (e) {
            console.log(e);
            return [];
        }
    };
    
    static validateRegDetails = () => {
        try {
            return [
                expressValidator
                    .body("username")
                    .notEmpty()
                    .withMessage("Please enter a username")
                    .escape(),
                expressValidator
                    .body("email")
                    .isEmail()
                    .withMessage("Please enter a valid email address"),
                expressValidator
                    .body("password")
                    .notEmpty()
                    .withMessage("Please enter a password"),
                AccountMiddleware.handleValidationErrors,
            ];
        } catch (e) {
            console.log(e);
            return [];
        }
    };
    
    static handleValidationErrors = (req, res, next) => {
        const errors = expressValidator.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    };
}