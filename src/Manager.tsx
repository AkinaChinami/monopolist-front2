import {Button} from "@mui/material";
import {Pallier, World} from "./world";
import {Services} from "./Services";


type ManagerProps = {
    world:World
    services :Services
    afficheManager():void
}
export default function ManagerComponent({services,world}:ManagerProps){

    function hideManager(){
        showManagers=!showManagers
    }
    function hireManager(manager: Pallier) {
        if(world.money > manager.seuil){
            world.money=world.money-manager.seuil
            manager.unlocked=true

        }

    }

    return (
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
                                <img alt="manager logo" className="round" src= { services.server + manager.logo} />
                            </div>
                        </div>
                        <div className="infosmanager">
                            <div className="managername"> {manager.name} </div>
                            <div className="managercible"> {world.products.product[manager.idcible-1].name } </div>
                            <div className="managercost"> {manager.seuil} </div>
                        </div>
                        <div onClick={() => hireManager(manager)}>
                            <Button disabled={world.money < manager.seuil}> Hire !</Button>
                        </div>
                    </div>)}
                </div>
                {/*<Button className="closebutton" onClick={showManagers=!showManagers}> Close </Button>*/}
            </div>
)}

export class Manager {
}