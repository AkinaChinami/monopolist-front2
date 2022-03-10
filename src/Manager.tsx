import {Button} from "@mui/material";
import


import {World} from "./world";

type ManagerProps = {
    manager:Manager,
    world:World,

}
export default function ManagerComponent(world){
    return (<div> { showManagers &&
    <div className="modal">
        <div>
            <h1 className="title">Managers make you feel better !</h1>
        </div>
        <div>
            {world.managers.pallier.filter( manager => !manager.unlocked).map(
            manager =>
            <div key={manager.idcible} className="managergrid">
                <div>
                    <div className="logo">
                        <img alt="manager logo" className="round" src= { this.props.services.server + manager.logo} />
                    </div>
                </div>
                <div className="infosmanager">
                    <div className="managername"> { manager.name} </div>
                    <div className="managercible"> {this.props.world.products.product[manager.idcible-1].name } </div>
                    <div className="managercost"> { manager.seuil} </div>
                </div>
                <div onClick={() => this.hireManager(manager)}>
                    <Button disabled={this.props.world.money < manager.seuil}>
                        Hire !</Button>
                </div>
            </div>
    )
            <button className="closebutton" (click) ="showManagers=!showManagers">Close</button>
    </div>
        </div>
    } </div> )
}