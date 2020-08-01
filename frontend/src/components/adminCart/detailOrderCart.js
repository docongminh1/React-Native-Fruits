
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
    StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView } from 'react-navigation';
import Icon from "react-native-vector-icons/FontAwesome";
import { ScrollView } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';

export default class detailOrderCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: "",
            isPaid: "",
            payment: "",
            itemsPrice: 0,
            taxPrice: 0,
            shippingPrice: 0,
            totalPrice: 0,
            isDelivered: "",
            createdAt: "",
            updatedAt: "",
            orderItems: [],
            user: {},
            shipping: {}
        }
    }
    componentDidUpdate() {
        // const item = this.props.navigation.getParam('dataDetail');
        // if (item.name !== this.state.name) {
        //     this.setState({
        //         name: item.name,
        //         price: item.price.toString(),
        //         brand: item.brand,
        //         countInStock: item.countInStock.toString(),
        //         imageFruit: item.imageFruit,
        //         description: item.description,
        //         product: item,
        //     })
        // }
        // console.log("detail didupdate", item)
        // console.log("detail product didupdate", this.state.product)
    }

    componentDidMount() {
        const item = this.props.navigation.getParam('dataDetailOrder');
        this.setState({
            _id: item._id,
            isPaid: item.isPaid,
            payment: item.payment,
            itemsPrice: item.itemsPrice.toString(),
            taxPrice: item.taxPrice.toString(),
            shippingPrice: item.shippingPrice.toString(),
            totalPrice: item.totalPrice.toString(),
            isDelivered: item.isDelivered,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            orderItems: item.orderItems,
            user: item.user,
            shipping: item.shipping
        })
        
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
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("AdminCart"); }}>
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
                            <Text style={{ fontWeight: "bold", fontSize: 24, color: "white" }}>Chi tiết đơn hàng</Text>
                        </View>

                        <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}>
                            <Text> </Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{ flex: 0.9, backgroundColor: "#F0F3F4" }}>
                    <ScrollView>
                        <View
                            style={{
                                justifyContent: "center",
                                marginLeft: 20,
                                marginTop: 20,
                                marginRight: 20,
                                backgroundColor: "white",
                                borderRadius: 8
                            }}
                        >
                            <Text style={styles.textStyle}>Giao hang</Text>
                            <View style={{ flexDirection: "row" }} >
                                <Text style={styles.textStyle}>Hinh thuc giao hang: </Text>
                                <Text style={[styles.textStyle, { marginLeft: 0 }]}>{this.state.isDelivered}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }} >
                                <Text style={styles.textStyle}>Phuong thuc thanh toan: </Text>
                                <Text style={[styles.textStyle, { marginLeft: 0 }]}>{this.state.payment}</Text>
                            </View>
                            <Text style={styles.textStyle}>Dia chi</Text>
                            <View style={{ flexDirection: "row", marginLeft: 20 }} >
                                <Text style={styles.textStyle}>{this.state.shipping.address}</Text>
                                <Text style={[styles.textStyle, { marginLeft: 0 }]}> {this.state.shipping.city}</Text>
                            </View>
                            <Text style={styles.textStyle}>Ghi chu</Text>
                            <Text style={[styles.textStyle, { marginLeft: 40 }]}>{this.state.shipping.note}</Text>
                        </View>
                        <View
                            style={{
                                justifyContent: "center",
                                marginLeft: 20,
                                marginTop: 20,
                                marginRight: 20,
                                backgroundColor: "white",
                                borderRadius: 8
                            }}
                        >
                            <Text style={styles.textStyle}>Thong tin nguoi dat hang</Text>
                            <View style={{ flexDirection: "row" }} >
                                <Text style={styles.textStyle}>Ten nguoi dat hang: </Text>
                                <Text style={[styles.textStyle, { marginLeft: 0 }]}> {this.state.user.username}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }} >
                                <Text style={styles.textStyle}>email: </Text>
                                <Text style={[styles.textStyle, { marginLeft: 0 }]}> {this.state.user.email}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }} >
                                <Text style={styles.textStyle}>SDT: </Text>
                                <Text style={[styles.textStyle, { marginLeft: 0 }]}> {this.state.user.sdt}</Text>
                            </View>
                        </View>
                        <View
                            style={{
                                justifyContent: "center",
                                marginLeft: 20,
                                marginTop: 20,
                                marginRight: 20,
                                backgroundColor: "white",
                                borderRadius: 8
                            }}
                        >
                            <Text style={styles.textStyle}
                            > Danh sach don hang cua ban</Text>
                            <FlatList
                                data={this.state.orderItems}
                                renderItem={({ item, index }) =>
                                    <View
                                        style={{
                                            flex: 1,
                                            height: 120,
                                            marginRight: 40,
                                            marginLeft: 40,
                                            marginTop: 10,
                                            borderRadius: 8,
                                            backgroundColor: (index % 2 === 0) ? '#D6EAF8' : '#D1F2EB',
                                            flexDirection: "row"
                                        }}
                                    >
                                        <View style={{ justifyContent: 'center', alignItems: 'center', width: "25%" }}>
                                            <Image source={{uri: item.imageFruit}}
                                                style={{ width: 60, height: 60 }}
                                            />
                                        </View>
                                        <View style={{ justifyContent: "center", marginLeft: 20, width: "75%" }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={styles.textStyle}> Tên sản phẩm: </Text>
                                                <Text style={[styles.textStyle, { marginLeft: 0 }]}> {item.name} </Text>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={styles.textStyle}> Đơn giá: </Text>
                                                <Text style={[styles.textStyle, { marginLeft: 0 }]}> {item.price} </Text>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={styles.textStyle}> Số lượng: </Text>
                                                <Text style={[styles.textStyle, { marginLeft: 0 }]}> {item.quantity} </Text>
                                            </View>
                                        </View>
                                    </View>
                                }
                            />
                            <View style={{ flexDirection: "row", width: "100%" }}>
                                <Text style={styles.textStyle}>Thành tiền: </Text>
                                <Text style={[styles.textStyle, { marginLeft: 0 }]}>
                                    {this.state.itemsPrice}</Text>
                            </View>
                            <View style={{ flexDirection: "row", width: "100%" }}>
                                <Text style={styles.textStyle}>Thuế: </Text>
                                <Text style={[styles.textStyle, { marginLeft: 0 }]}>
                                    {this.state.taxPrice}</Text>
                            </View>
                            <View style={{ flexDirection: "row", width: "100%" }}>
                                <Text style={styles.textStyle}>Phí giao hàng: </Text>
                                <Text style={[styles.textStyle, { marginLeft: 0 }]}>
                                    {this.state.shippingPrice}</Text>
                            </View>
                            <View style={{ flexDirection: "row", width: "100%" }}>
                                <Text style={styles.textStyle}>Tổng tiền: </Text>
                                <Text style={[styles.textStyle, { marginLeft: 0 }]}>
                                    {this.state.totalPrice}</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 18,
        marginTop: 10,
        marginLeft: 20,
        marginBottom: 10
    },
})