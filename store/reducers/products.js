import PRODUCTS from "../../data/dummyData";
import Product from "../../models/product";
import { CREATE_PRODUCT, SET_PRODUCT } from "../actions/products";

const initialState = {
	availableProducts: PRODUCTS,
	userProducts: PRODUCTS,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_PRODUCT: {
			return {
				availableProducts: action.products,
				userProducts: action.userProducts,
			};
		}
		case CREATE_PRODUCT: {
			const newProduct = new Product(
				action.productData.id,
				action.productData.ownerId,
				action.productData.title,
				action.productData.imageUrl,
				action.productData.description,
				action.productData.price
			);
			return {
				...state,
				availableProducts: state.availableProducts.concat(newProduct),
			};
		}
	}
	return state;
};
