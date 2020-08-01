
import React, { Component } from 'react';
import {
    Button,
    Image,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    FlatList,
    ActionSheetIOS,
    ToastAndroid,
    Alert,
    StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView } from 'react-navigation';
import Icon from "react-native-vector-icons/FontAwesome";
import { ScrollView } from 'react-native-gesture-handler';
import NumericInput, { calcSize } from 'react-native-numeric-input'

export default class detailProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // _id: "",
            name: "",
            price: "",
            countInStock: "",
            imageFruit: null,
            brand: "",
            description: "",
            product: {},
            quantity: 1,
        }
    }

    handleAddToCart = () => {
        var product = this.state.product;
        product['quantity'] = this.state.quantity;
        // if (product._id) {
        //     product.quantity = product.quantity + this.state.quantity
        // } else {
        //     product.quantity = this.state.quantity
        // }
        // console.log("detail quan", this.state.quantity)
        AsyncStorage.getItem("CART", (err, res) => {
            if (!res) {
                AsyncStorage.setItem("CART", JSON.stringify([product]) );
            }
            else {
                // if (product._id ) {
                //     product.quantity = product.quantity + this.state.quantity

                //     var items = JSON.parse(res);
                //     items.push(product);
                //     AsyncStorage.setItem("CART", JSON.stringify(items));
                // } else {
                //     product.quantity = this.state.quantity

                //     var items = JSON.parse(res);
                //     items.push(product);
                //     AsyncStorage.setItem("CART", JSON.stringify(items));
                // }
                var items = JSON.parse(res);
                items.push(product);
                AsyncStorage.setItem("CART", JSON.stringify(items) );
            }
        });
        // console.log("detail addcart : ", product)
    }

    currencyFormat(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' đ'
    }

    componentDidUpdate() {
        const item = this.props.navigation.getParam('dataDetail');
        if (item.name !== this.state.name) {
            this.setState({
                name: item.name,
                price: item.price.toString(),
                brand: item.brand,
                countInStock: item.countInStock.toString(),
                imageFruit: item.imageFruit,
                description: item.description,
                product: item,
            })
        }
        // console.log("detail didupdate", item)
        // console.log("detail product didupdate", this.state.product)
        console.log("detail update price", this.state.price)
    }

    componentDidMount() {
        const item = this.props.navigation.getParam('dataDetail');
        this.setState({
            _id: item._id,
            name: item.name,
            price: item.price.toString(),
            brand: item.brand,
            countInStock: item.countInStock.toString(),
            imageFruit: item.imageFruit,
            description: item.description,
            product: item,
        })
        console.log("detail didmount", item)
        // console.log("detail product didmount", this.state.product)
        console.log("detail price", this.state.price)
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

                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 24, color: "white" }}>{this.state.name}</Text>
                        </View>

                        <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}>
                            <Text> </Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{ flex: 0.8, backgroundColor: "#FAFAFA" }}>
                    <ScrollView style={{ }}>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Image
                                source={{ uri: this.state.imageFruit }}
                                style={{ width: 250, height: 250, marginTop: 20, borderRadius: 16 }}
                            />
                        </View>
                        <View style={{ }}>
                            <Text style={styles.textStyle}>Tên sản phẩm: {this.state.name}</Text>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.textStyle}>Giá sản phẩm: </Text>
                                <Text style={[styles.textStyle,{marginLeft: -20}]}>
                                    {this.state.price} đ</Text>
                                <Text style={[styles.textStyle,{marginLeft: -20}]}>/kg</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={styles.textStyle}>Số lượng: </Text>
                                <NumericInput
                                    value={this.state.quantity}
                                    onChange={value => this.setState({ quantity: value })}
                                    onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                                    totalWidth={120}
                                    totalHeight={40}
                                    iconSize={20}
                                    step={1}
                                    minValue={1}
                                    maxValue={this.state.countInStock}
                                    valueType='real'
                                    rounded
                                    type='up-down'
                                    textColor='#B0228C'
                                    // iconStyle={{ color: 'white' }}
                                    rightButtonBackgroundColor='#EA3788'
                                    leftButtonBackgroundColor='#E56B70'
                                />
                                <Text style={styles.textStyle}>KG</Text>
                            </View>
                            <Text style={styles.textStyle}>Sản xuất tại: {this.state.brand}</Text>
                            <Text style={styles.textStyle}>Số lượng còn lại: {this.state.countInStock}kg</Text>
                        </View>
                        <View style={{ }}>
                            <Text style={styles.textStyle}>Mô tả sản phẩm: </Text>
                            <Text style={styles.textStyle}>{this.state.description}</Text>
                        </View>
                    </ScrollView>
                </View>
                <View
                    style={{
                        flex: 0.1,
                        backgroundColor:"#F4F6F7",
                        // borderWidth: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <TouchableOpacity
                        style={{
                            // borderWidth: 1,
                            backgroundColor: "#3c3ab2",
                            height: 60,
                            marginLeft: 20,
                            marginRight: 10,
                            borderRadius: 8,
                            width: "80%",
                            alignItems: "center",
                            justifyContent: "center",

                        }}
                        onPress={() => {
                            this.handleAddToCart()
                            Alert.alert("Thông báo!!!",
                                "Bạn đã thêm thành công " + this.state.quantity + "kg" + " " + this.state.name
                            )
                        }}
                    >
                        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>THEM VAO GIO HANG</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    textStyle: {
        color: "#335272",
        fontSize: 18,
        margin: 20
    },
})