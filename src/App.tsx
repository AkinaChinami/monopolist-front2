import React, {useEffect, useState} from "react";
import './App.css';
import {Services} from "./Services";
import {Product, World} from "./world";
import ProductComponent from "./Product";

import ManagerComponent from "./Manager";
import {transform} from "./utils";
import {Button} from "@mui/material";

export default function App() {
    const [services, setServices] = useState(new Services(""));
    const [world, setWorld] = useState(new World());
    const [showManagers,etat]= useState(false);
    const [qtmulti, setQtmulti] = useState(1);

    useEffect(() => {
        let services = new Services("username")
        setServices(services);
        services.getWorld().then(response => {
            setWorld(response.data)
        })
    }, [])

    function afficheManager() {
        etat(true)
    }
    function hideManager(){
        etat(false)
    }

    function onProductionDone(p: Product): void {
        // calcul de la somme obtenue par la production du produit
        let gain = p.revenu * p.quantite
        // ajout de la somme à l’argent possédé
        addToScore(gain)
    }

    function addToScore(gain:number): void {
        setWorld(world => ({...world, score:world.score+gain}))
    }

    function addToMoney(gain:number):void {
        setWorld(world => ({...world, money: world.money+gain}))
    }

    function onProductBuy(qt: number, product: Product): void {

    }
    function changeMult(){
        let b = document.getElementById("commutateur")
        if (b) {
            if (b.textContent === "x1") {
                b.textContent = "x10"
                setQtmulti(10)
            }
            else if (b.textContent === "x10"){
                b.textContent = "x100"
                setQtmulti(100)
            }
            else if (b.textContent === "x100"){
                b.textContent = "xMax"
                setQtmulti(-1)
            }
            else{
                b.textContent = "x1"
                setQtmulti(1)
            }
        }
    }


    return (
        <div className="App">
            <div className="header">
                <div> <img alt="logo" id="logo" src={services.server + world.logo}/>
                <span id = "font" className="nom">
                    {world.name}
                </span>
                </div>
                <span id = "font" className="money">
                    <span dangerouslySetInnerHTML={{__html: transform(world.money)}}/>
                </span>
                <span id = "font" className="score">
                    <span dangerouslySetInnerHTML={{__html: transform(world.score)}}/>
                </span>
                <Button id = "commutateur" onClick={changeMult}>X{qtmulti}</Button>
                <div id = "font"> ID du joueur</div>
            </div>

            <div className="main">

                <div className="Menu">
                   <ul className="options">
                       <li id="Unlocks">Unlocks</li>
                       <li id="Cash Upgrades">Cash Upgrades</li>
                       <li id="Angel Upgrades">Angel Upgrades</li>
                       <li id="Managers" onClick={afficheManager}>Managers</li>
                       <li id="Investors">Investors</li>
                   </ul>
                </div>

                <div className="product">
                    <div className="tente" >
                        <ProductComponent
                            prod={world.products.product[0]}
                            onProductionDone={onProductionDone}
                            qtmulti={qtmulti}
                            money={world.money}
                            onProductBuy={onProductBuy}
                            services={services}/>
                    </div>
                    <div className="cabane" >
                        <ProductComponent
                            prod={world.products.product[1]}
                            onProductionDone={onProductionDone}
                            qtmulti={qtmulti}
                            money={world.money}
                            onProductBuy={onProductBuy}
                            services={services}/>
                    </div>
                    <div className="immeuble" >
                        <ProductComponent
                            prod={world.products.product[2]}
                            onProductionDone={onProductionDone}
                            qtmulti={qtmulti}
                            money={world.money}
                            onProductBuy={onProductBuy}
                            services={services}/>
                    </div>
                    <div className="maison" >
                        <ProductComponent
                            prod={world.products.product[3]}
                            onProductionDone={onProductionDone}
                            qtmulti={qtmulti}
                            money={world.money}
                            onProductBuy={onProductBuy}
                            services={services}/>
                    </div>
                    <div className="peniche" >
                        <ProductComponent
                            prod={world.products.product[4]}
                            onProductionDone={onProductionDone}
                            qtmulti={qtmulti}
                            money={world.money}
                            onProductBuy={onProductBuy}
                            services={services}/>
                    </div>
                    <div className="chateau" >
                        <ProductComponent
                            prod={world.products.product[5]}
                            onProductionDone={onProductionDone}
                            qtmulti={qtmulti}
                            money={world.money}
                            onProductBuy={onProductBuy}
                            services={services}/>
                    </div>
                </div>

                <div className="Manager">
                    { showManagers  &&
                    <ManagerComponent
                        world={world}
                        services={services}
                        afficheManager={afficheManager}
                        hideManager={hideManager}
                    />}
                </div>

            </div>

        </div>

    );
}
