import { OrderSliceNameType } from "@/app/types/data/details.type";
import { useMemo } from "react";

import {
    addDetailsComponent as addNewsDetailsComponent,
    removeDetailsComponent as removeNewsDetailsComponent,
    updateDetailsComponent as updateNewsDetailsComponent,
    setDetailsStateOrder as setNewsDetailsStateOrder,
    resetDetailsComponentsOrder as resetNewsDetailsComponentsOrder,
} from "@/app/utils/redux/details/newsDetailsOrderSlice";


export function useDetailsFormSelectSlice(orderSliceName: OrderSliceNameType) {
    const actions = useMemo(() => {
        switch (orderSliceName) {
            case "newsDetailsOrder":
                return {
                    addDetailsComponent: addNewsDetailsComponent,
                    removeDetailsComponent: removeNewsDetailsComponent,
                    updateDetailsComponent: updateNewsDetailsComponent,
                    setDetailsStateOrder: setNewsDetailsStateOrder,
                    resetDetailsComponentsOrder: resetNewsDetailsComponentsOrder,
                }
        }
    }, [orderSliceName])

    return actions
}