import express, {
    Application,
    Request,
    Response,
    NextFunction
} from "express";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import { Controller } from "./controller";
import { configureConnection } from "./infra/connection";
import fs from "fs";

export default class App {
    public app: Application;
    public controller: Controller;

    constructor() {
        configureConnection()
        this.app = express();
        this.configureClientPath();
        this.configureMiddlewares();
        this.controller = new Controller(this.app)
    }

    private listDir(dir: string): void {
        console.log(`reading ${dir}`);
        fs.readdir(dir, (err, files) => {
            if (!err) {
                files.forEach(file => {
                    console.log(file);
                });
            } else {
                console.log(`error: ${err}`)
            }
        });
    }

    private configureClientPath(): void {
        //this.app.set("clientDir", path.join(__dirname, "../..", "client"));
        //console.log(`Client directory: ${this.app.get("clientDir")}`);
        //this.app.use(express.static(this.app.get("clientDir")));
        //this.app.use(express.static(this.app.get("/usr/src/app/public")));
        //this.app.use(express.static(this.app.get("./client")));
        const frontDir = path.join(__dirname, "..", "client");
        this.listDir(frontDir);
        this.app.use(express.static(frontDir));
    }

    private configureMiddlewares(): void {
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        })
    }
}