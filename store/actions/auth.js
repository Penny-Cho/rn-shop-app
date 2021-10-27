import { AsyncStorage } from "@react-native-async-storage/async-storage";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

let timer;

export const authenticate = (userId, token, expirationTime) => {
	return (dispatch) => {
		dispatch(setLogoutTimer(expirationTime));
		dispatch({
			type: AUTHENTICATE,
			userId,
			token,
		});
	};
};

export const signup = (email, password) => {
	return async (dispatch) => {
		const response = await fetch("https://randomdata", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password, returnSecureToken: true }),
		});

		if (!response.ok) {
			throw new Error("Something went Wrong!");
		}

		const resData = await response.json();
		dispatch({
			type: SIGNUP,
			token: resData.idToken,
			userId: resData.localId,
		});
		saveDataToStorage(resData.idToken, resData.localId);
	};
};

export const login = (email, password) => {
	return async (dispatch) => {
		const response = await fetch("https://randomdata", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password, returnSecureToken: true }),
		});

		if (!response.ok) {
			const errorResData = await response.json();
			let message = "something went wrong";
			const errorId = errorResData.error.message;
			if (errorId === "EMAIL_NOT_FOUND") {
				message = "Cannot find email";
			}
			throw new Error(message);
		}

		const resData = await response.json();
		dispatch(
			authenticate(resData.localId, resData.idToken, resData.expiresIn.toNumber() * 1000)
		);
		const expirationDate = new Date(
			new Date().getTime() + parseInt(resData.expiresIn, 10) * 1000
		);
		saveDataToStorage(resData.idToken, resData.localId, expirationDate);
	};
};

export const logout = () => {
	return (dispatch) => {
		clearLogoutTimer();
		AsyncStorage.removeItem("userData");
		return { type: LOGOUT };
	};
};

const clearLogoutTimer = () => {
	if (timer) {
		clearTimeout(timer);
	}
};

const setLogoutTimer = (expirationTime) => {
	return (dispatch) => {
		timer = setTimeout(() => {
			dispatch(logout());
		}, expirationTime);
	};
};

const saveDataToStorage = async (token, userId, expirationDate) => {
	await AsyncStorage.setItem(
		"userData",
		JSON.stringify({ token, userId, expirationDate: expirationDate.toISOString() })
	);
};
