import {
    addDetailsComponent as addNewsDetailsComponent,
    removeDetailsComponent as removeNewsDetailsComponent,
    resetDetailsComponentsOrder as resetNewsDetailsComponentsOrder,
    setDetailsComponentError as setNewsDetailsComponentError,
    setDetailsStateOrder as setNewsDetailsStateOrder,
    updateDetailsComponent as updateNewsDetailsComponent
    } from '@/app/utils/redux/details/news/newsCreateDetailsOrderSlice';
import {
    addDetailsComponent as addNewsUpdateDetailsComponent,
    removeDetailsComponent as removeNewsUpdateDetailsComponent,
    resetDetailsComponentsOrder as resetNewsUpdateDetailsComponentsOrder,
    setDetailsComponentError as setNewsUpdateDetailsComponentError,
    setDetailsStateOrder as setNewsUpdateDetailsStateOrder,
    updateDetailsComponent as updateNewsUpdateDetailsComponent
    } from '@/app/utils/redux/details/news/newsUpdateDetailsOrderSlice';
import { DetailsOrderSliceNameType } from '@/app/types/data/details.type';
import {
    resetNewsFromData,
    setNewsFormBackgroundImage,
    setNewsFormDescription,
    setNewsFormDetails,
    setNewsFormError,
    setNewsFormTitle
    } from '@/app/utils/redux/news/newsCreateFormSlice';
import {
    resetNewsUpdateFromData,
    setNewsUpdateFormBackgroundImage,
    setNewsUpdateFormDescription,
    setNewsUpdateFormDetails,
    setNewsUpdateFormError,
    setNewsUpdateFormTitle
    } from '@/app/utils/redux/news/newsUpdateFormSlice';
import { useMemo } from 'react';


export function useDetailsFormSlice(orderSliceName: DetailsOrderSliceNameType) {
    const actions = useMemo(() => {
        switch (orderSliceName) {
            case "newsCreateDetailsOrder":
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
                    setTitle: setNewsFormTitle,
                    setDescription: setNewsFormDescription,
                    setBackgroundImage: setNewsFormBackgroundImage,

                    // RESET DATA
                    resetDetailsComponentsOrder: resetNewsDetailsComponentsOrder,
                    resetFromData: resetNewsFromData,
                }

            case "newsUpdateDetailsOrder":
                return {
                    // DETAILS ORDER SLICE
                    addDetailsComponent: addNewsUpdateDetailsComponent,
                    removeDetailsComponent: removeNewsUpdateDetailsComponent,
                    updateDetailsComponent: updateNewsUpdateDetailsComponent,
                    setDetailsStateOrder: setNewsUpdateDetailsStateOrder,
                    setDetailsComponentError: setNewsUpdateDetailsComponentError,

                    // FORM SLICE
                    submitForm: setNewsUpdateFormDetails,
                    setFormError: setNewsUpdateFormError,
                    setTitle: setNewsUpdateFormTitle,
                    setDescription: setNewsUpdateFormDescription,
                    setBackgroundImage: setNewsUpdateFormBackgroundImage,

                    // RESET DATA
                    resetDetailsComponentsOrder: resetNewsUpdateDetailsComponentsOrder,
                    resetFromData: resetNewsUpdateFromData,
                }
            // default: throw Error('useDetailsFormSlice error')
        }
    }, [orderSliceName])

    return actions
}