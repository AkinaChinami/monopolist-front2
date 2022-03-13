import axios, {AxiosError, AxiosPromise} from "axios";
import {Pallier, World, Product} from "./world";

export class Services {


    server = "http://localhost:8080/"
    api = this.server + "monopolist/generic";
    // server = "https://isiscapitalist.kk.kurasawa.fr/"
    // api = this.server + "adventureisis/generic";
    user = "";
    constructor(user: string) {
        this.user = user
    }

    private static handleError(error: AxiosError): AxiosPromise<any> {
        console.error('An error occurred', error.toJSON);
        return Promise.reject(error.message || error);
    }

    private static setHeaders(user : string) {
        return { "X-User": user }
    }

    getWorld(): AxiosPromise<World> {
        return axios({
            method: 'get',
            url: this.api + '/world',
            headers: Services.setHeaders(this.user)
        }).catch(Services.handleError)
    }

    putManager(manager : Pallier) : AxiosPromise<Response> {
        return axios({
            method: 'put',
            url: this.api + '/manager',
            data: manager,
            headers: Services.setHeaders(this.user)
        }).catch(Services.handleError)
    }

    putProduct(product : Product) : AxiosPromise<Response> {
        return axios({
            method: 'put',
            url: this.api + '/product',
            data: product,
            headers: Services.setHeaders(this.user)
        }).catch(Services.handleError)
    }

    putUpgrade(manager : Pallier) : AxiosPromise<Response> {
        return axios({
            method: 'put',
            url: this.api + '/upgrade',
            data: manager,
            headers: Services.setHeaders(this.user)
        }).catch(Services.handleError)
    }

    deleteWorld(world : World): AxiosPromise<Response> {
        return axios({
            method: 'delete',
            url: this.api + '/world',
            data: world,
            headers: Services.setHeaders(this.user)
        }).catch(Services.handleError)
    }
}