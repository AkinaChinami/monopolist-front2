import {Services} from "./Services";
import {Product, World} from "./world";
import {Manager} from "./Manager";
import {Box} from "@mui/material";
import ProgressBar from "./ProgressBar";
import {useEffect, useRef, useState} from "react";


type ProductProps = {
    prod: Product,
    onProductionDone: (product: Product) => void,
    qtmulti: number,
    money: number,
    services: Services,
    manager:Manager,
}

export default function ProductComponent({ prod, onProductionDone, qtmulti, money, services,manager } : ProductProps) {
    const [progress, setProgress] = useState(0)

    const calcScore = () => {
        if (prod==null) {
            return
        }
        if (prod.timeleft !== 0) {
            if (prod.timeleft > 0) {
                prod.timeleft -= (Date.now() - prod.lastupdate)
                prod.progressBarValue = ((prod.vitesse - prod.timeleft) / prod.vitesse) * 100
                setProgress(prod.progressBarValue)
            }
            if (prod.timeleft < 0) {
                prod.timeleft = 0
                prod.progressBarValue = 0
                onProductionDone(prod)
            }
            if (manager.unlocked==true){
                prod.timeleft -= (Date.now() - prod.lastupdate)
                prod.progressBarValue = ((prod.vitesse - prod.timeleft) / prod.vitesse) * 100
                setProgress(prod.progressBarValue)
            }

        }
    }

    const startFabrication = () => {
        prod.timeleft = prod.vitesse
        prod.lastupdate = Date.now();
    }

    const savedCallback = useRef(calcScore);
    useEffect(() => savedCallback.current = calcScore)

    useEffect(() => {
        let timer = setInterval(() => savedCallback.current, 100)
        return function cleanup() {
            if (timer) clearInterval(timer)
        }
    }, [])

    if(prod==null) return (<div></div>)
    else {
        return (
            <div>
                <div className={"productElement"}>
                    <div className="produit">
                        <img id={"p"} alt={"logo"+prod.name} src={services.server + prod.logo} onClick={startFabrication}/>
                        <span className="q">{prod.quantite}</span>
                    </div>
                    <span id="font"> {prod.name} </span>
                    <Box sx={{width: '100%'}}>
                        <ProgressBar transitionDuration={"0.1s"} customLabel={" "} completed={progress}/>
                    </Box>
                </div>
            </div>
        )
    }
}

