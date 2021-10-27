import { StyleSheet } from "react-native";
import AppColor from "./AppColor";

export default StyleSheet.create({
	h2: {
		fontSize: 18,
		fontWeight: "bold",
		paddingBottom: 6,
	},
	h4: {
		fontSize: 16,
		fontWeight: "bold",
		paddingBottom: 6,
	},
	h5: {
		fontSize: 15,
		fontWeight: "bold",
		paddingBottom: 6,
	},
	body1: {
		fontSize: 14,
		color: AppColor.bodyText,
	},
	body2: {
		fontSize: 13,
		color: AppColor.bodyText,
	},
});
