import { WhatWeTreatWithImagesDataRender } from "@/app/(client)/ui/common/sections/WhatWeTreatWithImages/WhatWeTreatWithImagesDataRender/WhatWeTreatWithImagesDataRender";
import { fetchWhatWeTreats } from "@/app/services/server/fetchData.service";
import React from "react";

export async function WhatWeTreatWithImages() {
	const treats = await fetchWhatWeTreats();
	console.log("treats", treats);

	return (
		<section className={`container section`}>
			<h2 className={"title left lg"}>Що ми лікуємо</h2>
			<WhatWeTreatWithImagesDataRender data={treats} />
		</section>
	);
}
