import {
	ServicesStage,
	ServicesStageProps,
} from "@/app/(client)/ui/Services/ServicesStages/ServicesStage/ServicesStage";

export function ServicesStages({ stages }: { stages: ServicesStageProps[] }) {
	return (
		<div>
			{stages.map((stage, i) => (
				<ServicesStage title={stage.title} description={stage.description} key={i} />
			))}
		</div>
	);
}
