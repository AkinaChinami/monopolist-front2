import {Button} from "@mui/material";
import {Product, World} from "./world";
import {Services} from "./Services";

type upgradeProps = {
    world: World
    prod:Product
    services :Services
    afficheUnlock():void
    hideUnlock():void
}
export default function UnlockComponent({world, services,prod,hideUnlock}:upgradeProps){

    return (
        <div id={"font"} className="modal">
            <div>
                <h1 className="title">Unlock !</h1>
            </div>
            <div>
                {world.products.product.map( product =>
                    product.palliers.pallier.map( unlock =>
                        <div key={unlock.idcible} className="unlock">
                            <div>
                                <div className="logo">
                                    <img alt="unlock logo" className="icon" src= { services.server + unlock.logo} />
                                </div>
                            </div>
                            <div className="infoscashUnlock">
                                <div className="Unlockname"> {unlock.name} </div>
                                <div className="Unlockcost"> {unlock.seuil} </div>
                                <div className={"Unlocktype"}> {unlock.ratio +unlock.typeratio}</div>
                            </div>
                        </div>
                    )
                )}
            </div>
            <Button className="closebutton" onClick={hideUnlock}> Close </Button>
        </div>
    )}

