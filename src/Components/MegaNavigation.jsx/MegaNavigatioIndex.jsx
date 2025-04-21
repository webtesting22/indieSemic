import React from "react";
import ProductState from "../../StoreComponents/Context/State";
import MegaNavigation from "./MegaNavigation";

const NavigationWrap = () => {
    return (
        <>
            <ProductState>
                <MegaNavigation />
            </ProductState>
        </>
    )
}
export default NavigationWrap