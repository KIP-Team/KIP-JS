import { middlewareInterface } from './app/interfaces.ts';

const middleware: middlewareInterface = {
    "/accueil": { type: "strict", method: ['GET'], controller: 'accueilController' }
}

export default middleware;