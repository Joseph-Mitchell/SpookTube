export default class CommentController { 
    #commentService;
    #accountService;
    
    constructor(commentService, accountService) {
        this.#commentService = commentService;        
        this.#accountService = accountService;
    }
    
    async getVideoComments(req, res) {
        try {
            const comments = await this.#commentService.getVideoComments(req.params.videoId);

            const mapped = comments.map((comment) => {
                return comment._doc;
            })
            
            return res.status(200).json({ comments: mapped });
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    }
    
    async getUserComments(req, res) {
        try {           
            const count = await this.#commentService.getUserCommentsCount(req.body.userId);
            
            const commentsPerPage = (req.params.rangeMax - req.params.rangeMin);
            const pages = Math.floor((count - 1) / commentsPerPage) + 1;
            
            const comments = await this.#commentService.getUserComments(req.body.userId);
            let response = []
            for (let i = Math.max(req.params.rangeMin, 0); (i < comments.length) && (i < req.params.rangeMax); i++) {
                let { uploadDate, ...rest } = comments[i]._doc;
                response.push(rest);
            }

            return res.status(200).json({ comments: response, pages: pages });
        } catch (e) {
            console.log(e.message);
            return res.status(500).json({ message: e.message });
        }
    }
    
    async makeComment(req, res) {
        try {
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
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    }
    
    async editComment(req, res) {
        try {
            let comment = {};
            let role = (await this.#accountService.getRoleById(req.body.userId)).role.roleName;
            
            if (role !== "moderator") {
                comment = await this.#commentService.checkOwnership(req.body.id, req.body.userId);
            }

            if (comment === null) {
                return res.status(404).json({ message: "No comment with given id by given user" })
            }
            
            await this.#commentService.editComment(req.body.id, req.body.newComment);
            
            return res.status(204).json();
        } catch (e) {
            console.log(e.message)
            return res.status(500).json({ message: e.message })
        }
    }
    
    async deleteComment(req, res) {
        try {
            let comment = {};
            let role = (await this.#accountService.getRoleById(req.body.userId)).role.roleName;
            
            if (role !== "moderator") {
                comment = await this.#commentService.checkOwnership(req.body.id, req.body.userId);
            }

            if (comment === null) {
                return res.status(404).json({ message: "No comment with given id by given user" })
            }
            
            await this.#commentService.deleteComment(req.body.id);
            
            return res.status(204).json();
        } catch (e) {
            console.log(e.message);
            return res.status(500).json({ message: e.message });
        }
    }
}
