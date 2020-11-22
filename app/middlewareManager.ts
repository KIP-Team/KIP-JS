import middleware from '../middleware.ts';
import { middleWareUrl, params } from './interfaces.ts';

export default class middlewareManager {
    private registerGlobalMiddleware(toRun: Array<any>): void{
        for(const key in middleware){
            var tocheck: string = this.removeWhiteSpace(key.split("/")).toString();
            if(tocheck == "*"){
                toRun.push(middleware[key].controller);
            }
        }
    }

    private compareUrlToMiddleware(url: string): any{
        var toReturn: Array<any> = [];
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
                toReturn.push({route: key, parameters: this.buildParams(theUrl, middlewareUrl)});
            }
        }
        return toReturn;
    }

    private buildParams(url: Array<string>, middleware: Array<string>): Array<string>{
        var toReturn: Array<string> = [];
        var count = 0;
        for (var i in middleware){
            if(middleware[i] == "*"){
                toReturn.push(url[i]);
            }
            count++;
        }
        return toReturn
    }

    public run(url: string): any{
        var controllerToRun: Array<any> = []
        this.registerGlobalMiddleware(controllerToRun);
        var middlewareRest = this.compareUrlToMiddleware(url);
        return {globalMiddleware: controllerToRun, middlewareRest: middlewareRest};
    }

    private removeWhiteSpace(array: Array<string>): Array<string>{
        return array.filter(x => x !== "")
    }
}


var test = new middlewareManager()
console.log(test.run("/produit/none/waza/wow/gd"));