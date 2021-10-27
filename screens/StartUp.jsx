import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { authenticate } from "../store/actions/auth";

const StartUp = ({ navigation }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		const tryLogin = async () => {
			const userData = await AsyncStorage.getData("userData");
			if (!userData) {
				navigation.navigate("Login");
				return;
			}
			const transformedData = JSON.parse(userData);
			const { token, userId, expirationDate } = transformedData;
			const expiryDate = new Date(expirationDate);
			if (expiryDate <= new Date() || !token || !userId) {
				navigation.navigate("Login");
				return;
			}

			const expirationTime = expiryDate.getTime() - new Date().getTime();

			navigation.navigate("Products");
			dispatch(authenticate(userId, token, expirationTime));
		};
		tryLogin();
	}, []);

	return (
		<View>
			<ActivityIndicator size="large" />
		</View>
	);
};

export default StartUp;
