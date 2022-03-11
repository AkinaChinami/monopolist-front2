import {Services} from "./Services";
import {Product, World} from "./world";
import {Box} from "@mui/material";
import ProgressBar from "./ProgressBar";
import {useEffect, useState} from "react";


type ProductProps = {
    prod: Product,
   // onProductionDone: (product: Product) => void,
    services: Services
}

export default function ProductComponent({ prod, services } : ProductProps) {
    const [progress, setProgress] = useState(0)
    // useEffect(()=> {
    //     let timer = setInterval(setInterval(() => scalcScore(),100)
    //     return function cleanup() {
    //         if (timer) clearInterval(timer)
    //     }}, [])


    return (
        <div>
            <div className={"productElement"}>
                <div className="produit">
                    <img id={"p"} alt={""} src={services.server + prod.logo}/>
                    <span id = "font" className="q">{prod.quantite}</span>
                </div>
                <span id = "font"> {prod.name} </span>
                <Box sx={{width: '100%'}}>
                    <ProgressBar transitionDuration={"0.1s"} customLabel={" "} completed={progress}/>
                </Box>
            </div>
        </div>
    )}

