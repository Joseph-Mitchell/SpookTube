import * as expressValidator from "express-validator";

export default class AccountMiddleware {
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
                    .withMessage("Please enter a password")
                    .escape(),
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