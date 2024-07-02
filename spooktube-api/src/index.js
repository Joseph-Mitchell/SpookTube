import Config from './config/Config.js';
import Server from "./server/Server.js";
import Database from "./database/Database.js";
import VideoRouter from './routers/Video.router.js';
import VideoController from './controllers/Video.controller.js';
import VideoService from './services/Video.service.js';
import CommentRouter from './routers/Comment.router.js';
import CommentController from './controllers/Comment.controller.js';
import CommentService from './services/Comment.service.js';
import AccountRouter from './routers/Account.router.js';
import AccountController from './controllers/Account.controller.js';
import AccountService from './services/Account.service.js';
import ContentManagerService from './services/ContentManager.service.js';

Config.load();
const { PORT, HOST, DB_URI } = process.env;

const videoRouter = new VideoRouter(new VideoController(new VideoService(), new ContentManagerService(), new AccountService())); 
const commentRouter = new CommentRouter(new CommentController(new CommentService(), new AccountService())); 
const accountRouter = new AccountRouter(new AccountController(new AccountService())); 
const routers = [videoRouter, commentRouter, accountRouter];

const server = new Server(PORT, HOST, routers);
const database = new Database(DB_URI);

server.start();
database.connect();
