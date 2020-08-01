import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    FlatList,
    Platform,
    ActivityIndicator,
    RefreshControl,
    TextInput,
} from 'react-native';
import { SafeAreaView, withNavigation } from 'react-navigation';
import Icon from "react-native-vector-icons/FontAwesome";
import { SearchBar } from 'react-native-elements';
import NumericInput, { calcSize } from 'react-native-numeric-input'
import AsyncStorage from '@react-native-community/async-storage';
import { userProfile, API_FRUIT } from '../../config/setting'

const urlGetListFruit = `${API_FRUIT}/api/getListFruit?className=`;

export default class getProductByClassName extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            quantity: 0,
            refreshing: false,
            isLoading: true,
            testLoading: true,

            className: "",
        }
        this.arrayholder = [];
    }
    SearchFilterFunction(search) {
        //passing the inserted text in textinput
        const newData = this.arrayholder.filter(function (item) {
            //applying filter for the inserted text in search bar
            const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
            const textData = search.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            //setting the filtered newData on datasource
            //After setting the data it will automatically re-render the view
            dataSource: newData,
            search: search,

        });
    }

    onRefresh = () => {
        console.log("refresh")
        this.setState({
            refreshing: true
        })
        this.props.onFetchFruitProduct()
        this.setState({
            refreshing: false
        });
    }

    handleAddToCart = () => {
        var product = this.props.fruits;
        product['quantity'] = this.state.quantity;
        // console.log("detail quan", this.state.quantity)
        AsyncStorage.getItem("CART", (err, res) => {
            if (!res) AsyncStorage.setItem("CART", JSON.stringify([product]));
            else if (this.state.quantity >= 1) {
                var items = JSON.parse(res);
                items.push(product);
                AsyncStorage.setItem("CART", JSON.stringify(items));
            }
            // ToastAndroid.show({
            //     text: 'Product added to your cart !',
            //     position: 'bottom',
            //     type: 'success',
            //     buttonText: 'Dismiss',
            //     duration: 3000
            //   });
        });
        // console.log("detail addcart : ", product)
    }

    currencyFormat(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' đ'
    }

    // onFetchData(){
    //     return fetch(urlGetListFruit + this.state.className, {
    //         method: 'GET',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: '',
    //     })
    //         .then(response => response.json())
    //         .then(responseJson => {
    //             this.setState(
    //                 {
    //                     isLoading: false,
    //                     dataSource: responseJson.fruits
    //                 },
    //                 function () {
    //                     this.arrayholder = responseJson.fruits;
    //                     // console.log("data", responseJson.fruits)
    //                 }
    //             );
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }

    componentDidMount() {
        // this.props.onFetchFruitProduct()

        const className = this.props.navigation.getParam('dataClass');
        this.setState({ className: className})
        //fetch data trực tiếp
        return fetch(urlGetListFruit + className, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: '',
        })
            .then(response => response.json())
            .then(responseJson => {
                this.setState(
                    {
                        isLoading: false,
                        dataSource: responseJson.fruits
                    },
                    function () {
                        this.arrayholder = responseJson.fruits;
                        // console.log("data", responseJson.fruits)
                    }
                );
            })
            .catch(error => {
                console.error(error);
            });

        // this.onFetchData();

    }
    componentDidUpdate(nextProps) {
        const className = this.props.navigation.getParam('dataClass');
        if (className !== this.state.className) {
            this.setState({className: className})
            return fetch(urlGetListFruit + className, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: '',
            })
                .then(response => response.json())
                .then(responseJson => {
                    this.setState(
                        {
                            isLoading: false,
                            dataSource: responseJson.fruits
                        },
                        function () {
                            this.arrayholder = responseJson.fruits;
                            // console.log("data", responseJson.fruits)
                        }
                    );
                })
                .catch(error => {
                    console.error(error);
                });

            // this.onFetchData();
        }

    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }
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
                            <Text style={{ fontWeight: "bold", fontSize: 24, color: "white" }}>{this.state.className}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}>
                            <TouchableOpacity onPress={() => {
                                this.props.onFetchFruitProduct()
                                console.warn("refresh")
                            }}>
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
                    {/* <SearchBar
                        placeholder="Tim kiem sản phẩm ..."
                        lightTheme={true}
                        containerStyle={{ backgroundColor: "#FAFAFA", borderBottomWidth: 0 }}
                        inputStyle={{ fontSize: 18, color: "black" }}
                        inputContainerStyle={{ borderRadius: 8 }}
                        leftIconContainerStyle={{}}

                        onChangeText={this.updateSearch}
                        value={this.state.search}
                    /> */}
                    <View style={{
                            marginHorizontal: 20,
                            // width: '100%',
                            flexDirection: "row",
                            borderRadius: 5,
                            backgroundColor: "#e7eaec",
                            marginTop: 10,
                            height: 60,
                            borderWidth: 1,
                            borderColor: '#009688',
                            backgroundColor: '#FFFFFF',
                    }}>
                        <Icon
                            name={"search"}
                            color={"#009688"}
                            style={{
                                position: "absolute",
                                left: 20,
                                alignSelf: "center"
                            }}
                            size={25}
                        />
                        <TextInput
                            style={{
                                flex: 1,
                                fontSize: 18,
                                left: 60,
                                color:"#009688"
                            }}
                            onChangeText={search => this.SearchFilterFunction(search)}
                            value={this.state.search}
                            underlineColorAndroid="transparent"
                            placeholder="Nhập sản phẩm cần tìm ..."
                        />
                    </View>
                    <FlatList
                        // data={this.props.fruits}
                        data={this.state.dataSource}
                        // data={ this.state.isLoading ? this.props.fruits : this.state.dataSource}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh}
                            />
                        }
                        renderItem={({ item, index }) =>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate(
                                        'Detail', {
                                        'dataDetail': { ...item }
                                    })
                                }}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        backgroundColor: (index % 2 === 0) ? '#D6EAF8' : '#D1F2EB',
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
                                        <Text style={{ fontSize: 18 }}> {item.name} </Text>
                                        <Text style={{ fontSize: 18 }}> {this.currencyFormat(item.price)} </Text>
                                        {/* <View>
                                            <NumericInput
                                                value={this.state.quantity}
                                                onChange={value => this.setState({ quantity: value })}
                                                onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                                                totalWidth={120}
                                                totalHeight={40}
                                                iconSize={20}
                                                step={1}
                                                minValue={0}
                                                maxValue={this.state.countInStock}
                                                valueType='real'
                                                rounded
                                                textColor='#B0228C'
                                                iconStyle={{ color: 'white' }}
                                                rightButtonBackgroundColor='#EA3788'
                                                leftButtonBackgroundColor='#E56B70'
                                            />
                                        </View> */}
                                    </View>
                                    <View style={{ justifyContent: "center", width: "25%" }}>
                                        {/* <TouchableOpacity onPress={() => { this.handleAddToCart() }}> */}
                                        {/* <Image source={require('../../res/images/tabbar/cart.png')}
                                                style={{
                                                    width: 80, height: 80,
                                                    tintColor: (index % 2 === 0) ? "#3333ff" : "#2ECC71"
                                                }}
                                            /> */}
                                        <Icon
                                            name={"chevron-right"}
                                            color={(index % 2 === 0) ? "#3333ff" : "#2ECC71"}
                                            style={{
                                                // position: "absolute",
                                                marginLeft: 20,
                                                alignSelf: "center"
                                            }}
                                            size={30}
                                        />
                                        {/* </TouchableOpacity> */}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        }
                    // numColumns={3}
                    />
                </View>
            </View>
        );
    }
}