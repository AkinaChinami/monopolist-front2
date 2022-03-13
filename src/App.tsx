import React, {useEffect, useState} from "react";
import './App.css';
import {Services} from "./Services";
import {Pallier, Product, World} from "./world";
import ProductComponent from "./Product";

import ManagerComponent, {Manager} from "./Manager";
import {transform} from "./utils";
import {Button} from "@mui/material";
import CashUpgradeComponent, {CashUpgrade} from "./CashUpgrade";

export default function App() {
    const [services, setServices] = useState(new Services(""));
    const [world, setWorld] = useState(new World());
    const [showUnlocks, setShowUnlocks]= useState(false);
    const [showCashUpgrade, setShowCashUpgrade]= useState(false);
    const [showAngelUpgrade, setShowAngelUpgrade]= useState(false);
    const [showManagers, setShowManagers]= useState(false);
    const [showInvestors, setShowInvestors]= useState(false);
    const [qtmulti, setQtmulti] = useState(1);

    useEffect(() => {
        let services = new Services("username")
        setServices(services);
        services.getWorld().then(response => {
            setWorld(response.data)
        })
    }, [])

    function openUnlocks() {
        setShowUnlocks(true);
    }
    function hideUnlocks() {
        setShowUnlocks(false);
    }
    function openCashUpgrades() {
        setShowCashUpgrade(true);
    }
    function hideCashUpgrades() {
        setShowCashUpgrade(false);
    }
    function openAngelUpgrade() {
        setShowAngelUpgrade(true);
    }
    function hideAngelUpgrade() {
        setShowAngelUpgrade(false);
    }
    function openManagers() {
        setShowManagers(true);
    }
    function hideManagers() {
        setShowManagers(false);
    }
    function openInvestors() {
        setShowInvestors(true);
    }
    function hideInvestors() {
        setShowInvestors(false);
    }

    function onProductionDone(p: Product): void {
        // calcul de la somme obtenue par la production du produit
        let gain = p.revenu * p.quantite
        // ajout de la somme à l’argent possédé
        updateToScore(gain)
        updateToMoney(gain)
        services.putProduct(p)
    }

    function updateToScore(gain:number): void {
        setWorld(world => ({...world, score:world.score+gain}))
    }

    function updateToMoney(gain:number):void {
        setWorld(world => ({...world, money: world.money+gain}))
    }

    function onProductBuy(qt: number, product: Product): void {
        updateToMoney(-qt)
        services.putProduct(product)
    }

    function onManagerBuy(seuil: number, manager: Pallier): void {
        updateToMoney(-seuil)
        services.putManager(manager)
    }

    function changeMult(){
        let b = document.getElementById("commutateur")
        if (b!==null) {
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
            </div>

            <div className="main">

                <div className="Menu">
                   <ul className="options">
                       <li id="Unlocks" onClick={openUnlocks}>Unlocks</li>
                       <li id="CashUpgrades" onClick={openCashUpgrades}>Cash Upgrades</li>
                       <li id="AngelUpgrades" onClick={openAngelUpgrade}>Angel Upgrades</li>
                       <li id="Managers" onClick={openManagers}>Managers</li>
                       <li id="Investors" onClick={openInvestors}>Investors</li>
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
                        afficheManager={openManagers}
                        hideManager={hideManagers}
                    />}
                </div>

                <div>
                    { showCashUpgrade &&
                    <CashUpgradeComponent
                        world={world}
                        services={services}
                        afficheUpgrade={openCashUpgrades}
                        hideUpgrade={hideCashUpgrades}
                    />}
                </div>

                <div>
                    { showAngelUpgrade &&
                        <CashUpgradeComponent
                            world={world}
                            services={services}
                            afficheUpgrade={openAngelUpgrade}
                            hideUpgrade={openAngelUpgrade}
                        />}
                </div>

            </div>

        </div>

    );
}
