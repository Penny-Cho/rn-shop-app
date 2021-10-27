import React, { useState } from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { MainButton } from "../../components/elements/Btns";
import AppTextInput from "../../components/forms/AppTextInput";
import { signup } from "../../store/actions/auth";

const SignUp = () => {
	const [emailValue, setEmailValue] = useState("");
	const [passwordValue, setPasswordValue] = useState("");
	const dispatch = useDispatch();
	const signupHandler = async () => {
		await dispatch(signup(emailValue, passwordValue));
	};

	return (
		<ScrollView>
			<KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50}>
				<View style={styles.container}>
					<AppTextInput onChangeText={(value) => setEmailValue(value)} />
					<AppTextInput
						onChangeText={(value) => setPasswordValue(value)}
						secureTextEntry
					/>
				</View>
				<MainButton title="login" onPress={signupHandler} />
			</KeyboardAvoidingView>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingTop: 30,
	},
});

export default SignUp;
