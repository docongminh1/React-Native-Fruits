import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    FlatList,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback,
    Alert,
    Picker
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
//import Icon from "react-native-vector-icons/FontAwesome";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { color } from 'react-native-reanimated';

import { API_FRUIT, userProfile } from '../../config/setting'
const urlCreateOrderFruit = `${API_FRUIT}/api/order/creatOrder`;

export default class orderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titleShip: "Để đảm bảo giao hàng thuận tiện nhất thì hiện tại chúng tôi chỉ có chi nhánh bán lẻ ở TP HCM nếu quý khách mua hàng ở xa hoặc mua sỉ xin vui lòng đến trực tiếp cửa hàng hoặc liên lạc với chúng tôi qua SĐT xin cảm ơn",
            titleNonShip: "Nếu bạn không đặt hàng trước chúng tôi chỉ có thể giữ đơn hàng của bạn tối đa 24h trước khi hủy",
            userId:"",
            username: "",
            email: "",
            telephone: "",
            isLogin: false,

            isShip: 1,
            shipping: [
                { label: 'Có giao hàng', value: 1 },
                { label: 'Không giao hàng', value: 0 }
            ],
            isShipFor: false,
            shipFor: [
                { key: 1, name: 'Gửi cho bản thân', value: false},
                { key: 2, name: 'Gửi cho bạn bè, người thân', value: true },
            ],
            isPayment: "momo",
            payment: [
                { key: 1, name: 'Thanh toán bằng momo', value: "momo" },
                //cod Cash On Delivery 
                { key: 2, name: 'Thanh toán khi nhận hàng', value: "cod" },
            ],
            cartItems: [],

            _id: "",
            name: "",
            price: 0,
            countInStock: 0,
            imageFruit: null,
            brand: "",
            description: "",
            quantity: 0,

            itemPrice: 0,

            city: "TP HCM",

            addressDistrict: [
                { "Districts": "Quận 1", "District": "Quận 1" },
                { "Districts": "Quận 2", "District": "Quận 2" },
                { "Districts": "Quận 3", "District": "Quận 3" },
                { "Districts": "Quận 4", "District": "Quận 4" },
                { "Districts": "Quận 5", "District": "Quận 5" },
                { "Districts": "Quận 6", "District": "Quận 6" },
                { "Districts": "Quận 7", "District": "Quận 7" },
                { "Districts": "Quận 8", "District": "Quận 8" },
                { "Districts": "Quận 9", "District": "Quận 9" },
                { "Districts": "Quận 10", "District": "Quận 10" },
                { "Districts": "Quận 11", "District": "Quận 11" },
                { "Districts": "Quận 12", "District": "Quận 12" },
                { "Districts": "Quận Bình Tân", "District": "Quận Bình Tân" },
                { "Districts": "Quận Bình Thạnh", "District": "Quận Bình Thạnh" },
                { "Districts": "Quận Gò Vấp", "District": "Quận Gò Vấp" },
                { "Districts": "Quận Phú Nhuận", "District": "Quận Phú Nhuận" },
                { "Districts": "Quận Tân Bình", "District": "Quận Tân Bình" },
                { "Districts": "Quận Tân Phú", "District": "Quận Tân Phú" },
                { "Districts": "Quận Thủ Đức", "District": "Quận Thủ Đức" },
                { "Districts": "Quận Bình Chánh", "District": "Quận Bình Chánh" },
                { "Districts": "Quận Cần Giờ", "District": "Quận Cần Giờ" },
                { "Districts": "Quận Củ Chi", "District": "Quận Củ Chi" },
                { "Districts": "Quận Hóc Môn", "District": "Quận Hóc Môn" },
                { "Districts": "Quận Nhà Bè", "District": "Quận Nhà Bè" }
            ],
            districtLabel: "",
            Districts: "Quận 1",
            address: "",
            isMethodShip: 30000,
            methodShipping: [
                { label: 'Giao hàng tiêu chuẩn: Giao hàng 1 ngày sau khi đặt', value: 30000 },
                { label: 'Giao hàng nhanh: Giao hàng trong 2 giờ sau khi đặt', value: 45000 }
            ],

            note: "",
        }
    }
    pickerDistrict(district) {
        this.state.addressDistrict.map((v, i) => {
            if (district === i) {
                this.setState({
                    districtLabel: this.state.addressDistrict[district].District,
                    Districts: this.state.addressDistrict[district].Districts
                })
            }
        })
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val });
    };

    currencyFormat(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' đ'
    }

    onChangePayments = (payments) => {
        this.setState({
            isPayment: payments
        })

    }

    async postDataOrderToApi() {
        const item = this.props.navigation.getParam('dataOrder');

        const userId = this.state.userId
        const username = this.state.username
        const email = this.state.email
        const telephone = this.state.telephone
        const orderItems = item
        //const orderItems = this.state.cartItems
        const city = (this.state.isShip === 1) ? this.state.city : ""
        const address = this.state.address
        const district = (this.state.isShip === 1) ? this.state.Districts : ""
        const note = this.state.note
        const payment = (this.state.isShip === 1) ? this.state.isPayment : "Thanh toan tai cua hang"
        const shippingPrice = (this.state.isShip === 1) ? this.state.isMethodShip : 0
        const itemsPrice = this.state.itemPrice
        const taxPrice = this.state.itemPrice * 0.1
        const totalPrice = this.state.itemPrice + taxPrice + shippingPrice
        const isDelivered = (this.state.isShip === 1) ? "Co giao hang" : "Khong giao hang"

        const response = await fetch(`${urlCreateOrderFruit}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(bodyData)
            body: JSON.stringify({
                user: {
                    userId: userId,
                    username: username,
                    email: email,
                    sdt: telephone
                },
                orderItems: orderItems,
                shipping: {
                    city: city,
                    address: address + " " + district,
                    note: note
                },
                shippingPrice: shippingPrice,
                payment: payment,
                itemsPrice: itemsPrice,
                taxPrice: taxPrice,
                totalPrice: totalPrice,
                isDelivered: isDelivered,
            })

        })
            .then(response => response.json())
            .catch(err => {
                console.log("error:", err)
                return {
                    resultCode: -1,
                    message: 'Không kết nối được tới server 1',
                    data: null
                }
            })
        console.log(`response = ${JSON.stringify(response)}`)
        // console.log("_id:", response.data._id)
        return response
    }

    showViewShip() {
        return (
            <View>
                <Text style={{ color: "#7B241C", fontWeight: "bold", marginLeft: 40, marginRight: 40, fontSize: 20 }}>
                    {this.state.titleShip}</Text>
                <View style={styles.viewTextInput}>
                    <Icon
                        name={"user"}
                        color={"#335272"}
                        style={styles.iconTextInput}
                        size={25}
                    />
                    <TextInput
                        placeholderTextColor={"#9fa8b7"}
                        value={this.state.username}
                        onChangeText={val => this.onChangeText("username", val)}
                        style={styles.textInput}
                        placeholder={" Tên "}
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.viewTextInput}>
                    <Icon
                        name={"envelope"}
                        color={"#335272"}
                        style={styles.iconTextInput}
                        size={25}
                    />
                    <TextInput
                        placeholderTextColor={"#9fa8b7"}
                        value={this.state.email}
                        onChangeText={val => this.onChangeText("email", val)}
                        style={styles.textInput}
                        placeholder={" Email @... "}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.viewTextInput}
                >
                    <Icon
                        name={"phone"}
                        color={"#335272"}
                        style={styles.iconTextInput}
                        size={25}
                    />
                    <TextInput
                        placeholderTextColor={"#9fa8b7"}
                        value={this.state.telephone}
                        onChangeText={val => this.onChangeText("telephone", val)}
                        style={styles.textInput}
                        keyboardType={"numeric"}
                        placeholder={" Số điện thoại"}
                        autoCapitalize="none"

                    />
                    <TouchableOpacity
                        style={{ padding: 10, alignSelf: "center" }}
                        onPress={() => {
                            this.setState({

                            });
                        }}
                    >
                    </TouchableOpacity>
                </View>
                <View style={styles.viewTextInput}
                >
                    <Icon
                        name={"building"}
                        color={"#335272"}
                        style={styles.iconTextInput}
                        size={25}
                    />
                    {/* <TextInput
                        placeholderTextColor={"#9fa8b7"}
                        value={this.state.city}
                        onChangeText={val => this.onChangeText("city", val)}
                        style={styles.textInput}
                        placeholder={" Thanh pho "}
                        autoCapitalize="none"
                    /> */}
                    <Text style={styles.textInput}>{this.state.city}</Text>
                </View>
                <View
                    style={{
                        borderWidth: 0.5,
                        borderRadius: 5,
                        backgroundColor: "#e7eaec",
                        marginLeft: 40,
                        marginRight: 40,
                        marginTop: 35,
                    }}>
                    <Picker
                        style={{ color: "#333333", fontWeight: "bold" }}
                        mode={("dropdown")}
                        selectedValue={this.state.Districts}
                        onValueChange={(itemValueDistrict, itemIndexDistrict) => this.pickerDistrict(itemIndexDistrict)}>{
                            this.state.addressDistrict.map((v) => {
                                return <Picker.Item label={v.District} value={v.Districts} />
                            })
                        }
                    </Picker>
                </View>
                <View style={styles.viewTextInput}
                >
                    <Icon
                        name={"home"}
                        color={"#335272"}
                        style={styles.iconTextInput}
                        size={25}
                    />
                    <TextInput
                        placeholderTextColor={"#9fa8b7"}
                        value={this.state.address}
                        onChangeText={val => this.onChangeText("address", val)}
                        style={styles.textInput}
                        placeholder={" Số nhà, phường/xã "}
                        autoCapitalize="none"
                    />
                </View>
                <Text style={{ color: "#19e7f7", fontWeight: "bold", fontSize: 18, marginLeft: 40, marginRight: 40, marginTop: 35 }}
                >Phương thức giao hàng: ( Chốt đơn từ 8h30 sáng đến 20h30 tối)</Text>
                <RadioForm
                    radio_props={this.state.methodShipping}
                    initial={0}
                    labelHorizontal={true}

                    animation={true}
                    onPress={(value) => { this.setState({ isMethodShip: value }) }}
                    style={{ fontWeight: "bold", marginTop: 15, marginLeft: 40 }}
                    labelColor={"white"}

                    wrapStyle={{ fontWeight: "bold" }}
                />
                <View style={styles.viewTextInput}
                >
                    <Icon
                        name={"file"}
                        color={"#335272"}
                        style={styles.iconTextInput}
                        size={25}
                    />
                    <TextInput
                        placeholderTextColor={"#9fa8b7"}
                        value={this.state.note}
                        onChangeText={val => this.onChangeText("note", val)}
                        style={styles.textInput}
                        placeholder={" Ghi chú "}
                        autoCapitalize="none"
                    />
                </View>
                <View style={{ marginLeft: 40, marginTop: 20 }}>
                    <Text style={{ color: "#19e7f7", fontWeight: "bold", fontSize: 18 }}
                    > Danh sách đơn hàng cửa bạn: </Text>
                    <FlatList
                        data={this.state.cartItems}
                        renderItem={({ item, index }) =>
                            <View
                                style={{
                                    flex: 1,
                                    height: 120,
                                    marginRight: 40,
                                    marginTop: 10,
                                    borderRadius: 8,
                                    backgroundColor: (index % 2 === 0) ? '#D6EAF8' : '#D1F2EB',
                                    flexDirection: "row"
                                }}
                            >
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: "25%" }}>
                                    <Image source={{ uri: item.imageFruit }}
                                        style={{ width: 60, height: 60 }}
                                    />
                                </View>
                                <View style={{ justifyContent: "center", marginLeft: 20, width: "75%" }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={styles.textStyle}> Tên sản phẩm: </Text>
                                        <Text style={styles.textStyle}> {item.name} </Text>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={styles.textStyle}> Đơn giá: </Text>
                                        <Text style={styles.textStyle}> {this.currencyFormat(item.price)} </Text>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={styles.textStyle}> Số lượng: </Text>
                                        <Text style={styles.textStyle}> {item.quantity}kg </Text>
                                    </View>
                                </View>
                            </View>
                        }
                    />
                    <View style={{ flexDirection: "row", width: "100%" }}>
                        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Thành tiền: </Text>
                        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
                            {this.currencyFormat(this.state.itemPrice)}</Text>
                    </View>
                    <View style={{ flexDirection: "row", width: "100%" }}>
                        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Thuế (10%): </Text>
                        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
                            {this.currencyFormat(this.state.itemPrice * 0.1)}</Text>
                    </View>
                    <View style={{ flexDirection: "row", width: "100%" }}>
                        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Phí giao hàng: </Text>
                        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
                            {this.currencyFormat(this.state.isMethodShip)}</Text>
                    </View>
                    <View style={{ flexDirection: "row", width: "100%" }}>
                        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Tổng tiền: </Text>
                        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
                            {this.currencyFormat((this.state.itemPrice * 0.1) + this.state.itemPrice + this.state.isMethodShip)}</Text>
                    </View>
                </View>
                <View>
                    <Text style={{ color: "white", fontSize: 18, fontWeight: "bold", marginLeft: 40, }}>
                        Phương thức thanh toán :
                    </Text>
                    <View>
                        {this.state.payment.map(item => (
                            <TouchableOpacity
                                key={item.key}
                                value={item.value}
                                onPress={this.onChangePayments.bind(this, item.value)}
                            >
                                <View style={this.state.isPayment == item.value ? styles.paymentActive : styles.payment}>
                                    <Text
                                        style={{ fontSize: 18, marginLeft: 20, fontWeight: "bold", color: "gray" }}
                                    >{item.name}</Text>
                                    {item.key === 1
                                        ?
                                        // <Icon name="cc-mastercard" size={30} color="#19e7f7" style={{ marginLeft: 7 }} />
                                        // && <Icon name="cc-visa" size={30} color="#19e7f7" style={{ marginLeft: 7 }} />
                                        <Image
                                            source={require("../../res/images/logo/logo-momo.png")}
                                            style={{ width: 30, height: 30, marginLeft: 7 }}
                                        />
                                        :
                                        <Icon name="hand-holding" size={35} color="#34495e" style={{ marginLeft: 7 }} />
                                    }
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                    {/* </View> */}
                </View>
            </View>

        )
    }
    showViewNonShip() {
        return (
            <View>
                <Text style={{ color: "#7B241C", fontWeight: "bold", marginLeft: 40, marginRight: 40, fontSize: 20 }}>
                    {this.state.titleNonShip}</Text>
                <View style={styles.viewTextInput}>
                    <Icon
                        name={"user"}
                        color={"#335272"}
                        style={styles.iconTextInput}
                        size={25}
                    />
                    <TextInput
                        placeholderTextColor={"#9fa8b7"}
                        value={this.state.username}
                        onChangeText={val => this.onChangeText("username", val)}
                        style={styles.textInput}
                        placeholder={" Tên "}
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.viewTextInput}>
                    <Icon
                        name={"envelope"}
                        color={"#335272"}
                        style={styles.iconTextInput}
                        size={25}
                    />
                    <TextInput
                        placeholderTextColor={"#9fa8b7"}
                        value={this.state.email}
                        onChangeText={val => this.onChangeText("email", val)}
                        style={styles.textInput}
                        placeholder={" Email @... "}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.viewTextInput}
                >
                    <Icon
                        name={"phone"}
                        color={"#335272"}
                        style={styles.iconTextInput}
                        size={25}
                    />
                    <TextInput
                        placeholderTextColor={"#9fa8b7"}
                        value={this.state.telephone}
                        onChangeText={val => this.onChangeText("telephone", val)}
                        style={styles.textInput}
                        keyboardType={"numeric"}
                        placeholder={" Số điện thoại"}
                        autoCapitalize="none"

                    />
                    <TouchableOpacity
                        style={{ padding: 10, alignSelf: "center" }}
                        onPress={() => {
                            this.setState({

                            });
                        }}
                    >
                    </TouchableOpacity>
                </View>
                <View style={{ marginLeft: 40, marginTop: 20 }}>
                    <Text style={{ color: "#19e7f7", fontWeight: "bold", fontSize: 18 }}
                    > Danh sách đơn hàng cửa bạn: </Text>
                    <FlatList
                        data={this.state.cartItems}
                        renderItem={({ item, index }) =>
                            <View
                                style={{
                                    flex: 1,
                                    height: 120,
                                    marginRight: 40,
                                    marginTop: 10,
                                    borderRadius: 8,
                                    backgroundColor: (index % 2 === 0) ? '#D6EAF8' : '#D1F2EB',
                                    flexDirection: "row"
                                }}
                            >
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: "25%" }}>
                                    <Image source={{ uri: item.imageFruit }}
                                        style={{ width: 60, height: 60 }}
                                    />
                                </View>
                                <View style={{ justifyContent: "center", marginLeft: 20, width: "75%" }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={styles.textStyle}> Tên sản phẩm: </Text>
                                        <Text style={styles.textStyle}> {item.name} </Text>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={styles.textStyle}> Đơn giá: </Text>
                                        <Text style={styles.textStyle}> {this.currencyFormat(item.price)} </Text>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={styles.textStyle}> Số lượng: </Text>
                                        <Text style={styles.textStyle}> {item.quantity}kg </Text>
                                    </View>
                                </View>
                            </View>
                        }
                    />
                    <View style={{ flexDirection: "row", width: "100%" }}>
                        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Thuế: </Text>
                        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
                        {this.currencyFormat(this.state.itemPrice * 0.1)}</Text>
                    </View>
                    <View style={{ flexDirection: "row", width: "100%" }}>
                        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Tổng tiền: </Text>
                        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
                        {this.currencyFormat((this.state.itemPrice * 0.1) + this.state.itemPrice)}</Text>
                    </View>
                </View>
            </View>

        )
    }

    showView() {
        if (this.state.isShip === 1) {
            return this.showViewShip()
        }
        else if (this.state.isShip === 0) {
            return this.showViewNonShip()
        }
    }

    showViewParentShip() {
        if (this.state.isShipFor === false) {
            return this.showViewShip()
        }
        else if (this.state.isShipFor === true) {
            return this.showViewNonShip()
        }
    }

    componentDidUpdate() {
        const itemUpdate = this.props.navigation.getParam('dataOrder');
        if (itemUpdate.name !== this.state.name) {
            this.setState({
                _id: itemUpdate._id,
                name: itemUpdate.name,
                price: itemUpdate.price,
                brand: itemUpdate.brand,
                countInStock: itemUpdate.countInStock,
                imageFruit: itemUpdate.imageFruit,
                description: itemUpdate.description,

                // cartItems: itemUpdate,
            })
        }
        if(itemUpdate !== this.state.cartItems){
            this.setState({
                cartItems: itemUpdate
            })
        }
        // console.log("order didupdate", itemUpdate)
        // console.log("order orderList didupdate", this.state.cartItems)
        const itemTotal = this.state.cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
        if (itemTotal !== this.state.itemPrice) {
            this.setState({
                itemPrice: itemTotal
            })
        }

        // const totalPrice= (this.state.itemPrice * 0.1) + this.state.itemPrice + this.state.isMethodShip
        // console.log("total price", totalPrice)

    }

    componentDidMount() {
        const item = this.props.navigation.getParam('dataOrder');
        this.setState({
            _id: item._id,
            name: item.name,
            price: item.price,
            brand: item.brand,
            countInStock: item.countInStock,
            imageFruit: item.imageFruit,
            description: item.description,
            cartItems: item,
        })
        console.log("order didmount", item)
        // console.log("orderList didmount", this.state.cartItems)

        // const totalPrice= (this.state.itemPrice * 0.1) + this.state.itemPrice + this.state.isMethodShip
        // console.log("total price", totalPrice)

        this.setState({
            userId: userProfile._id,
            username: userProfile.name,
            email: userProfile.email,
            telephone: userProfile.tel,
            isLogin: userProfile.isLogin,
        })
        console.log("order profile", userProfile)
        console.log("order profile isLogin", this.state.isLogin)
    }

    render() {
        // const orderList = [{...this.state.cartItems}];
        // console.log("aaaaa", orderList)
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.1 }}>
                    <ImageBackground
                        source={require('../../res/images/topBarBg.png')}
                        style={{ flex: 1, flexDirection: "row" }}
                        resizeMode="cover"
                    >
                        <View style={{ flex: 1, alignItems: "flex-start", justifyContent: "center" }}>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("Cart") }}>
                                <Icon
                                    name={"chevron-left"}
                                    color={"white"}
                                    style={{
                                        // position: "absolute",
                                        marginLeft: 20,
                                        alignSelf: "center"
                                    }}
                                    size={25}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 24, color: "white" }}>Giao Hàng</Text>
                        </View>

                        <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}>
                            <Text> </Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{ flex: 0.9, backgroundColor: "#FAFAFA" }}>
                    <ImageBackground
                        source={require('../../res/images/background.png')}
                        style={{ flex: 1, marginHorizontal: -20 }}
                        resizeMode="cover"
                    >
                        <ScrollView>
                            <View style={{ flex: 0.7 }}>
                                <View style={{ alignItems: "center", paddingTop: 40 }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
                                        <Text style={{ color: "#19e7f7", fontWeight: "bold" }}
                                        >Nếu bạn chưa đăng nhập bấm vào đây để đăng nhập</Text>
                                    </TouchableOpacity>
                                </View>
                                <RadioForm
                                    radio_props={this.state.shipping}
                                    initial={0}
                                    formHorizontal={true}
                                    labelHorizontal={true}
                                    buttonColor={'#2196f3'}
                                    animation={true}
                                    onPress={(value) => { this.setState({ isShip: value }) }}
                                    style={{ justifyContent: 'space-around', fontWeight: "bold", marginTop: 15 }}
                                    labelColor={"white"}
                                    wrapStyle={{ fontWeight: "bold" }}
                                />

                                {this.showView()}

                                <View style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    marginTop: 40,
                                    paddingLeft: 40,
                                    paddingRight: 40
                                }}
                                >
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: "#5A81F7",
                                            height: 60,
                                            borderRadius: 8,
                                            width: "50%",
                                            alignItems: "center",
                                            justifyContent: "center",

                                        }}
                                        onPress={async () => {
                                            const { address, note, username, email, telephone, isLogin,
                                                isPayment, isShip, isMethodShip, itemPrice } = this.state;
                                            const totalPrice = (itemPrice * 0.1) + itemPrice + isMethodShip
                                            // check ship
                                            if (isShip === 1) {
                                                //yeu cau nhap textInput
                                                if (address.trim() === ""
                                                    || username.trim() === ""
                                                    || email.trim() === ""
                                                    || telephone.trim() === ""
                                                ) {
                                                    Alert.alert(
                                                        'THÔNG BÁO !!!',
                                                        ' Bạn không được bỏ trống thông tin giao hàng !!!'
                                                    );
                                                    return;
                                                }
                                                else {
                                                    //check login
                                                    if (isLogin === true) {
                                                        const response = await this.postDataOrderToApi()
                                                        if (response.resultCode !== undefined && response.resultCode === 1) {
                                                            alert(response.message)
                                                            this.setState({
                                                                address: "",
                                                                note: "",
                                                                // username: "",
                                                                // email: "",
                                                                telephone: ""
                                                            })
                                                            if(isPayment === "momo" ){
                                                                //momo
                                                                this.props.navigation.navigate(
                                                                    'PayWithMomo', {
                                                                    'dataPayment': { ...response.data }
                                                                })
                                                            }
                                                        }
                                                        else {
                                                            alert(response.message === undefined
                                                                ? 'Không kết nối được tới server 2'
                                                                : response.message)
                                                        }
                                                    }
                                                    else {
                                                        Alert.alert(
                                                            'THÔNG BÁO !!!',
                                                            ' Bạn cần đăng nhập trước khi đặt hàng !!!'
                                                        );
                                                        return;
                                                    }
                                                }
                                            }
                                            else {
                                                if (username.trim() === ""
                                                    || email.trim() === ""
                                                    || telephone.trim() === ""
                                                ) {
                                                    Alert.alert(
                                                        'THÔNG BÁO !!!',
                                                        ' Bạn không được bỏ trống thông tin giao hàng !!!'
                                                    );
                                                    return;
                                                }
                                                else {
                                                    //check login
                                                    if (isLogin === true) {
                                                        const response = await this.postDataOrderToApi()
                                                        if (response.resultCode !== undefined && response.resultCode === 1) {
                                                            alert(response.message)
                                                            this.setState({
                                                                // username: "",
                                                                // email: "",
                                                                telephone: ""
                                                            })
                                                        }
                                                        else {
                                                            alert(response.message === undefined
                                                                ? 'Không kết nối được tới server 3'
                                                                : response.message)
                                                        }
                                                    }
                                                    else {
                                                        Alert.alert(
                                                            'THÔNG BÁO !!!',
                                                            ' Bạn cần đăng nhập trước khi đặt giữ hàng !!!'
                                                        );
                                                        return;
                                                    }
                                                }
                                            }

                                        }}>
                                        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                                        >Xác nhận đơn hàng</Text>
                                    </TouchableOpacity>
                                    {/* click to next step */}
                                    {/* <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('HomePage')}>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: "flex-end",
                                                justifyContent:"flex-end",
                                                marginTop: 20,
                                                width: '100%',
                                            }}>
                                            <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}
                                            >Tiep theo</Text>
                                            <Icon
                                                name={"chevron-right"}
                                                color={"white"}
                                                style={{
                                                    // position: "absolute",
                                                    marginLeft: 20,
                                                    alignSelf: "center"
                                                }}
                                                size={30}
                                            />
                                        </View>
                                    </TouchableOpacity> */}
                                </View>
                            </View>
                        </ScrollView>
                    </ImageBackground>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    viewTextInput: {
        marginHorizontal: 20,
        flexDirection: "row",
        borderRadius: 5,
        backgroundColor: "#e7eaec",
        marginTop: 35,
        marginLeft: 40,
        marginRight: 40
    },
    textInput: {
        color: "#335272",
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 40,
        fontSize: 18,
        textAlign: "center"
    },
    textStyle: {
        fontSize: 18,
    },
    iconTextInput: {
        position: "absolute",
        left: 20,
        alignSelf: "center"
    },
    payment: {
        borderRadius: 10,
        borderColor: 'white',
        backgroundColor: "white",
        borderWidth: 0.5,
        marginHorizontal: 5,
        flexDirection: "row",
        marginLeft: 40,
        marginRight: 40,
        height: 60,
        alignItems: "center",
        marginTop: 10
    },
    paymentActive: {
        borderRadius: 10,
        backgroundColor: '#19e7f7',
        flexDirection: "row",
        marginLeft: 40,
        marginRight: 40,
        height: 60,
        alignItems: "center",
        borderWidth: 0.5,
        marginTop: 5
    },

})