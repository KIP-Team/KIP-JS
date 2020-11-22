import { ServerRequest } from "https://deno.land/std@0.67.0/http/server.ts";
import { middleWareObject } from './interfaces.ts';

export default class middlewareController{
    request: ServerRequest;
    controllerToRun: middleWareObject;

    constructor(request: ServerRequest, params: middleWareObject){
        this.request = request;
        this.controllerToRun = params
    }

    index(): Boolean{
        return this.next();
    }

    next(): Boolean{
        return true;
    }

    stop(): Boolean{
        return false;
    }

    send(data: string){
        this.request.respond({ body: data, status: 200, headers: new Headers({ "content-type": 'text/plain;charset=utf-8' })});
    }

    redirect(url: string, type: number | null){
        if(type == null) type = 302;
        this.request.respond({status: type, headers: new Headers({"content-type": "text/html", "Connection": "keep-alive", "Location": url})});
    }

}