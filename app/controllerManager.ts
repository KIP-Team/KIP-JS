import { ServerRequest } from "https://deno.land/std@0.67.0/http/server.ts";
import type { normalizedUrl } from './interfaces.ts';

export default class controllerManager {
    
    public async runController(req: ServerRequest, URL : normalizedUrl){
        try{
            await import("../controller/routes/" + URL.route +".ts").then((ctrl) => {
                new ctrl.default(req, URL);
            });
        }catch(e){
            console.error(e);
            req.respond({body: "Erreur", status: 404, headers: new Headers({ "content-type": "text/plain;charset=utf-8"})});
        }
    }

}