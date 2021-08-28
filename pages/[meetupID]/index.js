import MeetupDetail from "../../components/meetups/MeetupDetail.js";
import { MongoClient, ObjectId } from "mongodb";

const MeetupDetailPage = (props) => {
	return (
		<MeetupDetail
			id={props.meetupData.id}
			title={props.meetupData.title}
			image={props.meetupData.image}
			address={props.meetupData.address}
			description={props.meetupData.description}
		/>
	);
};
export async function getStaticPaths() {
	const client = await MongoClient.connect(
		"mongodb+srv://tester:utrcl957KUsBKFp4@cluster0.yywlt.mongodb.net/meetups?retryWrites=true&w=majority"
	);
	const db = client.db();

	const meetupsCollection = db.collection("meetups");

	const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

	client.close();

	return {
		fallback: false,
		paths: meetups.map((meetup) => ({
			params: { meetupID: meetup._id.toString() },
		})),
	};
}

export async function getStaticProps(context) {
	// fetch data for a single meetup

	const meetupId = context.params.meetupID;

	const client = await MongoClient.connect(
		"mongodb+srv://tester:utrcl957KUsBKFp4@cluster0.yywlt.mongodb.net/meetups?retryWrites=true&w=majority"
	);
	const db = client.db();

	const meetupsCollection = db.collection("meetups");

	const selectedMeetup = await meetupsCollection.findOne({
		_id: ObjectId(meetupId),
	});

	client.close();

	return {
		props: {
			meetupData: {
				id: selectedMeetup._id.toString(),
				title: selectedMeetup.title,
				address: selectedMeetup.address,
				image: selectedMeetup.image,
				description: selectedMeetup.description,
			},
		},
	};
}

export default MeetupDetailPage;
