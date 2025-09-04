import FAQList from "@/app/(client)/ui/Home/FAQList/FAQList";
import React from "react";

export function FAQ() {
	return (
		<section className={`container section`}>
			<h2 className={"title left lg"}>Часто запитують</h2>
			<p>Дізнайтесь відповіді на поширені питання.</p>
			<FAQList />
		</section>
	);
}
