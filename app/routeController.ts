import { ServerRequest } from "https://deno.land/std@0.67.0/http/server.ts";
import { normalizedUrl, params } from './interfaces.ts';
import ejsHandler from './ejsHandler.ts';

export default class controller{
    request: ServerRequest;
    getParams: params;
    urlParams: params;

    constructor(request: ServerRequest, url: normalizedUrl){
        this.request = request;
        this.getParams = url.getParams;
        this.urlParams = url.urlParams;
        this.index();
    }

    index(){
        this.send('La route fonctionne mais nécessite la methode index() pour renvoyer une donnée')
    }

    async render(data: string, params: params){
        var page = await ejsHandler.render(data, params)
        if(page){
            this.request.respond({ body: page, status: 200, headers: new Headers({ "content-type": 'text/html;charset=utf-8' })});
        }else{
            this.request.respond({body: "Erreur", status: 500, headers: new Headers({ "content-type": "text/plain;charset=utf-8"})});
        }
    }

    send(data: string){
        this.request.respond({ body: data, status: 200, headers: new Headers({ "content-type": 'text/plain;charset=utf-8' })});
    }

    json(data: any){
        this.request.respond({ body: JSON.stringify(data), status: 200, headers: new Headers({ "content-type": 'application/json;charset=utf-8' })});
    }

    custom(data: string, type: string, charset: string, status: number){
        this.request.respond({ body: data, status: status, headers: new Headers({ "content-type": `${type};charset=${charset}` })});
    }

    redirect(url: string, type: number | null){
        if(type == null) type = 302;
        this.request.respond({status: type, headers: new Headers({"content-type": "text/html", "Connection": "keep-alive", "Location": url})});
    }

}