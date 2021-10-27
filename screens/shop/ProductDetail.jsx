import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MainButton } from "../../components/elements/Btns";
import { addToCart } from "../../store/actions/cart";
import AppColor from "../../styles/AppColor";
import LayoutStyle from "../../styles/LayoutStyle";
import TextStyle from "../../styles/TextStyle";

const ProductDetail = ({ route }) => {
	const { id } = route.params;
	const selectedProduct = useSelector((state) =>
		state.products.availableProducts.find((p) => p.id === id)
	);
	const dispatch = useDispatch();

	return (
		<ScrollView>
			<Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
			<View style={LayoutStyle.container}>
				<MainButton
					title="Add to Cart"
					onPress={() => dispatch(addToCart(selectedProduct))}
				/>
				<Text style={{ ...TextStyle.h5, color: AppColor.accent }}>
					${selectedProduct.price.toFixed(2)}
				</Text>
				<Text style={TextStyle.body2}>{selectedProduct.description}</Text>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	image: {
		width: "100%",
		height: 200,
	},
});

export default ProductDetail;
