export const ADD_ORDER = "ADD_ORDER";

export const addOrder = (cartItems, totalAmount) => {
	const date = new Date();
	return async (dispatch, getState) => {
		const { token, userId } = getState().auth;
		const response = await fetch(
			`https://rn-complete-guide.firebaseio.com/orders/${userId}.json?auth=${token}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ cartItems, totalAmount, date: date.toISOString() }),
			}
		);

		const resData = await response.json();

		dispatch({
			type: ADD_ORDER,
			orderData: { id: resData.name, items: cartItems, amount: totalAmount, date },
		});
	};
};
