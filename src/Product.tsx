import {Services} from "./Services";
import {Product} from "./world";
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
        if (prod.timeleft == 0) {
            if (prod.managerUnlocked) {startFabrication()}
        }
        if (prod.timeleft !== 0) {
            prod.timeleft -= (Date.now() - prod.lastupdate)
            prod.lastupdate = Date.now();
            if (prod.timeleft <= 0) {
                prod.timeleft = 0
                prod.progressBarValue = 0
                onProductionDone(prod)
                calcMaxCanBuy()
                if (prod.managerUnlocked) {startFabrication()}
            }
            else {
                prod.progressBarValue = ((prod.vitesse - prod.timeleft) / prod.vitesse) * 100
            }
            setProgress(prod.progressBarValue)
        }
    }

    function calcMaxCanBuy() {
        if (qtmulti === -1) {
            qtmulti = Math.floor(Math.log(1 - money * (1 - prod.croissance) / prod.cout) / Math.log(prod.croissance))
        }
        let coutNProduct = prod.cout * (1 - Math.pow(prod.croissance, qtmulti))/ (1 - prod.croissance);
        prod.quantite += qtmulti
        if (coutNProduct < money) {
            prod.palliers.pallier.filter(echelon => !echelon.unlocked).map(unlock => {
                if(unlock.seuil <= prod.quantite){
                    unlock.unlocked = true;
                    if (unlock.typeratio === "GAIN") {
                        prod.revenu *= unlock.ratio
                    }
                    else if (unlock.typeratio === "VITESSE") {
                        prod.vitesse = prod.vitesse / unlock.ratio
                        prod.progressBarValue = prod.progressBarValue / unlock.ratio
                        prod.timeleft = prod.timeleft / 2
                        setProgress(prod.progressBarValue)
                    }
                }
            })
        }
        onProductBuy(coutNProduct, prod)
    }

    if(prod==null) return (<div/>)
    else {
        return (
            <div>
                <div className={"productElement"}>
                    <div className="produit">
                        <img id={"p"} alt={"logo"+prod.name} src={services.server + prod.logo} onClick={startFabrication}/>
                        <span className="q">Quantité : {prod.quantite}</span>
                        <button onClick={calcMaxCanBuy}>Buy : {prod.croissance}</button>
                        <span id="font"> {prod.name} </span>
                        <div>Temps : {prod.vitesse}</div>
                    </div>
                    <Box sx={{width: '100%'}}>
                        <ProgressBar transitionDuration={"0.1s"} customLabel={" "} completed={progress}/>
                    </Box>
                </div>
            </div>
        )
    }
}

