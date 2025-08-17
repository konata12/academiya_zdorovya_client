"use client";

import { persistor, store } from "@/app/utils/redux/store";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function page({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor} loading={null}>
				{children}
			</PersistGate>
		</Provider>
	);
}
