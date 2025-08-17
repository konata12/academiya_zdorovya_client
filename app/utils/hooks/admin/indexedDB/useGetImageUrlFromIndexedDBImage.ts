import { getIndexedDBStoreForImages } from "@/app/utils/hooks/admin/indexedDB/useIndexedDBStoreForImages";
import { get } from "idb-keyval";
import { useEffect, useState } from "react";

export function useGetImageUrlFromIndexedDBImage(
	imageName: string | null,
	storeName: string,
) {
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const store = getIndexedDBStoreForImages(storeName);

	useEffect(() => {
		let isMounted = true;

		const fetchImage = async () => {
			if (imageName) {
				try {
					const imageFile = await get(imageName, store);
					if (isMounted && imageFile) {
						const newUrl = URL.createObjectURL(imageFile);
						setImageUrl(newUrl);
					}
				} catch (error) {
					console.error("Error loading image from IndexedDB:", error);
				}
			}
		};

		fetchImage();

		return () => {
			isMounted = false;
			if (imageUrl) {
				URL.revokeObjectURL(imageUrl); // Clean up the object URL
			}
		};
	}, [imageName, storeName]);

	return imageUrl;
}
