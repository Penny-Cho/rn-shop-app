import React from "react";
import PropTypes from "prop-types";
import {
	Button,
	Image,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import AppColor from "../../styles/AppColor";
import TextStyle from "../../styles/TextStyle";
import { MainButton } from "./Btns";

const ItemBox = ({ title, price, imgUrl, desc, needBtn, onPress, onPressCart }) => {
	let TouchableComp = TouchableOpacity;
	if (Platform.OS === "android" && Platform.Version >= 21) {
		TouchableComp = TouchableWithoutFeedback;
	}

	// android에서 touchablewithoutfeedbak을 할 시, 전체 component가 아래 버튼까지 잡아먹으므로 View안에 감쌀 것
	return (
		<View style={styles.root}>
			<TouchableComp onPress={onPress}>
				<View style={styles.touchableView}>
					<Image source={{ uri: imgUrl }} style={styles.image} />
					<View style={styles.wrapper}>
						<Text style={TextStyle.h2}>{title}</Text>
						<Text style={TextStyle.body1}>{desc}</Text>
					</View>
					<View style={styles.wrapper}>
						<Text style={[TextStyle.h4, { color: AppColor.accent }]}>{price}</Text>
					</View>
					{needBtn && (
						<View style={styles.btnWrapper}>
							<MainButton title="상품보기" onPress={onPress} />
							<Button title="cart" onPress={onPressCart} />
						</View>
					)}
				</View>
			</TouchableComp>
		</View>
	);
};

ItemBox.propTypes = {
	title: PropTypes.string.isRequired,
	desc: PropTypes.string.isRequired,
	price: PropTypes.string.isRequired,
	imgUrl: PropTypes.string.isRequired,
	needBtn: PropTypes.bool,
	onPress: PropTypes.func,
	onPressCart: PropTypes.func,
};

ItemBox.defaultProps = {
	needBtn: false,
	onPress: () => {},
	onPressCart: () => {},
};

const styles = StyleSheet.create({
	root: {
		marginVertical: "5%",
		borderRadius: 6,
		height: 400,
		backgroundColor: AppColor.background,
		borderColor: AppColor.line,
		borderWidth: 1,
	},
	touchableView: {
		overflow: "hidden",
	},
	image: {
		width: "100%",
		height: "50%",
		resizeMode: "cover",

		marginBottom: "3%",
		borderTopLeftRadius: 6,
		borderTopRightRadius: 6,
	},
	wrapper: {
		padding: 10,
	},
	btnWrapper: {
		flexDirection: "row",
		paddingTop: 5,
		paddingBottom: 10,
		paddingHorizontal: 10,
		justifyContent: "space-between",
		alignItems: "center",
	},
});

export default ItemBox;
