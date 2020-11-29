import {params} from './interfaces.ts'

export default class postFormat {

    public static build(body : string, content : string|null){
        switch (content){
            case "application/x-www-form-urlencoded":
                return this.getFromUrlEncoded(body);
            case "application/json":
                return JSON.parse(body);
            case "multipart/form-data":
                return
        }
    }

    private static getFromUrlEncoded(body : String){
        let GetMap : params = {};
        const getParam = body.split("&");
        for (const param in getParam) {
            const keyValues = param.split("=")
            if (keyValues.length == 2) {
                GetMap[keyValues[0]]=keyValues[1]
            }
        }
    }

}