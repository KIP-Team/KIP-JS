interface routesInterface {
    [index: string]: routeDetails
}

interface parameters {
    [index: string]: string
}
interface middlewareInterface {
    [index: string]: middlewareDetails
}

interface routeDetails {
    method: Array<string>,
    controller: string
}

interface middlewareDetails {
    type: string,
    method: Array<string>,
    controller: string
}

interface normalizedUrl {
    route: string,
    getParams: parameters,
    urlParams: parameters
}

interface middleWareObject {
    controller: string,
    parameters: Array<string>
}

export type { routesInterface, parameters, middlewareInterface, normalizedUrl, middleWareObject };