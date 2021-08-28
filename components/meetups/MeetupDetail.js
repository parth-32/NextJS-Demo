import cls from "./MeetupDetail.module.css";

const MeetupDetail = (props) => {
	return (
		<section className={cls.detail}>
			<img src={props.image}></img>
			<h1>{props.title}</h1>
			<address>{props.address}</address>
			<p>{props.description}</p>
		</section>
	);
};

export default MeetupDetail;
