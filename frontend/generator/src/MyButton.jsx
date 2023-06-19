import { React } from "react";

function MyButton(props) {
	return (
		<button
			onClick={props.onClick}
			className={`${
				props.disabled ? "my-button-disabled" : "my-button"
			} btn-${props.buttonColor} btn-${props.shape} `}
			disabled={props.disabled}
		>
			<span
				className={`${
					typeof props.children === "string" ? "btn-text" : "btn-icon"
				}`}
			>
				{props.children}
			</span>
		</button>
	);
}
export default MyButton;
