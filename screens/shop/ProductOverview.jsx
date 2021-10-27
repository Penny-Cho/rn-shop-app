import React, { useCallback, useEffect, useState } from "react";
import { Button, FlatList, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ItemBox from "../../components/elements/ItemBox";
import { addToCart } from "../../store/actions/cart";
import { fetchProduct } from "../../store/actions/products";
import LayoutStyle from "../../styles/LayoutStyle";

const ProductOverview = ({ navigation }) => {
	const products = useSelector((state) => state.products.availableProducts);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [isRefreshing, setIsRefreshing] = useState(false);

	const loadProducts = useCallback(async () => {
		setError(null);
		setIsRefreshing(true);
		try {
			await dispatch(fetchProduct());
		} catch (err) {
			setError(err.message);
		}
		setIsRefreshing(false);
	}, [dispatch, setIsLoading, setError]);

	// drawer navigation을 쓰면 cache화되어 내용이 update됐을 때 못읽어옴. 그것을 방지
	useEffect(() => {
		const willFocusSub = navigation.addListener("willFocus", loadProducts);
		return () => {
			willFocusSub.remove();
		};
	}, [loadProducts]);

	useEffect(() => {
		setIsLoading(true);
		loadProducts().then(() => setIsLoading(false));
	}, [dispatch, loadProducts]);

	return (
		<>
			{error && (
				<View>
					<Text>{error.message}</Text>
					<Button onPress={loadProducts}>try again</Button>
				</View>
			)}
			{isLoading && <Text>isLoading...</Text>}
			<View style={LayoutStyle.defaultScreen}>
				<FlatList
					onRefresh={loadProducts}
					refreshing={isRefreshing}
					data={products}
					renderItem={(itemData) => (
						<ItemBox
							title={itemData.item.title}
							desc={itemData.item.description}
							imgUrl={itemData.item.imageUrl}
							needBtn
							price={`$${itemData.item.price}`}
							onPress={() =>
								navigation.navigate("Product Detail", {
									id: itemData.item.id,
									title: itemData.item.title,
								})
							}
							onPressCart={() => {
								dispatch(addToCart(itemData.item));
							}}
						/>
					)}
				/>
			</View>
		</>
	);
};

export default ProductOverview;
