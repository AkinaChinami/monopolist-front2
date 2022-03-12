import {Button} from "@mui/material";
import {World} from "./world";
import {Services} from "./Services";


type upgradeProps = {
    world:World
    services :Services
    afficheUpgrade():void
    hideUpgrade():void
}
export default function CashUpgradeComponent({services,world,hideUpgrade}:upgradeProps){

    return (
        <div className="modal">
            <div>
                <h1 className="title">Cash Upgrade !</h1>
            </div>
            <div>
                {world.upgrades.pallier.filter( upgrade => !upgrade.unlocked).map(
                    upgrade =>
                        <div key={upgrade.idcible} className="cashUpgradegrid">
                            <div>
                                <div className="logo">
                                    <img alt="cashUpgrade logo" className="round" src= { services.server + upgrade.logo} />
                                </div>
                            </div>
                            <div className="infoscashUpgrade">
                                <div className="cashUpgradename"> {upgrade.name} </div>
                                <div className="cashUpgradecible"> {world.upgrades.pallier[upgrade.idcible-1].name } </div>
                                <div className="cashUpgradecost"> {upgrade.seuil} </div>
                            </div>
                            {/*<div onClick={() => (manager)}>*/}
                            {/*    <Button disabled={world.money < manager.seuil}> Hire !</Button>*/}
                            {/*</div>*/}
                        </div>)}
            </div>
            <Button className="closebutton" onClick={hideUpgrade}> Close </Button>
        </div>
    )}

export class CashUpgrade {}