import {Services} from "./Services";
import {Product} from "./world";
import {Manager} from "./Manager";
import {Box} from "@mui/material";
import ProgressBar from "./ProgressBar";
import {useEffect, useRef, useState} from "react";


type ProductProps = {
    prod: Product,
    onProductionDone: (product: Product) => void,
    qtmulti: number,
    money: number,
    onProductBuy: (quantite: number, product: Product) => void,
    services: Services
}

export default function ProductComponent({ prod, onProductionDone, qtmulti, money, onProductBuy, services } : ProductProps) {
    const [progress, setProgress] = useState(0)
    const savedCallback = useRef(calcScore)
    useEffect(() => savedCallback.current = calcScore)
    useEffect(() => {
        let timer = setInterval(() => savedCallback.current(), 100)
        return function cleanup() {
            if (timer) clearInterval(timer)
        }
    }, [])

    function startFabrication() {
        prod.timeleft = prod.vitesse
        prod.lastupdate = Date.now();
    }

    function calcScore() {
        if (prod==null) return
        if (prod.timeleft !== 0) {
            let date = (Date.now() - prod.lastupdate)
            prod.lastupdate = Date.now();
            prod.timeleft -= date;
            if (prod.timeleft <= 0) {
                prod.timeleft = 0
                prod.progressBarValue = 0
                onProductionDone(prod)
            }
            else {
                prod.progressBarValue = ((prod.vitesse - prod.timeleft) / prod.vitesse) * 100
            }
            setProgress(prod.progressBarValue)
        }
    }

    const calcMaxCanBuy = () => {
        if (qtmulti === 1) {
            if (prod.cout * qtmulti < money) {
                qtmulti=1
            }
        }
        else if (qtmulti === 10) {
            if (prod.cout * qtmulti) {
                qtmulti = 10
            }
        }
        else if (qtmulti === 100) {
            if (prod.cout * qtmulti) {
                qtmulti = 100
            }
        }
        else {
            let n = Math.floor(Math.log(1 - money * (1 - prod.croissance) / prod.cout) / Math.log(prod.croissance))
            if (n < money) {
                qtmulti = n
            }
        }
    }

    if(prod==null) return (<div/>)
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

