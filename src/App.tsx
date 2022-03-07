import {useEffect, useState} from "react";
import './App.css';
import logo from "./logo-monopolist.png";
import {Services} from "./Services";
import {World} from "./world";




export default function App() {
    const [services, setServices] = useState(new Services(""));
    const [world, setWorld] = useState(new World());

    useEffect(() => {
        let services = new Services("username")
        setServices(services)
        services.getWorld().then(response => {
            setWorld(response.data)
        })
    }, [])

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
      <div>
        <div className="header">
          <div>
              <img className="logo" src={logo}/>
          </div>
            <span> {world.name} </span>
          <div> argent</div>
          <div> multiplicateur</div>
          <div> ID du joueur</div>
        </div>
        <div className="main">
          <div> liste des boutons de menu</div>
          <div className="product">
            <div> premier produit</div>
            <div> second produit</div>
            <div> troisième produit</div>
            <div> quatrième produit</div>
            <div> cinquième produit</div>
            <div> sixième produit</div>
          </div>
        </div>
      </div>

  );
}
