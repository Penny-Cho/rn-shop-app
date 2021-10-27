import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppColor from "../../styles/AppColor";

const HeaderBtn = () => {
	const navigation = useNavigation();

	const navigateToCart = () => {
		navigation.navigate("Cart");
	};

	return (
		<TouchableOpacity onPress={navigateToCart}>
			<Ionicons name="cart-outline" size={24} color={AppColor.primary} />
		</TouchableOpacity>
	);
};

// HeaderBtn.propTypes = {
// 	onPress: PropTypes.func,
// };

// HeaderBtn.defaultProps = {
// 	onPress: navigateToCart,
// };

export default HeaderBtn;
