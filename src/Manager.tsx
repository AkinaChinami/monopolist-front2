import {Alert, Button, Snackbar} from "@mui/material";
import {Pallier, World} from "./world";
import {Services} from "./Services";
import {useState} from "react";

type ManagerProps = {
    world:World
    services :Services
    afficheManager():void
    hideManager():void
}
export default function ManagerComponent({services,world,hideManager}:ManagerProps){

    const [open, setOpen] = useState(false);

    function hireManager(manager: Pallier) {
        if(world.money > manager.seuil){
            world.money=world.money-manager.seuil
            manager.unlocked=true
            setOpen(true)
        }
    }

    return (
            <div id={"font"} className="modal">
                <div>
                    <h1 className="title">Managers make you feel better !</h1>
                </div>
                <div>
                    {world.managers.pallier.filter( manager => !manager.unlocked).map(
                    manager =>
                    <div key={manager.idcible} className="managergrid">
                        <div>
                            <div className="logo">
                                <img alt="manager logo" className="managerIcon" src= { services.server + manager.logo} />
                            </div>
                        </div>
                        <div className="infosmanager">
                            <div className="managername"> {manager.name} </div>
                            <div className="managercible"> {world.products.product[manager.idcible-1].name } </div>
                            <div className="managercost"> {manager.seuil} </div>
                        </div>
                        <div onClick={() => hireManager(manager)}>
                            <Button disabled={world.money < manager.seuil}> Hire !</Button>
                            <Snackbar open={open} autoHideDuration={6000} >
                                <Alert  severity="success" sx={{ width: '100%' }}>
                                    You have a new manager !!
                                </Alert>
                            </Snackbar>
                        </div>
                    </div>)}
                </div>
                <Button className="closebutton" onClick={hideManager}> Close </Button>
            </div>
)}
