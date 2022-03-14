import {Alert, Button, Snackbar} from "@mui/material";
import {Pallier, World} from "./world";
import {Services} from "./Services";
import {useState} from "react";


type upgradeProps = {
    world:World
    services :Services
    afficheUpgrade():void
    hideUpgrade():void
    checkUpgrade():void
}
export default function CashUpgradeComponent({services,world,hideUpgrade, checkUpgrade}:upgradeProps){
    const [open, setOpen] = useState(false);

    function newUpgrade(upgrade:Pallier) {
        if(world.money > upgrade.seuil){
            world.money=world.money-upgrade.seuil
            upgrade.unlocked=true
            setOpen(true)
        }
    }
    return (
        <div id={"font"} className="modal">
            <div>
                <h1 className="title">Cash Upgrade !</h1>
            </div>
            <div>
                {world.upgrades.pallier.filter( upgrade => !upgrade.unlocked).map(
                    upgrade =>
                        <div key={upgrade.idcible} className="cashUpgradegrid">
                            <div>
                                <div className="logo">
                                    <img alt="cashUpgrade logo" className="icon" src= { services.server + upgrade.logo} />
                                </div>
                            </div>
                            <div className="infoscashUpgrade">
                                <div className="cashUpgradename"> Upgrade de {upgrade.name} </div>
                                <div className="cashUpgradecost"> {upgrade.seuil} </div>
                            </div>
                            <div onClick={() => newUpgrade(upgrade)}>
                                <Button disabled={world.money < upgrade.seuil}> Buy </Button>
                                <Snackbar open={open} autoHideDuration={6000} >
                                    <Alert  severity="success" sx={{ width: '100%' }}>
                                        You have a new upgrade !!
                                    </Alert>
                                </Snackbar>
                            </div>
                        </div>)}
            </div>
            <Button className="closebutton" onClick={hideUpgrade}> Close </Button>
        </div>
    )}
