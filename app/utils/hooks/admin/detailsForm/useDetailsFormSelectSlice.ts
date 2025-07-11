import {
    addDetailsComponent as addNewsDetailsComponent,
    removeDetailsComponent as removeNewsDetailsComponent,
    resetDetailsComponentsOrder as resetNewsDetailsComponentsOrder,
    setDetailsComponentError as setNewsDetailsComponentError,
    setDetailsStateOrder as setNewsDetailsStateOrder,
    updateDetailsComponent as updateNewsDetailsComponent
    } from '@/app/utils/redux/details/newsDetailsOrderSlice';
import { OrderSliceNameType } from '@/app/types/data/details.type';
import { setNewsFormDetails } from '@/app/utils/redux/news/newsFormSlice';
import { useMemo } from 'react';



export function useDetailsFormSelectSlice(orderSliceName: OrderSliceNameType) {
    const actions = useMemo(() => {
        switch (orderSliceName) {
            case "newsDetailsOrder":
                return {
                    // DETAILS ORDER SLICE
                    addDetailsComponent: addNewsDetailsComponent,
                    removeDetailsComponent: removeNewsDetailsComponent,
                    updateDetailsComponent: updateNewsDetailsComponent,
                    setDetailsStateOrder: setNewsDetailsStateOrder,
                    resetDetailsComponentsOrder: resetNewsDetailsComponentsOrder,
                    setDetailsComponentError: setNewsDetailsComponentError,

                    // FORM SLICE
                    submitForm: setNewsFormDetails,
                }
        }
    }, [orderSliceName])

    return actions
}