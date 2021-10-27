import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { applyMiddleware, combineReducers, createStore } from "redux";
import ProductDetail from "./screens/shop/ProductDetail";
import ProductOverview from "./screens/shop/ProductOverview";
import authReducer from "./store/reducers/auth";
import productsReducer from "./store/reducers/products";
import orderReducer from "./store/reducers/order";
import cartReducer from "./store/reducers/cart";
import HeaderStyle from "./styles/HeaderStyle";
import HeaderBtn from "./components/elements/HeaderBtn";
import Cart from "./screens/shop/Cart";
import Login from "./screens/user/Login";
import SignUp from "./screens/user/SignUp";
import StartUp from "./screens/StartUp";

export default function App({ navigation }) {
	const rootReducer = combineReducers({
		auth: authReducer,
		products: productsReducer,
		carts: cartReducer,
		orderData: orderReducer,
	});

	const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
	const Stack = createNativeStackNavigator();

	// navigation5에서 timer부분 확인하고 추가하기

	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator screenOptions={HeaderStyle} initialRouteName="Login">
					<Stack.Screen name="Login" component={Login} />
					<Stack.Screen name="SignUp" component={SignUp} />
					<Stack.Screen name="Startup" component={StartUp} />
					<Stack.Screen name="Products" component={ProductOverview} />
					<Stack.Screen
						name="Product Detail"
						component={ProductDetail}
						options={({ route }) => ({
							title: route.params.title,
							headerBackTitleVisible: false,
							headerRight: (props) => <HeaderBtn {...props} />,
						})}
					/>
					<Stack.Screen name="Cart" component={Cart} />
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}
