import {Services} from "./Services";
import {Product, World} from "./world";

type ProductProps = {
    prod: Product
    services: Services
}
export default function ProductComponent({ prod, services } : ProductProps) {
    return (
        <div>
            <div className={"productElement"}>
                <img alt={""} src={services.server + prod.logo}/>
                <span> {prod.name} </span>
            </div>
        </div>
    )}

