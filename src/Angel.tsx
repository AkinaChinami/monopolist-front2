import {Button} from "@mui/material";
import {Pallier, World} from "./world";
import {Services} from "./Services";


type upgradeProps = {
    world:World
    services :Services
    afficheAngel():void
    hideAngel():void
}
export default function AngelComponent({services,world,hideAngel}:upgradeProps){

    function buyAngel(angel : Pallier) {

    }

    return (
        <div className="modal">
            <div>
                <h1 className="title">Angel !</h1>
            </div>
            <div>
                {world.angelupgrades.pallier.filter( angel => !angel.unlocked).map(
                    angel =>
                        <div key={angel.idcible} className="angelgrid">
                            <div>
                                <div className="logo">
                                    <img alt="angel logo" className="icon" src= { services.server + angel.logo} />
                                </div>
                            </div>
                            <div className="infosAngel">
                                <div className="Angelname"> {angel.name} </div>
                                <div className="Angelcible"> {world.angelupgrades.pallier[angel.idcible-1].name } </div>
                                <div className="Angelcost"> {angel.seuil} </div>
                            </div>
                            <div onClick={() => buyAngel(angel)}>
                                <Button disabled={world.money < angel.seuil}> Hire !</Button>
                            </div>
                        </div>)}
            </div>
            <Button className="closebutton" onClick={hideAngel}> Close </Button>
        </div>
    )}

export class Angel {}