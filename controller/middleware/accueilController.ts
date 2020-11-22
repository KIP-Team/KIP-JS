import middlewareController from "../../app/middlewareController.ts";
export default class accueilController extends middlewareController {
    index(): Boolean{
        console.log("Middleware : accueil")
        return true;
    }
}