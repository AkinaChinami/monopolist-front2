import React, {useEffect, useState} from "react";
import './App.css';
import {Services} from "./Services";
import {World} from "./world";
import ProductComponent from "./Product";
import ManagerComponent from "./Manager";


export default function App() {
    const [services, setServices] = useState(new Services(""));
    const [world, setWorld] = useState(new World());
    const[username, setUsername] = useState("");
    const[showManagers,etat]= useState(false);

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


    return (
        /*
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
        */

        <div className="App">
            <div className="header">
                <div> <img id="logo" src={services.server + world.logo}/>
                <span id = "font" className="nom">
                    {world.name}
                </span>
                </div>
                <span id = "font" className="money">
                    {world.money}
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
                        <ProductComponent prod={world.products.product[0]} services={services}/>
                    </div>
                    <div className="cabane" >
                        <ProductComponent prod={world.products.product[1]} services={services}/>
                    </div>
                    <div className="immeuble" >
                        <ProductComponent prod={world.products.product[2]} services={services}/>
                    </div>
                    <div className="maison" >
                        <ProductComponent prod={world.products.product[3]} services={services}/>
                    </div>
                    <div className="peniche" >
                        <ProductComponent prod={world.products.product[4]} services={services}/>
                    </div>
                    <div className="chateau" >
                        <ProductComponent prod={world.products.product[5]} services={services}/>
                    </div>
                </div>
                <div className="Manager">
                    showManagers &&
                    <ManagerComponent world={world} services={services}  afficheManager={afficheManager}/>
                </div>

            </div>

        </div>

    );
}
