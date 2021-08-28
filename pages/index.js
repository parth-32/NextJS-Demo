import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import React, { Fragment } from "react";

const HomePage = (props) => {
	return (
		<Fragment>
			<Head>
				<title>React/Next.js</title>
				<meta
					name="description"
					content="Next.js/React js web app"
				></meta>
			</Head>
			<MeetupList meetups={props.meetups}></MeetupList>
		</Fragment>
	);
};

export async function getStaticProps() {
	const client = await MongoClient.connect(
		"mongodb+srv://tester:utrcl957KUsBKFp4@cluster0.yywlt.mongodb.net/meetups?retryWrites=true&w=majority"
	);
	const db = client.db();

	const meetupsCollection = db.collection("meetups");
	const meetups = await meetupsCollection.find().toArray();

	return {
		props: {
			meetups: meetups.map((data) => ({
				title: data.title,
				address: data.address,
				image: data.image,
				id: data._id.toString(),
			})),
		},
		revalidate: 1,
	};
}

export default HomePage;
