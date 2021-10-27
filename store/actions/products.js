export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const SET_PRODUCT = "SET_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const fetchProduct = () => {
	return async (dispatch, getState) => {
		const { userId } = getState().auth;
		try {
			const response = await fetch("https://rn-complete-guide.firebaseio.com/products.json");

			if (!response.ok) {
				throw new Error("something went wrong");
			}

			const resData = await response.json();
			const loadedProducts = Object.values(resData);
			dispatch({
				type: SET_PRODUCT,
				products: loadedProducts,
				userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
			});
		} catch (error) {
			console.log(error);
		}
	};
};

export const createProduct = (title, description, imageUrl, price) => {
	return async (dispatch, getState) => {
		// any async code can be in here
		const { token, userId } = getState().auth;
		if (token !== null) {
			const response = await fetch("https://rn-complete-guide.firebaseio.com/products.json", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title, description, imageUrl, price }),
			});

			const resData = await response.json();

			dispatch({
				type: CREATE_PRODUCT,
				productData: {
					id: resData.name,
					title,
					description,
					imageUrl,
					price,
					ownerId: userId,
				},
			});
		}
	};
};

export const updateProduct = (id, title, description, imageUrl) => {
	return async (dispatch, getState) => {
		const { token, userId } = getState().auth;
		await fetch(`https://rn-complete-guide.firebaseio.com/products/${id}.json?auth=${token}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title, description, imageUrl }),
		});

		dispatch({
			type: UPDATE_PRODUCT,
			pid: id,
			productData: {
				title,
				description,
				imageUrl,
				ownerId: userId,
			},
		});
	};
};

export const deleteProduct = (productId) => {
	return async (dispatch) => {
		await fetch(`https://rn-complete-guide.firebaseio.com/products/${productId}.json`, {
			method: "DELETE",
		});

		dispatch({
			type: DELETE_PRODUCT,
			pid: productId,
		});
	};
};
