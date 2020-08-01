
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
    RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Icon from "react-native-vector-icons/FontAwesome";
import { ScrollView } from 'react-native-gesture-handler';

export default class homeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ListItem: [
                { logo: require("../../res/images/logo/Letter-F-violet.png") },
                { logo: require("../../res/images/logo/Letter-R-pink.png") },
                { logo: require("../../res/images/logo/Letter-E-blue.png") },
                { logo: require("../../res/images/logo/Letter-S-orange.png") },
                { logo: require("../../res/images/logo/Letter-H-blue.png") },
                { logo: "" },
                { logo: require("../../res/images/logo/Letter-F-violet.png") },
                { logo: require("../../res/images/logo/Letter-R-lg.png") },
                { logo: require("../../res/images/logo/Letter-U-red.png") },
                { logo: require("../../res/images/logo/Letter-I-lg.png") },
                { logo: require("../../res/images/logo/Letter-T-orange.png") },
            ],
            refreshing: false,
        }
    }

    GetGridViewItem(item) {
        Alert.alert(item);
    }

    onRefresh = () => {
        console.log("refresh home")
        this.setState({
            refreshing: true
        })
        this.props.onFetchFruit()
        this.setState({
            refreshing: false
        });
    }

    currencyFormat(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' đ'
    }

    componentDidMount() {
        this.props.onFetchFruit();
        // const data = this.props.fruits;   
        // console.warn("dataaaaaa", data)
    }
    componentDidUpdate(nextProps) {
        if (this.props !== nextProps) {
            if (this.props.fruits !== nextProps.fruits) {
                // this.props.onFetchFruit()
                // console.log("1")
                // console.log("2")

            }
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
                            <TouchableOpacity onPress={() => { this.props.navigation.openDrawer(); }}>
                                <Icon
                                    name={"list-ul"}
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
                            <Text style={{ fontWeight: "bold", fontSize: 24, color: "white" }}>Fresh Fruit</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}>
                            <TouchableOpacity onPress={() => { this.props.onFetchFruit() }}>
                                <Icon
                                    name={"refresh"}
                                    color={"white"}
                                    style={{
                                        // position: "absolute",
                                        marginRight: 20,
                                        alignSelf: "center"
                                    }}
                                    size={25}
                                />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{ flex: 0.9, backgroundColor: "#FAFAFA" }}>
                    <View style={{ flex: 0.6, borderRadius: 16 }}>
                        <View style={{ flex: 0.7, borderRadius: 8, margin: 20 }}>
                            <ImageBackground
                                source={require('../../res/images/screenHome.png')}
                                style={{ flex: 1, borderRadius: 20 }}
                                resizeMode="cover"
                            />
                        </View>
                        <View style={{ flex: 0.3, marginLeft: 20, marginRight: 20 }}>
                            <FlatList
                                data={this.state.ListItem}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={this.onRefresh}
                                    />
                                }
                                renderItem={({ item }) =>
                                    <View style={{
                                        flex: 1,
                                        height: 40,
                                        width: 40,
                                        margin: 10,
                                        borderRadius: 100,
                                        backgroundColor: "#FAFAFA"
                                    }}>
                                        <View >
                                            <Image source={item.logo}
                                                style={{ width: 40, height: 40 }}
                                            />
                                        </View>
                                    </View>
                                }
                                // numColumns={3}
                                horizontal={true}
                            />
                        </View>
                    </View>
                    <ScrollView style={{ flex: 0.4, borderRadius: 16 }}>
                        <View style={{ justifyContent: "center", backgroundColor: "#FAFAFA", borderRadius: 16 }}>
                            <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 10 }}>Danh mục loại sản phẩm</Text>
                            <FlatList
                                data={this.props.fruits}
                                renderItem={({ index, item }) =>

                                    <View style={{
                                        flex: 1,
                                        // backgroundColor: "white",
                                        // height: 300,
                                        width: "50%",
                                        margin: 10,
                                        // borderRadius: 8,
                                        // borderWidth: 1
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.props.navigation.navigate(
                                                    'ProductByClass', {
                                                    'dataClass': item.class
                                                })
                                            }}
                                        >
                                            <View style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                backgroundColor: "white",
                                                marginTop: (index % 2 === 0) ? 0 : 16,
                                                height: 200,
                                                borderRadius: 8,
                                                borderWidth: 0.5,
                                                borderColor: "#CCD1D1"
                                            }}>
                                                <Image source={{ uri: item.imageClass }}
                                                    style={{ width: 120, height: 120 }}
                                                />

                                                <Text style={{ fontSize: 18, fontWeight: "bold" }}> {item.class} </Text>
                                            </View>
                                            {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Image source={require('../../res/images/tabbar/cart.png')}
                                                style={{ width: 30, height: 30, tintColor: "#3333ff" }}
                                            />
                                            <Text style={{ fontSize: 18 }}> {this.currencyFormat(item.price)} </Text>
                                        </View> */}
                                        </TouchableOpacity>
                                    </View>

                                }
                                numColumns={2}
                            // horizontal={true}
                            />
                        </View>
                        {/* <View style={{ justifyContent: "center", backgroundColor: "#FAFAFA", borderRadius:16 }}>
                            <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 10 }}>Trai cay Kho</Text>
                            <FlatList
                                data={this.props.fruits}
                                renderItem={({ item }) =>
                                    <View style={{
                                        flex: 1,
                                        backgroundColor: "white",
                                        height: 120,
                                        width: 120,
                                        margin: 10,
                                        borderRadius: 8,
                                    }}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Image source={{uri:item.imageFruit}}
                                                style={{ width: 60, height: 60 }}
                                            />
                                        </View>
                                        <Text style={{ fontSize: 18 }}> {item.name} </Text>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Image source={require('../../res/images/tabbar/cart.png')}
                                                style={{ width: 30, height: 30, tintColor: "#3333ff" }}
                                            />
                                            <Text style={{ fontSize: 18 }}> {item.price} </Text>
                                        </View>
                                    </View>}
                                // numColumns={3}
                                horizontal={true}
                            />
                        </View>
                         */}
                    </ScrollView>
                </View>
            </View>
        );
    }
}