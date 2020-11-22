import middleware from '../middleware.ts';
import type { middleWareObject } from './interfaces.ts';
import { ServerRequest } from "https://deno.land/std@0.67.0/http/server.ts";

export default class middlewareManager {
    private registerGlobalMiddleware(toRun: Array<middleWareObject>): void{
        for(const key in middleware){
            var tocheck: string = this.removeWhiteSpace(key.split("/")).toString();
            if(tocheck == "*"){
                toRun.push({controller: middleware[key].controller, parameters: []});
            }
        }
    }

    private compareUrlToMiddleware(url: string, controllerToRun: Array<middleWareObject>){
        let theUrl: Array<string> = this.removeWhiteSpace(url.split("/"));
        let triedUrl: Array<string> = this.removeWhiteSpace(url.split("/"));
        const score_needed = theUrl.length;
        for(const key in middleware){
            let y = 0;
            let score = 0;
            triedUrl = this.removeWhiteSpace(url.split("/"));
            let middlewareUrl = this.removeWhiteSpace(key.split("/"));
            for(const key2 in middlewareUrl){
                if(middlewareUrl[key2] != "*"){
                    if(theUrl[y] != undefined){
                        if(middlewareUrl[key2] == theUrl[y]){
                            score++;
                        }
                    }
                }else{
                    triedUrl[y] = "*";
                    score++;
                }
                y++;
            }
            if(score == score_needed || (("/"+triedUrl.join("/")).startsWith(key) && middleware[key].type == "global")){
                controllerToRun.push({controller: middleware[key].controller, parameters: this.buildParams(theUrl, middlewareUrl)});
            }
        }
    }

    private buildParams(url: Array<string>, middleware: Array<string>): Array<string>{
        var toReturn: Array<string> = [];
        for (var i in middleware){
            if(middleware[i] == "*"){
                toReturn.push(url[i]);
            }
        }
        return toReturn;
    }

    public async runController(req: ServerRequest){
        var controllerToRun: Array<middleWareObject> = [];
        this.registerGlobalMiddleware(controllerToRun);
        this.compareUrlToMiddleware(req.url, controllerToRun);
        if(controllerToRun.length == 0){
            return true;
        }
        for(var i in controllerToRun){
            try{
                const ctrl = await import("../controller/middleware/" + controllerToRun[i].controller +".ts");
                return await new ctrl.default(req, controllerToRun[i]).index();
            }catch(e){
                console.error(e);
                req.respond({body: "Erreur", status: 404, headers: new Headers({ "content-type": "text/plain;charset=utf-8"})});
            }
        }
    }

    private removeWhiteSpace(array: Array<string>): Array<string>{
        return array.filter(x => x !== "");
    }
}