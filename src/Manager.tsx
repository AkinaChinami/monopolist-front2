import {Button} from "@mui/material";
<<<<<<< HEAD
import {Pallier, World} from "./world";
import {Services} from "./Services";


type ManagerProps = {
    world:World
    services :Services
    afficheManager():void
}
export default function ManagerComponent({services,world}:ManagerProps){

    function hireManager(manager: Pallier) {

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
                            <div className="managername"> { manager.name} </div>
                            <div className="managercible"> {world.products.product[manager.idcible-1].name } </div>
                            <div className="managercost"> { manager.seuil} </div>
                        </div>
                        <div onClick={() => hireManager(manager)}>
                            <Button disabled={world.money < manager.seuil}> Hire !</Button>
                        </div>
                    </div>)}
                </div>
                <Button className="closebutton" onClick={showManagers=!showManagers}> Close </Button>
            </div>
)}
=======

import {Pallier, World} from "./world";

type ManagerProps = {
    manager:Pallier,
    world:World,

}

// export default function ManagerComponent(world){
//     return (<div> { showManagers &&
//     <div className="modal">
//         <div>
//             <h1 className="title">Managers make you feel better !</h1>
//         </div>
//         <div>
//             {world.managers.pallier.filter( manager => !manager.unlocked).map(
//             manager =>
//             <div key={manager.idcible} className="managergrid">
//                 <div>
//                     <div className="logo">
//                         <img alt="manager logo" className="round" src= { this.props.services.server + manager.logo} />
//                     </div>
//                 </div>
//                 <div className="infosmanager">
//                     <div className="managername"> { manager.name} </div>
//                     <div className="managercible"> {this.props.world.products.product[manager.idcible-1].name } </div>
//                     <div className="managercost"> { manager.seuil} </div>
//                 </div>
//                 <div onClick={() => this.hireManager(manager)}>
//                     <Button disabled={this.props.world.money < manager.seuil}>
//                         Hire !</Button>
//                 </div>
//             </div>
//     )
//             <button className="closebutton" (click) ="showManagers=!showManagers">Close</button>
//     </div>
//         </div>
//     } </div> )
// }
>>>>>>> 4d576a070733e5aa7eee4cfd2fbecc9b3382e937
