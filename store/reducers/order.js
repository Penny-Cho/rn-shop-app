import Order from "../../models/order";
import { ADD_ORDER } from "../actions/order";

const initialState = {
	id: 0,
	items: {},
	amount: 0,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_ORDER: {
			const newOrder = new Order(
				action.orderData.id,
				action.orderData.items,
				action.orderData.date,
				new Date()
			);
			return {
				...state,
				orders: state.orders.concat(newOrder),
			};
		}
	}
};
