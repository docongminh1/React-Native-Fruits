
import React, { Component } from 'react';
import {
    Button,
    Image,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    FlatList,
    Alert,
    RefreshControl
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView } from 'react-navigation';
import Icon from "react-native-vector-icons/FontAwesome";
import NumericInput, { calcSize } from 'react-native-numeric-input'

export default class cartComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: [],
            totalPrice: 0,
            quantity: 0,
            orderItem: [],
            refreshing: true,
        }
    }

    onRefresh = () => {
        this.setState({
            refreshing: true
        })
        this.getData()
        this.setState({
            refreshing: false
        });
    }

    getData() {
        AsyncStorage.getItem("CART", (err, res) => {
            if (!res) {
                this.setState({ cartItems: [] });
            }
            else {
                this.setState({ cartItems: JSON.parse(res) });
                // console.log("cart didmount", this.state.cartItems)
            }
        })
    }

    removeItemPressed(item) {
        Alert.alert(
            'Xoa ' + item.name,
            'Ban that su muon xoa sản phẩm?',
            [
                { text: 'Khong', onPress: () => console.log('No Pressed'), style: 'cancel' },
                { text: 'Co', onPress: () => this.removeItem(item) },
            ]
        )
    }
    removeItem(itemToRemove) {
        let items = [];
        this.state.cartItems.map((item) => {
            if (JSON.stringify(item) !== JSON.stringify(itemToRemove))
                items.push(item);
        });
        this.setState({ cartItems: items });
        AsyncStorage.setItem("CART", JSON.stringify(items));
    }

    removeAllPressed() {
        Alert.alert(
            'Xoa tat ca',
            'Ban co chac muon xoa tat ca sản phẩm trong gio hang ?',
            [
                { text: 'Khong', onPress: () => console.log('No Pressed'), style: 'cancel' },
                { text: 'Co', onPress: () => this.removeAll() }
            ]
        )
    }
    removeAll() {
        this.setState({ cartItems: [] })
        AsyncStorage.setItem("CART", JSON.stringify([]));
    }

    currencyFormat(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' đ'
    }

    componentDidUpdate(nextProps) {
        //tinh tong so tien
        const itemTotal = this.state.cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
        if (itemTotal !== this.state.totalPrice) {
            this.setState({
                totalPrice: itemTotal
            })
        }
        
        // if(this.state.refreshing === true){
        //     this.getData()
        //     this.setState({
        //         refreshing : false
        //     })
        //     console.log("cartItem lenght update", this.state.cartItems.length)
        // }
        if(this.state.cartItems !== nextProps )
        {
            this.getData()
        }
        
    }
    componentDidMount() {
        //clear all item
        // AsyncStorage.setItem("CART", JSON.stringify([]));

        AsyncStorage.getItem("CART").then((err, res) => {
            if (!res) {
                this.setState({ cartItems: [] });
            }
            else {
                this.setState({ cartItems: JSON.parse(res) })
                console.log("cart didmount", this.state.cartItems)
                // if (this.state.cartItems._id === this.state.cartItems._id) {
                //     this.state.cartItems.quantity = this.state.cartItems.quantity + this.state.cartItems.quantity

                //     var items = JSON.parse(res);
                //     items.push(this.state.cartItems);
                //     AsyncStorage.setItem("CART", JSON.stringify(items));
                // } else {
                //     this.state.cartItems.quantity = this.state.cartItems.quantity

                //     var items = JSON.parse(res);
                //     items.push(this.state.cartItems);
                //     AsyncStorage.setItem("CART", JSON.stringify(items));
                // }
            }
            console.log("cartItem lenght", this.state.cartItems.length)
        })
        
        // this.removeAll()
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.1 }}>
                    <ImageBackground
                        source={require('../../res/images/topBarBg.png')}
                        style={{ flex: 1, flexDirection: "row" }}
                        resizeMode="cover"
                    >
                        <View style={{ flex: 1, alignItems: "flex-start", justifyContent: "center" }}>
                            <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }}>
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

                        <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 24, color: "white" }}>Giỏ hàng</Text>
                        </View>

                        <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}>
                            <Icon
                                name={"trash-o"}
                                style={{
                                    // position: "absolute",
                                    marginLeft: 20,
                                    alignSelf: "center",
                                    color: "white"
                                }}
                                size={30}
                                onPress={() => { this.removeAllPressed() }}
                            />
                        </View>
                    </ImageBackground>
                </View>
                <View style={{ flex: 0.8, backgroundColor: "#FAFAFA" }}>
                    {this.state.cartItems.length <= 0
                        ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name="cart-plus" size={100}
                                style={{ fontSize: 100, color: '#95a5a6', marginBottom: 7 }} />
                            <Text style={{ color: '#95a5a6' }}>Your cart is empty</Text>
                        </View>
                        :
                        <FlatList
                            data={this.state.cartItems}
                            // refreshControl={
                            //     <RefreshControl
                            //         refreshing={this.state.refreshing}
                            //         onRefresh={this.onRefresh}
                            //     />
                            // }
                            renderItem={({ item, index }) =>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: (index % 2 === 0) ? '#EAECEE' : '#D6DBDF',
                                    height: 120,
                                    margin: 10,
                                    borderRadius: 8,
                                    flexDirection: "row"
                                }}
                                >
                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: "25%" }}>
                                        <Image source={{ uri: item.imageFruit }}
                                            style={{ width: 80, height: 80, marginLeft: 40 }}
                                        />
                                    </View>
                                    <View style={{ justifyContent: "center", marginLeft: 20, width: "50%" }}>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={{ fontSize: 18 }}> Tên sản phẩm: </Text>
                                            <Text style={{ fontSize: 18 }}> {item.name} </Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={{ fontSize: 18 }}> Giá sản phẩm: </Text>
                                            <Text style={{ fontSize: 18 }}> {this.currencyFormat(item.price)} </Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={{ fontSize: 18 }}> Số lượng: </Text>
                                            <Text style={{ fontSize: 18 }}> {item.quantity}</Text>
                                            <Text style={{ fontSize: 18 }}>kg</Text>
                                        </View>
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: "25%" }}>
                                        <Icon
                                            name={"trash-o"}
                                            style={{
                                                // position: "absolute",
                                                marginLeft: 20,
                                                alignSelf: "center"
                                            }}
                                            size={30}
                                            onPress={() => { this.removeItemPressed(item) }}
                                        />
                                    </View>
                                </View>
                            }
                        />
                    }
                </View>
                <View
                    style={{
                        flex: 0.1,
                        backgroundColor: "#FAFAFA",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <View style={{ flexDirection: "row", marginBottom: 10 }}>
                        <Text style={{ color: "#335272", fontSize: 18, fontWeight: "bold" }}>Tổng tiền: </Text>
                        <Text style={{ color: "#335272", fontSize: 18, fontWeight: "bold" }}>
                            {this.currencyFormat(this.state.totalPrice)}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#3c3ab2",
                            height: 40,
                            marginLeft: 20,
                            marginRight: 10,
                            borderRadius: 8,
                            width: "70%",
                            alignItems: "center",
                            justifyContent: "center",

                        }}
                        onPress={() => {
                            this.props.navigation.navigate(
                                "Order", {
                                "dataOrder": this.state.cartItems
                            })
                        }}
                    >
                        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>THANH TOÁN</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}