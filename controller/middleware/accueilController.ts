import middlewareController from "../../app/middlewareController.ts";
export default class accueilController extends middlewareController {
    index(): Boolean{
        console.log("Ok ok")
        return true;
    }
}