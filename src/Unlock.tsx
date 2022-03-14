import {Button} from "@mui/material";
import {Product, World} from "./world";
import {Services} from "./Services";

type upgradeProps = {
    world: World
    services :Services
    afficheUnlock():void
    hideUnlock():void
}
export default function UnlockComponent({world, services,hideUnlock}:upgradeProps){

    return (
        <div id={"font"} className="modal">
            <div>
                <h1 className="title">Unlock !</h1>
            </div>
            <div>
                {world.products.product.filter(product => !product.managerUnlocked).map(
                    product => product.palliers.pallier.filter(pallier => !pallier.unlocked).map(
                        unlock =>
                        <div key={unlock.idcible} className="unlock">
                            <div>
                                <div className="logo">
                                    <img alt="unlock logo" className="icon" src= { services.server + unlock.logo} />
                                </div>
                            </div>
                            <div className="infoscashUnlock">
                                <div className="Unlockname"> {unlock.name} </div>
                                <div className="Unlockcost"> {unlock.seuil} </div>
                                <div className={"Unlocktype"}> {unlock.ratio + " " +unlock.typeratio}</div>
                            </div>
                        </div>
                    )
                )}
            </div>
            <Button className="closebutton" onClick={hideUnlock}> Close </Button>
        </div>
    )}

