import React, {useEffect, useState} from "react";
import './App.css';
import {Services} from "./Services";
import {Product, World} from "./world";
import ProductComponent from "./Product";

import ManagerComponent from "./Manager";
import {transform} from "./utils";

export default function App() {
    const [services, setServices] = useState(new Services(""));
    const [world, setWorld] = useState(new World());
    const[username, setUsername] = useState("");
    const[showManagers,etat]= useState(false);
    const [qtmulti, setQtmulti] = useState(0);

    useEffect(() => {
        let services = new Services("username")
        setServices(services);
        services.getWorld().then(response => {
            setWorld(response.data)
        })
    }, [])

    // useEffect(() => {
    //     if (username !== "") {
    //         let services = new Services(username)
    //         setServices(services)
    //         services.getWorld().then(response => {
    //             let liste = compute.unlocks.list(response.data)
    //             setWorld(response.data)
    //             setUnlockList(liste)
    //         })
    //
    //     }
    //
    // })

    useEffect(() => {
        let username = localStorage.getItem("username");
        if(!username || username === "") {
            username = "Captain" + Math.floor(Math.random()*10000);
        }
        localStorage.setItem("username", username);
        setUsername(username);
    })
    function afficheManager() {
        etat(true)
    }

    function onProductionDone(p: Product): void {
        // calcul de la somme obtenue par la production du produit
        let gain = p.revenu
        // ajout de la somme à l’argent possédé
        addToScore(gain)
    }

    function addToScore(gain:number): void {
        setWorld(world => ({...world, money: world.money+gain, score:world.score+gain}))
    }

    return (
        <div className="App">
            <div className="header">
                <div> <img id="logo" src={services.server + world.logo}/>
                <span id = "font" className="nom">
                    {world.name}
                </span>
                </div>
                <span className="money">
                    <span dangerouslySetInnerHTML={{__html: transform(world.money)}}></span>
                </span><span className="score">
                    <span dangerouslySetInnerHTML={{__html: transform(world.score)}}></span>
                </span>
                <div id = "font"> multiplicateur</div>
                <div id = "font"> ID du joueur</div>
            </div>

            <div className="main">

                <div className="Menu">
                   <ul className="options">
                       <li id="Unlocks"></li>
                       <li id="Cash Upgrades"></li>
                       <li id="Angel Upgrades"></li>
                       <li id="Managers" onClick={afficheManager}>Managers</li>
                       <li id="Investors"></li>
                   </ul>
                </div>

                <div className="product">
                    <div className="tente" >
                        <ProductComponent
                            prod={world.products.product[0]}
                            onProductionDone={onProductionDone}
                            qtmulti={qtmulti}
                            money={world.money}
                            services={services}/>
                    </div>
                    <div className="cabane" >
                        <ProductComponent
                            prod={world.products.product[1]}
                            onProductionDone={onProductionDone}
                            qtmulti={qtmulti}
                            money={world.money}
                            services={services}/>
                    </div>
                    <div className="immeuble" >
                        <ProductComponent
                            prod={world.products.product[2]}
                            onProductionDone={onProductionDone}
                            qtmulti={qtmulti}
                            money={world.money}
                            services={services}/>
                    </div>
                    <div className="maison" >
                        <ProductComponent
                            prod={world.products.product[3]}
                            onProductionDone={onProductionDone}
                            qtmulti={qtmulti}
                            money={world.money}
                            services={services}/>
                    </div>
                    <div className="peniche" >
                        <ProductComponent
                            prod={world.products.product[4]}
                            onProductionDone={onProductionDone}
                            qtmulti={qtmulti}
                            money={world.money}
                            services={services}/>
                    </div>
                    <div className="chateau" >
                        <ProductComponent
                            prod={world.products.product[5]}
                            onProductionDone={onProductionDone}
                            qtmulti={qtmulti}
                            money={world.money}
                            services={services}/>
                    </div>
                </div>

                <div className="Manager">
                    { showManagers  &&
                    <ManagerComponent world={world} services={services}  afficheManager={afficheManager}/>}
                </div>

            </div>

        </div>

    );
}
