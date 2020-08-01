import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    CheckBox,
    Alert,
    ScrollView,
    ImageBackground,
} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import { SafeAreaView } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import { API_FRUIT, userProfile } from '../../config/setting'

const urlLogin = `${API_FRUIT}/api/user/login`;

export default class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "@gmail.com",
            tel:"",
            password: "",
            hidePass: true,
            // dataUsers: {},
            // isLogin: true
        }
    }
    onChangeText = (key, val) => {
        this.setState({ [key]: val });
    };

    // sendDataUser(){
    //     var dataUsers = this.state.dataUsers;
    //     // dataUsers['_id'] = 
    //     // dataUsers['email'] =
    //     // dataUsers['password'] =
    //     // dataUsers['isAdmin'] =
    //     dataUsers['isLogin'] = this.state.isLogin;
    //     console.log("dataUser login", this.state.isLogin)
    //     AsyncStorage.getItem("USER", (err, res) => {
    //         if (!res){ 
    //             AsyncStorage.setItem("USER", JSON.stringify([dataUsers]));
    //         }
    //         else {
    //             var items = JSON.parse(res);
    //             console.log("item", items)
    //             items.push(dataUsers);
    //             AsyncStorage.setItem("USER", JSON.stringify(items));
    //         }
    //     });
    //     console.log("dataUser: ", dataUsers)
    // }

    async onPressLogin() {
        const { email, password, tel,rememberAccount } = this.state;

        const response = await fetch(`${urlLogin}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // email: email,
                tel: tel,
                password: password,
            }),
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
        console.log("Api Log in component:", response)
        // console.log(`response = ${JSON.stringify(response)}`)
        return response
    };
    componentDidMount() {

    }
    render() {
        const { rememberAccount, hidePass } = this.state;
        return (

            <View style={{ backgroundColor: "white", flex: 1 }}>
                <ImageBackground
                    source={require('../../res/images/background.png')}
                    style={{ flex: 1, marginHorizontal: -20 }}
                    resizeMode="cover"
                >
                    <View style={{ flex: 0.7 }}>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <View style={{ padding: 32, flexDirection: "row" }}>
                                <Image
                                    source={require("../../res/images/Fruit.png")}
                                    style={{ width: 100, height: 100 }}>
                                </Image>
                                <View style={{ marginTop: 16, justifyContent: "center" }}>
                                    <Text
                                        style={{ color: "#19e7f7", fontWeight: "bold", fontSize: 20 }}
                                    >Hệ thống bán trái cây uy tín chất lượng</Text>
                                    <Text
                                        style={{ color: "#19e7f7", fontWeight: "bold", fontSize: 20 }}
                                    >Fresh Fruit</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ color: "#19e7f7", fontWeight: "bold", fontSize: 20 }}>ĐĂNG NHẬP HỆ THỐNG</Text>
                        </View>
                        <View style={{
                            marginHorizontal: 20,
                            // width: '100%',
                            flexDirection: "row",
                            borderRadius: 5,
                            backgroundColor: "#e7eaec",
                            marginTop: 35,
                            marginLeft: 40,
                            marginRight: 40
                        }}
                        >
                            <Icon
                                name={"user"}
                                color={"#335272"}
                                style={{
                                    position: "absolute",
                                    left: 20,
                                    alignSelf: "center"
                                }}
                                size={25}
                            />
                            {/* <TextInput
                                placeholderTextColor={"#9fa8b7"}
                                value={this.state.email}
                                onChangeText={val => this.onChangeText("email", val)}
                                style={{
                                    color: "#335272",
                                    flex: 1,
                                    paddingVertical: 15,
                                    paddingHorizontal: 40,
                                    fontSize: 18,
                                    textAlign: "center"
                                }}
                                placeholder={" Email@... "}
                                autoCapitalize="none"
                            /> */}
                            <TextInput
                                placeholderTextColor={"#9fa8b7"}
                                value={this.state.tel}
                                onChangeText={val => this.onChangeText("tel", val)}
                                style={{
                                    color: "#335272",
                                    flex: 1,
                                    paddingVertical: 15,
                                    paddingHorizontal: 40,
                                    fontSize: 18,
                                    textAlign: "center"
                                }}
                                placeholder={" Số điện thoại ... "}
                                keyboardType="numeric"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={{
                            marginHorizontal: 20,
                            // width: '100%',
                            flexDirection: "row",
                            borderRadius: 5,
                            backgroundColor: "#e7eaec",
                            marginTop: 35,
                            marginLeft: 40,
                            marginRight: 40
                        }}
                        >
                            <Icon
                                name={"lock"}
                                color={"#335272"}
                                style={{
                                    // position: "absolute",
                                    marginLeft: 20,
                                    marginRight: 20,
                                    alignSelf: "center"
                                }}
                                size={25}
                            />
                            <TextInput
                                placeholderTextColor={"#9fa8b7"}
                                value={this.state.password}
                                onChangeText={val => this.onChangeText("password", val)}
                                style={{
                                    color: "#335272",
                                    flex: 1,
                                    paddingVertical: 15,
                                    paddingHorizontal: 40,
                                    fontSize: 18,
                                    textAlign: "center"
                                }}
                                secureTextEntry={Platform.OS === 'android'
                                    ? (this.state.password.length > 0
                                        ? hidePass : false)
                                    : hidePass}
                                placeholder={" Mật khẩu"}
                                autoCapitalize="none"

                            />
                            <TouchableOpacity
                                style={{ padding: 10, alignSelf: "center" }}
                                onPress={() => {
                                    this.setState({
                                        hidePass: !hidePass
                                    });
                                }}
                            >
                                <Icon
                                    size={30}
                                    color={"#b1bcc7"}
                                    solid
                                    name={hidePass ? "eye-slash" : "eye"}
                                ></Icon>
                            </TouchableOpacity>
                        </View>
                        {/* <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginLeft: 20,
                            marginTop: 20
                        }}>
                            <TouchableOpacity
                                onPress={() =>
                                    this.setState({
                                        rememberAccount: !rememberAccount
                                    })
                                }
                            >
                                <Icon
                                    color={"#829BF8"}
                                    name={rememberAccount ? "check-circle-o" : "circle-o"}
                                    style={{
                                        // position: "absolute",
                                        marginLeft: 20,

                                        //alignSelf: "center"
                                    }}
                                    size={25}
                                />
                            </TouchableOpacity>
                            <Text style={{
                                marginTop: 5,
                                color: "#829BF8",
                                fontSize: 18
                            }}> Lưu mật khẩu</Text>
                        </View> */}

                        <View style={{
                            justifyContent: "center",
                            alignItems: "center",
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
                                    width: "80%",
                                    alignItems: "center",
                                    justifyContent: "center",

                                }}
                                // onPress={() => this.props.navigation.navigate('HomePage')}>
                                onPress={async () => {
                                    const { email, password } = this.state;
                                    if (email.trim() === ""
                                        || password.trim() === ""
                                    ) {
                                        Alert.alert(
                                            'THÔNG BÁO !!!',
                                            ' Bạn khong duoc bo trong tai khoan hoac mat khau !!!'
                                        );
                                        return;
                                    }
                                    else {
                                        // this.props.onPressLogin({email: email, password: password})

                                        const response = await this.onPressLogin()

                                        if (response.resultCode !== undefined && response.resultCode === 1) {
                                            if (response.data !== null) {
                                                const dataUser = response.data
                                                // console.log("dataUser 1", dataUser)
                                                alert(response.message)
                                                this.props.navigation.navigate('Product')
                                                userProfile._id = dataUser._id
                                                userProfile.name = dataUser.name
                                                userProfile.email = dataUser.email
                                                userProfile.tel = dataUser.tel
                                                userProfile.password = dataUser.password
                                                userProfile.isAdmin = dataUser.isAdmin
                                                userProfile.isLogin = true
                                                console.log("dataUser 1", userProfile)
                                            }
                                            else {
                                                alert(response.message)
                                                this.setState({
                                                    email: "@gmail.com",
                                                    password: "",
                                                })
                                            }
                                        }
                                        else {
                                            alert(response.message === undefined
                                                ? 'Không kết nối được tới server 2'
                                                : response.message)
                                        }
                                    }
                                }}
                            >
                                <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Đăng nhập</Text>
                            </TouchableOpacity>
                            <View style={{flexDirection: "row", marginTop: 20}}>
                                <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}> Chưa có tài khoản? </Text>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Create')}>
                                <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Tạo tài khoản</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View >

        );
    }
}