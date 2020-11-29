import { ServerRequest } from "https://deno.land/std@0.67.0/http/server.ts";
import {normalizedUrl, postData} from './interfaces.ts';
import routes from '../routes.ts';
import routeController from "./routeController.ts";

export default class controllerManager {
    
    public async runController(req: ServerRequest, URL : normalizedUrl, POSTData : postData | null){
        try{
            await import("../controller/routes/" + URL.route +".ts").then((ctrl) => {
                new ctrl.default(req, URL, POSTData);
            });
        }catch(e){
            console.error(e);
            req.respond({body: "Erreur", status: 404, headers: new Headers({ "content-type": "text/plain;charset=utf-8"})});
        }
    }

}