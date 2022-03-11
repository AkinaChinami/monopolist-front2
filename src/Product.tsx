import {Services} from "./Services";
import {Product, World} from "./world";
import {Box} from "@mui/material";
import ProgressBar from "./ProgressBar";
import {useEffect, useRef, useState} from "react";


type ProductProps = {
    prod: Product,
    onProductionDone: (product: Product) => void,
    services: Services
}

export default function ProductComponent({ prod, onProductionDone, services } : ProductProps) {
    const [progress, setProgress] = useState(0)

    const savedCallback = useRef(calcScore);
    useEffect(() => savedCallback.current = calcScore)

    useEffect(() => {
        let timer = setInterval(() => savedCallback.current, 100)
        return function cleanup() {
            if (timer) clearInterval(timer)
        }
    }, [])

    function calcScore() {
        if (prod.timeleft > 0) {
            prod.timeleft = (Date.now() - prod.lastupdate) - prod.timeleft
            prod.progressBarValue = ((prod.vitesse - prod.timeleft) / prod.vitesse) * 100
        }
        if (prod.timeleft < 0) {
            prod.timeleft = 0
            prod.progressBarValue = 0
            onProductionDone(prod)
        }
    }

    function startFabrication() {
        prod.timeleft = prod.vitesse
        prod.lastupdate = Date.now();
    }

    return (
        <div>
            <div className={"productElement"}>
                <div className="produit">
<<<<<<< HEAD
                    <img id={"p"} alt={""} src={services.server + prod.logo}/>
                    <span id = "font" className="q">{prod.quantite}</span>
=======
                    <img id={"p"} alt={"logo"+prod.name} src={services.server + prod.logo} onClick={startFabrication}/>
                    <span className="q">{prod.quantite}</span>
>>>>>>> 4d576a070733e5aa7eee4cfd2fbecc9b3382e937
                </div>
                <span id = "font"> {prod.name} </span>
                <Box sx={{width: '100%'}}>
                    <ProgressBar transitionDuration={"0.1s"} customLabel={" "} completed={progress}/>
                </Box>
            </div>
        </div>
    )}

