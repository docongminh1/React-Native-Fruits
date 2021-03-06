
import React, { Component } from 'react';
import {
    Button,
    Image,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    FlatList
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Icon from "react-native-vector-icons/FontAwesome";

export default class ViewExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ListItems: [
                { name: "Táo", price: "100000" },
                { name: "Mận", price: "200000" },
                { name: "Xoài", price: "300000" },
                { name: "Ổi", price: "400000" },
                { name: "Lê", price: "500000" },
                { name: "Sầu Riêng", price: "600000" },
                { name: "nhãn", price: "700000" },
                { name: "Vãi", price: "800000" },
                { name: "Dừa", price: "900000" }
            ],
            ListItem: [
                { name: "Táo", price: "100000" },
                { name: "Mận", price: "200000" },
                { name: "Xoài", price: "300000" },
                { name: "Ổi", price: "400000" },
                { name: "Lê", price: "500000" },
                { name: "Sầu Riêng", price: "600000" },
            ],
            listFruitVN: [],
        }
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
                            <Text style={{ fontWeight: "bold", fontSize: 24, color: "white" }}>Giỏ hàng</Text>
                        </View>

                        <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}>
                            <Text> </Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{ flex: 0.9, backgroundColor: "#FAFAFA" }}>
                    <FlatList
                        data={this.state.ListItems}
                        renderItem={ ({ item , index}) =>
                            <View style={{
                                flex: 1,
                                backgroundColor: (index % 2 === 0) ? '#3c3ab2' : '#528de3',
                                height: 120,
                                margin: 10,
                                borderRadius: 8,
                                flexDirection:"row"
                            }}
                            
                            >
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={ require("../../res/images/apple.png")}
                                        style={{ width: 80, height: 80, marginLeft: 40 }}
                                    />
                                </View>
                                <View style={{justifyContent:"center", marginLeft: 20}}>
                                    <Text style={{ fontSize: 18 }}> {item.name} </Text>
                                    <View style={{ flexDirection: "row" }}>
                                        <Image source={require('../../res/images/tabbar/cart.png')}
                                            style={{ width: 30, height: 30, tintColor: "#3333ff" }}
                                        />
                                        <Text style={{ fontSize: 18 }}> {item.price} </Text>
                                    </View>
                                </View>
                            </View>
                        }
                        // numColumns={3}
                    />
                </View>
            </View>
        );
    }
}