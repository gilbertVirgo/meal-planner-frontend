import { AddSymbol, CustomListGroup } from "./styles";

import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import React from "react";

export default ({
	items,
	filteredProperty,
	onItemSelected,
	onCreateNewItem,
}) => {
	const [filter, setFilter] = React.useState("");
	const [showList, setShowList] = React.useState(false);
	const [keySelectedIndex, setKeySelectedIndex] = React.useState(-1);

	const formattedItems = items
		.filter((item) =>
			item[filteredProperty].toLowerCase().includes(filter.toLowerCase())
		)
		.sort((a, b) => a[filteredProperty].localeCompare(b[filteredProperty]));

	const resetKeySelectedIndex = () => setKeySelectedIndex(-1);

	const handleKeyDown = (event) => {
		switch (event.key) {
			case "ArrowUp":
				event.preventDefault();
				if (keySelectedIndex > -1)
					setKeySelectedIndex(keySelectedIndex - 1);
				break;
			case "ArrowDown":
				event.preventDefault();
				if (keySelectedIndex < formattedItems.length - 1)
					setKeySelectedIndex(keySelectedIndex + 1);
				break;
			case "Enter":
				if (keySelectedIndex > -1) {
					onItemSelected(formattedItems[keySelectedIndex]);
					event.target.blur();
				}
				break;
			default:
				resetKeySelectedIndex();
		}
	};

	React.useEffect(() => {
		if (!showList) resetKeySelectedIndex();
	}, [showList]);

	React.useEffect(() => {
		setFilter("");
		resetKeySelectedIndex();
	}, [items]);

	return (
		<React.Fragment>
			<Form.Control
				autoComplete="off"
				value={filter}
				onChange={({ target: { value } }) => setFilter(value)}
				onFocus={() => setShowList(true)}
				onKeyDown={handleKeyDown}
				style={{ position: "relative", zIndex: "999" }}
			/>

			{/* Only show this while input is focused. Like a datalist */}
			{showList && (
				<React.Fragment>
					<CustomListGroup.ClickTrap
						onClick={() => setShowList(false)}
					/>
					<CustomListGroup>
						{formattedItems.map((props, index) => (
							<ListGroup.Item
								key={`dl-item-${index}`}
								type="button"
								action
								onClick={() => {
									onItemSelected(props);
									setShowList(false);
								}}
								variant={
									index === keySelectedIndex && "primary"
								}
								style={{ position: "relative" }}
							>
								{props.title}
								<AddSymbol />
							</ListGroup.Item>
						))}
						<ListGroup.Item
							action
							type="button"
							onClick={() => {
								setShowList(false);
								onCreateNewItem(filter);
							}}
						>
							<strong>Create new item</strong>
						</ListGroup.Item>
					</CustomListGroup>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};
