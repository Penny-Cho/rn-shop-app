import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { MainButton } from "../../components/elements/Btns";
import LayoutStyle from "../../styles/LayoutStyle";
import AppColor from "../../styles/AppColor";

const Cart = (props) => {
	const cartTotalAmount = useSelector((state) => state.carts.totalAmount);

	return (
		<View style={LayoutStyle.defaultScreen}>
			<View style={styles.summary}>
				<Text style={styles.summaryText}>
					Total: <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
				</Text>
				<MainButton title="Order Now" />
			</View>
			<View>
				<Text>Cart Items</Text>
				<Text>test</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	summary: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 20,
		padding: 10,
	},
	summaryText: {
		fontSize: 18,
	},
	amount: {
		color: AppColor.accent,
	},
});

Cart.propTypes = {};

export default Cart;
