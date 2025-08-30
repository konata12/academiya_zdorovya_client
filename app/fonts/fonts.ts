import localFont from "next/font/local";

export const ubuntu = localFont({
	src: [
		{
			path: "./ubuntu/Ubuntu-Regular.ttf",
			weight: "400",
			style: "normal",
		},
		{
			path: "./ubuntu/Ubuntu-Medium.ttf",
			weight: "500",
			style: "normal",
		},
	],
});

export const unbounded = localFont({
	src: [
		{
			path: "./unbounded/Unbounded-Medium.ttf",
			weight: "500",
			style: "normal",
		},
	],
});
