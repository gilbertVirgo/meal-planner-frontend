import React from "react";
import messages from "./messages";
import { useParams } from "react-router-dom";

export default () => {
	const { messageId } = useParams();

	const message = messages.find(({ id }) => id === messageId);

	return (
		<React.Fragment>
			<h1>Success!</h1>
			<p>{message.text}</p>
			{message.link}
		</React.Fragment>
	);
};
