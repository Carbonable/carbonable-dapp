import { XMarkIcon } from "@heroicons/react/24/outline";
import { slide as Menu } from 'react-burger-menu';
import NavMenu from "./NavMenu";

export default function NavMenuMobile({menuOpen, handleStateChange, closeMenu, canClose, addressToDisplay}: any) {

    return ( 
        <Menu 
            customBurgerIcon={ false }
            customCrossIcon={ canClose ? <XMarkIcon/> : false }
            pageWrapId={ "page-wrap" }
            outerContainerId={"outer-container"}
            isOpen={menuOpen}
            onStateChange={(state) => handleStateChange(state)}
            onClose={closeMenu}
            className="bg-black bg-navigation"
            >
            <NavMenu addressToDisplay={addressToDisplay} closeMenu={closeMenu} />
        </Menu>
    )
}