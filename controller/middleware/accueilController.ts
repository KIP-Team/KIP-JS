import middlewareController from "../../app/middlewareController.ts";
export default class accueilController extends middlewareController {
    index(): boolean{
        console.log("Middleware : accueil")
        return true;
    }
}