import React from "react";
import { StyleSheet, TextInput, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import AppColor from "../../styles/AppColor";

const AppTextInput = ({
	placeholder,
	onChangeText,
	autoCorrect,
	blurOnSubmit,
	keyboardType,
	value,
	style,
	maxLength,
}) => {
	return (
		<TextInput
			placeholder={placeholder}
			style={{ ...styles.textInput, ...style }}
			onChangeText={onChangeText}
			autoCorrect={autoCorrect}
			blurOnSubmit={blurOnSubmit}
			keyboardType={keyboardType}
			value={value}
			maxLength={maxLength}
		/>
	);
};

const styles = StyleSheet.create({
	textInput: {
		paddingTop: "5%",
		fontSize: 20,
		paddingBottom: ".3%",
		marginBottom: "3%",
		borderBottomColor: AppColor.line,
		borderBottomWidth: 1,
	},
});

export default AppTextInput;

AppTextInput.propTypes = {
	placeholder: PropTypes.string,
	onChangeText: PropTypes.func.isRequired,
	autoCorrect: PropTypes.bool,
	blurOnSubmit: PropTypes.bool,
	keyboardType: PropTypes.oneOf([
		"default",
		"number-pad",
		"decimal-pad",
		"numeric",
		"email-address",
		"phone-pad",
		"url",
	]),
	value: PropTypes.string.isRequired,
	style: ViewPropTypes.style,
	maxLength: PropTypes.number,
};

AppTextInput.defaultProps = {
	placeholder: "",
	autoCorrect: false,
	blurOnSubmit: false,
	keyboardType: "default",
	style: {},
	maxLength: 100,
};
