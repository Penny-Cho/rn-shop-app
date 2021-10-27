import React from "react";
import PropTypes from "prop-types";
import {
	Platform,
	StyleSheet,
	Text,
	TouchableNativeFeedback,
	TouchableOpacity,
} from "react-native";
import AppColor from "../../styles/AppColor";

let ButtonComponent = TouchableOpacity;

// ripple effects on android. only version above 21 supports it
if (Platform.OS === "android" && Platform.Version >= 21) {
	ButtonComponent = TouchableNativeFeedback;
}

export const MainButton = ({ title, color, onPress }) => {
	return (
		<ButtonComponent
			style={[styles.touch, { backgroundColor: color }]}
			onPress={onPress}
			activeOpacity={0.8}
		>
			<Text style={styles.title}>{title}</Text>
		</ButtonComponent>
	);
};

MainButton.propTypes = {
	title: PropTypes.string.isRequired,
	color: PropTypes.string,
	onPress: PropTypes.func,
};

MainButton.defaultProps = {
	color: AppColor.primary,
	onPress: () => {},
};

const styles = StyleSheet.create({
	touch: {
		alignItems: "center",
		minWidth: "48%",
		marginVertical: "4%",
		padding: 12,
		borderRadius: 6,
	},
	title: {
		fontSize: 14,
		color: "white",
	},
});
