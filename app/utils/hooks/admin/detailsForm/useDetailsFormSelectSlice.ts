import {
    addDetailsComponent as addNewsDetailsComponent,
    removeDetailsComponent as removeNewsDetailsComponent,
    resetDetailsComponentsOrder as resetNewsDetailsComponentsOrder,
    setDetailsComponentError as setNewsDetailsComponentError,
    setDetailsStateOrder as setNewsDetailsStateOrder,
    updateDetailsComponent as updateNewsDetailsComponent
    } from '@/app/utils/redux/details/newsDetailsOrderSlice';
import { DetailsOrderSliceNameType } from '@/app/types/data/details.type';
import { resetNewsFromData, setNewsFormDetails, setNewsFormError } from '@/app/utils/redux/news/newsFormSlice';
import { useMemo } from 'react';


export function useDetailsFormSelectSlice(orderSliceName: DetailsOrderSliceNameType) {
    const actions = useMemo(() => {
        switch (orderSliceName) {
            case "newsDetailsOrder":
                return {
                    // DETAILS ORDER SLICE
                    addDetailsComponent: addNewsDetailsComponent,
                    removeDetailsComponent: removeNewsDetailsComponent,
                    updateDetailsComponent: updateNewsDetailsComponent,
                    setDetailsStateOrder: setNewsDetailsStateOrder,
                    setDetailsComponentError: setNewsDetailsComponentError,

                    // FORM SLICE
                    submitForm: setNewsFormDetails,
                    setFormError: setNewsFormError,

                    // RESET DATA
                    resetDetailsComponentsOrder: resetNewsDetailsComponentsOrder,
                    resetFromData: resetNewsFromData,
                }
        }
    }, [orderSliceName])

    return actions
}