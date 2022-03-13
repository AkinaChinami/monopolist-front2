import {Button} from "@mui/material";
import {Product} from "./world";
import {Services} from "./Services";


type upgradeProps = {
    prod:Product
    services :Services
    afficheUnlock():void
    hideUnlock():void
}
export default function UnlockComponent({services,prod,hideUnlock}:upgradeProps){

    return (
        <div id={"font"} className="modal">
            <div>
                <h1 className="title">Unlock !</h1>
            </div>
            <div>
                {prod.palliers.pallier.filter(pallier => !pallier.unlocked).map(
                    pallier =>
                        <div key={pallier.idcible} className="unlock">
                            <div>
                                <div className="logo">
                                    <img alt="unlock logo" className="unlockIcon" src= { services.server + pallier.logo} />
                                </div>
                            </div>
                            <div className="infoscashUnlock">
                                <div className="Unlockname"> {pallier.name} </div>
                                <div className="Unlockcost"> {pallier.seuil} </div>
                                <div className={"Unlocktype"}> {pallier.ratio +pallier.typeratio}</div>
                            </div>
                        </div>)}
            </div>
            <Button className="closebutton" onClick={hideUnlock}> Close </Button>
        </div>
    )}

