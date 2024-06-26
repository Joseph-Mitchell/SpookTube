import Config from './config/Config.js';
import Server from "./server/Server.js";
import Database from "./database/Database.js";
import VideoRouter from './routers/Video.router.js';
import VideoController from './controllers/Video.controller.js';
import VideoService from './services/Video.service.js';
import CommentRouter from './routers/Comment.router.js';
import CommentController from './controllers/Comment.controller.js';
import CommentService from './services/Comment.service.js';

Config.load();
const { PORT, HOST, DB_URI } = process.env;

const videoRouter = new VideoRouter(new VideoController(new VideoService())); 
const commentRouter = new CommentRouter(new CommentController(new CommentService())); 
const routers = [videoRouter, commentRouter];

const server = new Server(PORT, HOST, routers);
const database = new Database(DB_URI);

server.start();
database.connect();
