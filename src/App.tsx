import React, {useEffect, useState} from "react";
import './App.css';
import logo from "./logo-monopolist.png";
import {Services} from "./Services";
import {World} from "./world";
import Product from './Product'


export default function App() {
    const [services, setServices] = useState(new Services(""));
    const [world, setWorld] = useState(new World());

    useEffect(() => {
        let services = new Services("username")
        setServices(services);
        services.getWorld().then(response => {
            setWorld(response.data)
        })
    }, [])
    console.log("world",world);
    console.log("product",world.products.product[0]);
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
                <div>
                    <img src={services.server + world.logo}/>
                </div>
                <div className="nom"> <span> {world.name} </span> </div>
                <div className="money"> <span> {world.money} </span></div>
                <div> multiplicateur</div>
                <div> ID du joueur</div>
            </div>
            <div className="main">
                <div> liste des boutons de menu</div>
                <div className="product">
                    <div className="tente">
                        <Product prod={world.products.product[0]} services={services}/>
                    </div>
                    <div className="cabane">
                        <Product prod={world.products.product[1]} services={services}/>
                    </div>
                    <div className="immeuble">
                        <Product prod={world.products.product[2]} services={services}/>
                    </div>
                    <div className="maison">
                        <Product prod={world.products.product[3]} services={services}/>
                    </div>
                    <div className="peniche">
                        <Product prod={world.products.product[4]} services={services}/>
                    </div>
                    <div className="chateau">
                        <Product prod={world.products.product[5]} services={services}/>
                    </div>
                </div>
            </div>
        </div>

    );
}
