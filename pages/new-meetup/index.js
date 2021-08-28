import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";
import React, { Fragment } from "react";

function NewMeetupPage() {
	const router = useRouter();

	async function addMeetupHandler(receivedData) {
		try {
			const response = await fetch("api/new-meetup", {
				method: "POST",
				body: JSON.stringify(receivedData),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await response.json();

			console.log("\nRESPONSE : ", data);

			router.push("/");
		} catch (err) {
			console.table(err.message, err.stack);
		}
	}
	return (
		<Fragment>
			<Head>
				<title>Add New Meetup</title>
			</Head>
			<NewMeetupForm onAddMeetup={addMeetupHandler}></NewMeetupForm>
		</Fragment>
	);
}

export default NewMeetupPage;
