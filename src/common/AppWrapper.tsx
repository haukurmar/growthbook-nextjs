"use client"
import { ReactNode, useEffect } from "react"
import { GrowthBook, GrowthBookProvider } from "@growthbook/growthbook-react"

const growthbook = new GrowthBook({
	apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
	clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
	decryptionKey: process.env.NEXT_PUBLIC_GROWTHBOOK_DEPCRYPTION_KEY,
	enableDevMode: true,
	subscribeToChanges: true,
	trackingCallback: (experiment, result) => {
		// TODO: Use your real analytics tracking system
		console.log("Viewed Experiment", {
			experimentId: experiment.key,
			variationId: result.key,
		})
	},
})

growthbook.setAttributes({
	id: "foo",
	deviceId: "foo",
	company: "foo",
	loggedIn: true,
	employee: true,
	country: "foo",
	browser: "foo",
	url: "foo",
})

type AppWrapperProps = {
	children: ReactNode
}

export const AppWrapper = (props: AppWrapperProps) => {
	useEffect(() => {
		// Load features asynchronously when the app renders
		growthbook.loadFeatures()
	}, [])

	return (
		<GrowthBookProvider growthbook={growthbook}>
			{props.children}
		</GrowthBookProvider>
	)
}
