import { middlewareInterface } from './app/interfaces.ts';

const middleware: middlewareInterface = {
    "*": { type: "strict", method: ['GET'], controller: '1Controller' },
    "/": { type: "strict", method: ['GET'], controller: '1Controller' },
    "/accueil": { type: "strict", method: ['GET'], controller: '2Controller' },
    "/produit": { type: "global", method: ['GET'], controller: '3Controller' },
    "/produit/*/waza/*": { type: "global", method: ['GET'], controller: '4Controller' }
}

export default middleware;