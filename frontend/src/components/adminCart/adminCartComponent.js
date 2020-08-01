
import React, { Component } from 'react';
import {
    Button,
    Image,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    FlatList,
    ScrollView,
    Alert
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Icon from "react-native-vector-icons/FontAwesome";

import { API_FRUIT } from '../../config/setting'

const urlCreateListFruit = `${API_FRUIT}/api/creatListFruit`;

export default class adminCartComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderListNonShip:[]
        }
    }

    componentDidMount() {
        this.props.onFetchAdminCart()

        let data = this.props.orders
        // if( data.isDelivered === "Khong giao hang" ){
        //     this.setState({
        //         orderListNonShip: data
        //     })
        // }
        // console.log("data adminCart:", data)
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
                            <Text style={{ fontWeight: "bold", fontSize: 24, color: "white" }}>Danh sách đơn hàng</Text>
                        </View>

                        <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}>
                            {/* <TouchableOpacity onPress={() => { this.props.navigation.navigate("DetailOrder"); }}>
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
                            </TouchableOpacity> */}
                            <Text></Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{ flex: 0.9, backgroundColor: "#FAFAFA" }}>
                    <ScrollView horizontal>
                        <View>
                            <View style={{ flexDirection: 'row', padding: 5 }}>
                                <Text style={{ width: 300, color: '#335272', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}
                                    numberOfLines={1}>ID</Text>
                                <Text style={{ width: 100, color: '#335272', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}
                                    numberOfLines={1}>Thanh toán</Text>
                                <Text style={{ width: 200, color: '#335272', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}
                                    numberOfLines={1}>Tên người đặt</Text>
                                <Text style={{ width: 300, color: '#335272', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}
                                    numberOfLines={1}>Ngày đặt</Text>
                                <Text style={{ width: 200, color: '#335272', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}
                                    numberOfLines={1}>Giá tiền</Text>
                                <Text style={{ width: 200, color: '#335272', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}
                                    numberOfLines={1}>Phương thức giao hàng</Text>
                                <Text style={{ width: 200, color: '#335272', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}
                                    numberOfLines={1}>Phương thức thanh toán</Text>
                                <Text style={{ width: 200, color: '#335272', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}
                                    numberOfLines={1}>Quản lý đơn hàng</Text>
                            </View>
                            <FlatList
                                data={this.props.orders}
                                renderItem={({ item, index }) =>
                                    <View style={{
                                        flex: 1,
                                        backgroundColor: (index % 2 === 0) ? '#EAECEE' : '#D6DBDF',
                                        height: 80,
                                        borderRadius: 8,
                                        flexDirection: "row"
                                    }}
                                    >
                                        <View style={{ alignItems: "center", flexDirection: "row" }}>
                                            <Text style={{ width: 300, fontSize: 18, textAlign: 'center' }}> 
                                                {item._id} 
                                            </Text>
                                            <Text style={{ width: 100, fontSize: 18, textAlign: 'center' }}> 
                                                {item.isPaid.toString()} 
                                            </Text>
                                            <Text style={{ width: 200, fontSize: 18, textAlign: 'center' }}> 
                                                {item.user.username} 
                                            </Text>
                                            <Text style={{ width: 300, fontSize: 18, textAlign: 'center' }}> 
                                                {item.createdAt} 
                                            </Text>
                                            <Text style={{ width: 200, fontSize: 18, textAlign: 'center' }}> 
                                                {item.totalPrice} 
                                            </Text>
                                            <Text style={{ width: 200, fontSize: 18, textAlign: 'center' }}> 
                                                {item.isDelivered} 
                                            </Text>
                                            <Text style={{ width: 200, fontSize: 18, textAlign: 'center' }}> 
                                                {item.payment} 
                                            </Text>
                                            <View style={{ flexDirection: "row", width: 200, height: "60%" }}>
                                                <TouchableOpacity
                                                    style={{
                                                        borderWidth: 1,
                                                        width: "50%",
                                                        justifyContent: "center",
                                                        borderRadius: 8,
                                                        backgroundColor: "#5A81F7"
                                                    }}
                                                    onPress={() => {
                                                        this.props.navigation.navigate(
                                                            'DetailOrder', {
                                                            'dataDetailOrder': { ...item }
                                                        })
                                                    }}
                                                >
                                                    <Text 
                                                        style={{ fontSize: 18, textAlign: 'center', color: "white", fontWeight: "bold" }}
                                                    >Chi tiết</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={{
                                                        borderWidth: 1,
                                                        width: "50%",
                                                        justifyContent: "center",
                                                        borderRadius: 8,
                                                        backgroundColor: "#5A81F7"
                                                    }}
                                                    onPress={()=> {
                                                        Alert.alert(
                                                            "Canh bao !!!",
                                                            "Ban co that su muon xoa?",
                                                            [
                                                                { text: "No", onPress: () => console.log("Cancel pressed"), style: "cancel" },
                                                                {
                                                                    text: "Yes", onPress: () => {
                                                                        this.props.onDeleteOrder(item._id)
                                                                    }
                                                                }
                                                            ],
                                                            { cancelable: true }
                                                        )
                                                    }
                                                         }
                                                >
                                                    <Text
                                                        style={{ fontSize: 18, textAlign: 'center', color: "white", fontWeight: "bold" }}
                                                    >Xóa</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                }
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}