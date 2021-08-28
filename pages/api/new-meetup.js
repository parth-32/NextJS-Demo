// //api/new-meetup
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
	if (req.method === "POST") {
		try {
			const data = req.body;
			// console.log(data);

			const client = await MongoClient.connect(
				"mongodb+srv://tester:utrcl957KUsBKFp4@cluster0.yywlt.mongodb.net/meetups?retryWrites=true&w=majority"
			);
			const db = client.db();

			const meetupsCollection = db.collection("meetups");

			const result = await meetupsCollection.insertOne(data);

			// console.log(result);

			client.close();

			res.status(201).json({ message: "Meetup Inserted" });
		} catch (e) {
			console.log(
				"=========================================================\n"
			);
			res.json({ message: e.message, stack: e.stack });
		}
	}
}

// const data = req.body;
// 	console.log(data);

// 	const client = await new MongoClient.connect(
// 		"mongodb+srv://tester:utrcl957KUsBKFp4@cluster0.yywlt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
// 	);
// 	const db = client.db();

// 	const meetupsCollection = db.collection("meetups");

// 	const result = await meetupsCollection.insertOne(data);

// 	console.log(result);

// 	client.close();

// 	res.status(201).json({ message: "Meetup Inserted" });
// res.status(200).json({ text: "Hello" });
