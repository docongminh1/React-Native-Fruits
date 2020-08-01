import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
    ImageBackground
} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import { SafeAreaView } from 'react-navigation';

import { API_FRUIT } from '../../config/setting'
const urlCreateUser = `${API_FRUIT}/api/user/createUser`;

export default class createAccountComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            tel: "",
            password: "",
            hidePass: true
        }
    }
    onChangeText = (key, val) => {
        this.setState({ [key]: val });
    };
    async createAccountApi() {
        const name = this.state.username
        const email = this.state.email
        const tel = this.state.tel
        const password = this.state.password

        const response = await fetch(`${urlCreateUser}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                tel: tel,
                password: password,
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
        return response
    }

    render() {
        const { hidePass } = this.state;
        return (

            <View style={{ backgroundColor: "white", flex: 1 }}>
                <View style={{ flex: 0.1 }}>
                    <ImageBackground
                        source={require('../../res/images/topBarBg.png')}
                        style={{ flex: 1, flexDirection: "row" }}
                        resizeMode="cover"
                    >
                        <View style={{ flex: 1, alignItems: "flex-start", justifyContent: "center" }}>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("Login") }}>
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
                            <Text style={{ fontWeight: "bold", fontSize: 24, color: "white" }}>ĐĂNG KÝ TÀI KHOẢN</Text>
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
                        <View style={{ flex: 0.7 }}>
                            <View style={{ alignItems: "center", paddingTop: 40 }}>
                                <Text style={{ color: "#19e7f7", fontWeight: "bold", fontSize: 20 }}>ĐĂNG KÝ THÔNG TIN</Text>
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
                                <TextInput
                                    placeholderTextColor={"#9fa8b7"}
                                    value={this.state.username}
                                    onChangeText={val => this.onChangeText("username", val)}
                                    style={{
                                        color: "#335272",
                                        flex: 1,
                                        paddingVertical: 15,
                                        paddingHorizontal: 40,
                                        fontSize: 18,
                                        textAlign: "center"
                                    }}
                                    placeholder={" Tên tài khoản "}
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
                                    name={"envelope"}
                                    color={"#335272"}
                                    style={{
                                        position: "absolute",
                                        left: 20,
                                        alignSelf: "center"
                                    }}
                                    size={25}
                                />
                                <TextInput
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
                                    placeholder={" Email @... "}
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
                                        borderWidth: 1,
                                        backgroundColor: "#5A81F7",
                                        height: 40,
                                        borderRadius: 8,
                                        width: "50%",
                                        alignItems: "center",
                                        justifyContent: "center",

                                    }}
                                    onPress={async () => {
                                        const { username, email, password } = this.state;
                                        if (username.trim() === ""
                                            || email.trim() === ""
                                            || password.trim() === ""
                                        ) {
                                            Alert.alert(
                                                'THÔNG BÁO !!!',
                                                ' Bạn không được bỏ trống thông tin tai khoan !!!'
                                            );
                                            return;
                                        }
                                        else {
                                            const response = await this.createAccountApi()
                                            if (response.resultCode !== undefined && response.resultCode === 1) {
                                                alert(response.message)
                                                this.setState({
                                                    username: "",
                                                    email: "",
                                                    password: ""
                                                })
                                            }
                                            else {
                                                alert(response.message === undefined
                                                    ? 'Không kết nối được tới server 2'
                                                    : response.message)
                                            }
                                        }
                                    }
                                    }>
                                    <Text style={{ color: "white", fontSize: 18, fontWeight:"bold" }}>Tạo tài khoản</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </View >

        );
    }
}