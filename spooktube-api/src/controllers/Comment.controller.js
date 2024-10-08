export default class CommentController { 
    #commentService;
    #accountService;
    
    constructor(commentService, accountService) {
        this.#commentService = commentService;        
        this.#accountService = accountService;
    }
    
    async routeWrapper(req, res, controllerFunction) {
        try {
            await controllerFunction(req, res);
        } catch (e) {
            console.log(e.message);
            return res.status(500).json({ message: e.message });
        }
    }
    
    async getVideoComments(req, res) {
        await this.routeWrapper(req, res, async (req, res) => {
            const comments = await this.#commentService.getVideoComments(req.params.videoId);

            const mapped = comments.map((comment) => {
                return comment._doc;
            });
            
            return res.status(200).json({ comments: mapped });
        });
    }
    
    async getUserComments(req, res) {
        await this.routeWrapper(req, res, async (req, res) => {
            const count = await this.#commentService.getUserCommentsCount(req.body.userId);
            
            const commentsPerPage = (req.params.rangeMax - req.params.rangeMin);
            const pages = Math.floor((count - 1) / commentsPerPage) + 1;
            
            const comments = await this.#commentService.getUserComments(req.body.userId);
            let response = [];
            for (let i = Math.max(req.params.rangeMin, 0); (i < comments.length) && (i < req.params.rangeMax); i++) {
                let { uploadDate, ...rest } = comments[i]._doc;
                response.push(rest);
            }

            return res.status(200).json({ comments: response, pages: pages });
        });
    }
    
    async getAllComments(req, res) {        
        await this.routeWrapper(req, res, async (req, res) => {
            let role = (await this.#accountService.getRoleById(req.body.userId)).role.roleName;
            if (role !== "moderator")
                return res.status(403).json("user not authorised");
            
            const count = await this.#commentService.getCommentsCount(req.params.searchTerm.trim());
            
            const commentsPerPage = (req.params.rangeMax - req.params.rangeMin);
            const pages = Math.floor((count - 1) / commentsPerPage) + 1;
            
            const comments = await this.#commentService.getAllComments(req.params.searchTerm.trim());
            let response = [];
            for (let i = Math.max(req.params.rangeMin, 0); (i < comments.length) && (i < req.params.rangeMax); i++) {
                let { uploadDate, ...rest } = comments[i]._doc;
                response.push(rest);
            }

            return res.status(200).json({ comments: response, pages: pages });
        });
    }
    
    async makeComment(req, res) {
        await this.routeWrapper(req, res, async (req, res) => {
            const account = await this.#accountService.getAccountById(req.body.userId);
            
            if (account === null) {
                return res.status(401).json({ message: "No matching account found" });
            }
            
            const newComment = await this.#commentService.createComment(
                req.body.comment,
                req.body.videoId,
                req.body.userId,
                req.body.timeCode
            );
            
            if (newComment === null) {
                return res.status(400).json({ message: "Given comment could not be created" });
            }
            
            return res.status(201).json({ comment: newComment });
        });
    }
    
    async editComment(req, res) {
        await this.routeWrapper(req, res, async (req, res) => {
            let comment = {};
            let role = (await this.#accountService.getRoleById(req.body.userId)).role.roleName;
            
            if (role !== "moderator") {
                comment = await this.#commentService.checkOwnership(req.body.id, req.body.userId);
            }

            if (comment === null) {
                return res.status(404).json({ message: "No comment with given id by given user" });
            }
            
            await this.#commentService.editComment(req.body.id, req.body.newComment);
            
            return res.status(204).json();
        });
    }
    
    async deleteComment(req, res) {
        await this.routeWrapper(req, res, async (req, res) => {
            let comment = {};
            let role = (await this.#accountService.getRoleById(req.body.userId)).role.roleName;
            
            if (role !== "moderator") {
                comment = await this.#commentService.checkOwnership(req.body.id, req.body.userId);
            }

            if (comment === null) {
                return res.status(404).json({ message: "No comment with given id by given user" });
            }
            
            await this.#commentService.deleteComment(req.body.id);
            
            return res.status(204).json();
        });
    }
}
