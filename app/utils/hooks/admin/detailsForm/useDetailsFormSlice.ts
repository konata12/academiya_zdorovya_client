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
import {
    addServiceTypeCreateDetailsComponent,
    removeServiceTypeCreateDetailsComponent,
    resetServiceTypeCreateDetailsComponentsOrder,
    setServiceTypeCreateDetailsComponentError,
    setServiceTypeCreateDetailsStateOrder,
    updateServiceTypeCreateDetailsComponent
    } from '@/app/utils/redux/details/services/serviceTypeCreateDetailsOrderSlice';
import {
    addServiceTreatmentTypeUpdateDetailsComponent,
    removeServiceTreatmentTypeUpdateDetailsComponent,
    resetServiceTreatmentTypeUpdateDetailsComponentsOrder,
    setServiceTreatmentTypeUpdateDetailsComponentError,
    setServiceTreatmentTypeUpdateDetailsStateOrder,
    updateServiceTreatmentTypeUpdateDetailsComponent
    } from '@/app/utils/redux/details/services/serviceTreatmentTypeUpdateDetailsOrderSlice';
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
import {
    resetServiceTreatmentTypeUpdateFormData,
    setServiceTreatmentTypeUpdateFormBackgroundImg,
    setServiceTreatmentTypeUpdateFormDescription,
    setServiceTreatmentTypeUpdateFormDetails,
    setServiceTreatmentTypeUpdateFormError,
    setServiceTreatmentTypeUpdateFormTitle
    } from '@/app/utils/redux/services/serviceTreatmentTypeUpdateFormSlice';
import {
    resetServiceTypeCreateFormData,
    setServiceTypeCreateFormBackgroundImg,
    setServiceTypeCreateFormDescription,
    setServiceTypeCreateFormDetails,
    setServiceTypeCreateFormError,
    setServiceTypeCreateFormTitle
    } from '@/app/utils/redux/services/serviceTypeCreateFormSlice';
import { useMemo } from 'react';


export function useDetailsFormSlice(orderSliceName: DetailsOrderSliceNameType) {
    const actions = useMemo(() => {
        switch (orderSliceName) {
            // NEWS
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
            
            // SERVICES
            case "serviceTypeCreateDetailsOrder":
                return {
                    // DETAILS ORDER SLICE
                    addDetailsComponent: addServiceTypeCreateDetailsComponent,
                    removeDetailsComponent: removeServiceTypeCreateDetailsComponent,
                    updateDetailsComponent: updateServiceTypeCreateDetailsComponent,
                    setDetailsStateOrder: setServiceTypeCreateDetailsStateOrder,
                    setDetailsComponentError: setServiceTypeCreateDetailsComponentError,

                    // FORM SLICE
                    submitForm: setServiceTypeCreateFormDetails,
                    setFormError: setServiceTypeCreateFormError,
                    setTitle: setServiceTypeCreateFormTitle,
                    setDescription: setServiceTypeCreateFormDescription,
                    setBackgroundImage: setServiceTypeCreateFormBackgroundImg,

                    // RESET DATA
                    resetDetailsComponentsOrder: resetServiceTypeCreateDetailsComponentsOrder,
                    resetFromData: resetServiceTypeCreateFormData,
                }

            case "serviceTypeUpdateDetailsOrder":
                return {
                    // DETAILS ORDER SLICE
                    addDetailsComponent: addServiceTreatmentTypeUpdateDetailsComponent,
                    removeDetailsComponent: removeServiceTreatmentTypeUpdateDetailsComponent,
                    updateDetailsComponent: updateServiceTreatmentTypeUpdateDetailsComponent,
                    setDetailsStateOrder: setServiceTreatmentTypeUpdateDetailsStateOrder,
                    setDetailsComponentError: setServiceTreatmentTypeUpdateDetailsComponentError,

                    // FORM SLICE
                    submitForm: setServiceTreatmentTypeUpdateFormDetails,
                    setFormError: setServiceTreatmentTypeUpdateFormError,
                    setTitle: setServiceTreatmentTypeUpdateFormTitle,
                    setDescription: setServiceTreatmentTypeUpdateFormDescription,
                    setBackgroundImage: setServiceTreatmentTypeUpdateFormBackgroundImg,

                    // RESET DATA
                    resetDetailsComponentsOrder: resetServiceTreatmentTypeUpdateDetailsComponentsOrder,
                    resetFromData: resetServiceTreatmentTypeUpdateFormData,
                }
        }
    }, [orderSliceName])

    return actions
}