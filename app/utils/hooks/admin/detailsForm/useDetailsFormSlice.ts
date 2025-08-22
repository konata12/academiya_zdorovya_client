import {
	addDetailsComponent as addNewsDetailsComponent,
	removeDetailsComponent as removeNewsDetailsComponent,
	resetDetailsComponentsOrder as resetNewsDetailsComponentsOrder,
	setDetailsComponentError as setNewsDetailsComponentError,
	setDetailsStateOrder as setNewsDetailsStateOrder,
	updateDetailsComponent as updateNewsDetailsComponent,
} from "@/app/utils/redux/details/news/newsCreateDetailsOrderSlice";
import {
	addDetailsComponent as addNewsUpdateDetailsComponent,
	removeDetailsComponent as removeNewsUpdateDetailsComponent,
	resetDetailsComponentsOrder as resetNewsUpdateDetailsComponentsOrder,
	setDetailsComponentError as setNewsUpdateDetailsComponentError,
	setDetailsStateOrder as setNewsUpdateDetailsStateOrder,
	updateDetailsComponent as updateNewsUpdateDetailsComponent,
} from "@/app/utils/redux/details/news/newsUpdateDetailsOrderSlice";
import {
	addServiceTypeCreateDetailsComponent,
	removeServiceTypeCreateDetailsComponent,
	resetServiceTypeCreateDetailsComponentsOrder,
	setServiceTypeCreateDetailsComponentError,
	setServiceTypeCreateDetailsStateOrder,
	updateServiceTypeCreateDetailsComponent,
} from "@/app/utils/redux/details/services/serviceTypeCreateDetailsOrderSlice";
import {
	addServiceTypeUpdateDetailsComponent,
	removeServiceTypeUpdateDetailsComponent,
	resetServiceTypeUpdateDetailsComponentsOrder,
	setServiceTypeUpdateDetailsComponentError,
	setServiceTypeUpdateDetailsStateOrder,
	updateServiceTypeUpdateDetailsComponent,
} from "@/app/utils/redux/details/services/serviceTypeUpdateDetailsOrderSlice";
import { DetailsOrderSliceNameType, DetailsRedactorType } from "@/app/types/data/details.type";
import {
	resetNewsFromData,
	setNewsFormBackgroundImage,
	setNewsFormDescription,
	setNewsFormDetails,
	setNewsFormError,
	setNewsFormTitle,
} from "@/app/utils/redux/news/newsCreateFormSlice";
import {
	resetNewsUpdateFromData,
	setNewsUpdateFormBackgroundImage,
	setNewsUpdateFormDescription,
	setNewsUpdateFormDetails,
	setNewsUpdateFormError,
	setNewsUpdateFormTitle,
} from "@/app/utils/redux/news/newsUpdateFormSlice";
import {
	resetServiceTypeUpdateFormData,
	setServiceTypeUpdateFormBackgroundImg,
	setServiceTypeUpdateFormDescription,
	setServiceTypeUpdateFormDetails,
	setServiceTypeUpdateFormError,
	setServiceTypeUpdateFormTitle,
} from "@/app/utils/redux/services/serviceTypeUpdateFormSlice";
import {
	resetServiceTypeCreateFormData,
	setServiceTypeCreateFormBackgroundImg,
	setServiceTypeCreateFormDescription,
	setServiceTypeCreateFormDetails,
	setServiceTypeCreateFormError,
	setServiceTypeCreateFormTitle,
} from "@/app/utils/redux/services/serviceTypeCreateFormSlice";
import { useMemo } from "react";
import {
	addPrivacyPolicyDetailsComponent,
	removePrivacyPolicyDetailsComponent,
	resetPrivacyPolicyDetailsComponentsOrder,
	setPrivacyPolicyDetailsComponentError,
	setPrivacyPolicyDetailsStateOrder,
	updatePrivacyPolicyDetailsComponent,
} from "@/app/utils/redux/details/legal_information/privacyPolicyUpdateDetailsOrderSlice";
import { updateLegalInformation } from "@/app/utils/redux/legal_information/legalInformationSlice";
import {
	addPublicOfferDetailsComponent,
	removePublicOfferDetailsComponent,
	resetPublicOfferDetailsComponentsOrder,
	setPublicOfferDetailsComponentError,
	setPublicOfferDetailsStateOrder,
	updatePublicOfferDetailsComponent,
} from "@/app/utils/redux/details/legal_information/publicOfferUpdateDetailsOrderSlice";

export function useDetailsFormSlice(orderSliceName: DetailsOrderSliceNameType) {
	return useMemo(() => {
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
				};
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
				};

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
				};
			case "serviceTypeUpdateDetailsOrder":
				return {
					// DETAILS ORDER SLICE
					addDetailsComponent: addServiceTypeUpdateDetailsComponent,
					removeDetailsComponent: removeServiceTypeUpdateDetailsComponent,
					updateDetailsComponent: updateServiceTypeUpdateDetailsComponent,
					setDetailsStateOrder: setServiceTypeUpdateDetailsStateOrder,
					setDetailsComponentError: setServiceTypeUpdateDetailsComponentError,

					// FORM SLICE
					submitForm: setServiceTypeUpdateFormDetails,
					setFormError: setServiceTypeUpdateFormError,
					setTitle: setServiceTypeUpdateFormTitle,
					setDescription: setServiceTypeUpdateFormDescription,
					setBackgroundImage: setServiceTypeUpdateFormBackgroundImg,

					// RESET DATA
					resetDetailsComponentsOrder: resetServiceTypeUpdateDetailsComponentsOrder,
					resetFromData: resetServiceTypeUpdateFormData,
				};
			case "privacyPolicyUpdateDetailsOrder":
				return {
					// DETAILS ORDER SLICE
					addDetailsComponent: addPrivacyPolicyDetailsComponent,
					removeDetailsComponent: removePrivacyPolicyDetailsComponent,
					updateDetailsComponent: updatePrivacyPolicyDetailsComponent,
					setDetailsStateOrder: setPrivacyPolicyDetailsStateOrder,
					setDetailsComponentError: setPrivacyPolicyDetailsComponentError,

					// RESET DATA
					resetDetailsComponentsOrder: resetPrivacyPolicyDetailsComponentsOrder,

					// MAKE REQUEST
					updateData: (data: DetailsRedactorType) =>
						updateLegalInformation({ data, field: "privacyPolicy" }),
				};
			case "publicOfferUpdateDetailsOrder":
				return {
					// DETAILS ORDER SLICE
					addDetailsComponent: addPublicOfferDetailsComponent,
					removeDetailsComponent: removePublicOfferDetailsComponent,
					updateDetailsComponent: updatePublicOfferDetailsComponent,
					setDetailsStateOrder: setPublicOfferDetailsStateOrder,
					setDetailsComponentError: setPublicOfferDetailsComponentError,

					// RESET DATA
					resetDetailsComponentsOrder: resetPublicOfferDetailsComponentsOrder,

					// MAKE REQUEST
					updateData: (data: DetailsRedactorType) =>
						updateLegalInformation({ data, field: "publicOffer" }),
				};
		}
	}, [orderSliceName]);
}
