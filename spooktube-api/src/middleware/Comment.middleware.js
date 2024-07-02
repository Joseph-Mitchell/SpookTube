import * as expressValidator from "express-validator";

export default class CommentMiddleware {
    
    static validateEditComment = () => {
        try {
            return [
                expressValidator
                    .body("newComment")
                    .notEmpty()
                    .isLength({ min: 0, max: 500 })
                    .withMessage("Comment must be less than 500 characters")
                    .escape(),
                CommentMiddleware.handleValidationErrors,
            ];
        } catch (e) {
            console.log(e);
            return [];
        }
    }
    
    static validateCommentDetails = () => {
        try {
            return [
                expressValidator
                    .body("comment")
                    .notEmpty()
                    .isLength({ min: 0, max: 500 })
                    .withMessage("Comment must be less than 500 characters")
                    .escape(),
                expressValidator
                    .body("videoId")
                    .notEmpty()
                    .withMessage("Invalid video Id"),
                expressValidator
                    .body("timeCode")
                    .isInt({ min: 0, max: 90 }),
                CommentMiddleware.handleValidationErrors,
            ];
        } catch (e) {
            console.log(e);
            return [];
        }
    }
    
    static handleValidationErrors = (req, res, next) => {
        const errors = expressValidator.validationResult(req);       

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    };
}