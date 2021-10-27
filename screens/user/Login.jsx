import React, { useState } from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { MainButton } from "../../components/elements/Btns";
import AppTextInput from "../../components/forms/AppTextInput";
import { login } from "../../store/actions/auth";

const Login = ({ navigation }) => {
	const [emailValue, setEmailValue] = useState("");
	const [passwordValue, setPasswordValue] = useState("");
	const dispatch = useDispatch();
	const loginHandler = async () => {
		await dispatch(login(emailValue, passwordValue));
		navigation.navigate("Products");
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
				<MainButton title="login" onPress={loginHandler} />
			</KeyboardAvoidingView>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingTop: 30,
	},
});

export default Login;
