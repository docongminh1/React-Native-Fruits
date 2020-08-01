import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import { userProfile } from '../../config/setting'
import AsyncStorage from '@react-native-community/async-storage';

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            cartItems: []
        }
    }

    onPressLogOut() {
        if (userProfile.isLogin === true) {
            userProfile._id = 0
            userProfile.name = ""
            userProfile.email = ""
            userProfile.password = ""
            userProfile.isAdmin = false
            userProfile.isLogin = false

            this.props.navigation.navigate('Product')
            Alert.alert(
                'THÔNG BÁO !!!',
                ' Bạn đã đăng xuất thành công !!!'
            )
        }
        else{
            this.props.navigation.navigate('Product')
            Alert.alert(
                'THÔNG BÁO !!!',
                ' Bạn chưa đăng nhập hệ thống !!!'
            )
        }

        console.log("handle Log out:", userProfile)
    }

    componentDidUpdate() {
        if (userProfile.isLogin !== this.state.isLogin) {
            this.setState({
                isLogin: userProfile.isLogin
            })
        }
        console.log("isLogin", this.state.isLogin)
        console.log("isAdmin", userProfile.isAdmin)
    }

    componentDidMount() {
        this.state.isLogin = userProfile.isLogin
        console.log("menu userProfile", userProfile)
        console.log("menu ", this.state.isLogin)
    }

    render() {
        return (
            <View style={{ flex: 100 }}>
                <View style={{ flex: 30, alignItems: "center", justifyContent: "center" }}>
                    {/* <Image
                        source={require('../../image/icon-reactnative.png')}
                        style={{ width: 100, height: 100, borderRadius: 100 }}
                    >
                    </Image> */}
                    {userProfile.isLogin
                        ?
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('UserProfile')}>
                            <Text style={styles.textStyle}>{userProfile.name}</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={styles.textStyle}>Đăng nhập</Text>
                        </TouchableOpacity>
                    }
                    {userProfile.isAdmin
                        ?
                        <View style={{ width: "100%" }}>
                            <TouchableOpacity
                                style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
                                onPress={() => this.props.navigation.navigate('Admin')}
                            >
                                <Icon
                                    name={"database"}
                                    color={"#335272"}
                                    style={{
                                        // position: "absolute",
                                        marginLeft: 20,
                                        marginRight: 20,
                                        alignSelf: "center",
                                        width: "20%"
                                    }}
                                    size={30}
                                />
                                <Text style={styles.textStyle}>Quản lý sản phẩm</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
                                onPress={() => this.props.navigation.navigate('AdminCart')}
                            >
                                <Icon
                                    name={"shopping-basket"}
                                    color={"#335272"}
                                    style={{
                                        // position: "absolute",
                                        marginLeft: 20,
                                        marginRight: 20,
                                        alignSelf: "center",
                                        width: "20%"
                                    }}
                                    size={30}
                                />
                                <Text style={styles.textStyle}>Quản lý đơn hàng</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
                                onPress={() => this.props.navigation.navigate('Admin')}
                            >
                                <Icon
                                    name={"address-book"}
                                    color={"#335272"}
                                    style={{
                                        // position: "absolute",
                                        marginLeft: 20,
                                        marginRight: 20,
                                        alignSelf: "center",
                                        width: "20%"
                                    }}
                                    size={30}
                                />
                                <Text style={styles.textStyle}>Quản lý danh sách user</Text>
                            </TouchableOpacity>

                        </View>
                        :
                        <View></View>
                    }
                </View>
                <View style={{ flex: 50, backgroundColor:"#00FFFF" }}>
                    <TouchableOpacity
                        style={{ flex: 1, borderBottomWidth: 0.5, flexDirection: "row", alignItems: "center", padding: 10 }}
                        onPress={() => this.props.navigation.navigate('Home')}
                    >
                        <Icon
                            name={"home"}
                            color={"#335272"}
                            style={{
                                // position: "absolute",
                                marginLeft: 20,
                                marginRight: 20,
                                alignSelf: "center",
                                width: "20%"
                            }}
                            size={30}
                        />
                        <Text style={styles.textStyle}>Trang chủ</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ flex: 1, borderBottomWidth: 0.5, flexDirection: "row", alignItems: "center", padding: 10 }}
                        onPress={() => this.props.navigation.navigate('UserProfile')}
                    >
                        <Icon
                            name={"user-o"}
                            color={"#335272"}
                            style={{
                                // position: "absolute",
                                marginLeft: 20,
                                marginRight: 20,
                                alignSelf: "center",
                                width: "20%"
                            }}
                            size={30}
                        />
                        <Text style={styles.textStyle}>Thông tin tài khoản</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ flex: 1, borderBottomWidth: 0.5, flexDirection: "row", alignItems: "center", padding: 10 }}
                        onPress={() => this.props.navigation.navigate('Cart')}
                    >
                        <Icon
                            name={"opencart"}
                            color={"#335272"}
                            style={{
                                // position: "absolute",
                                marginLeft: 20,
                                marginRight: 20,
                                alignSelf: "center",
                                width: "20%"
                            }}
                            size={30}
                        />
                        <Text style={styles.textStyle}>Đơn hàng của bạn</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ flex: 1, borderBottomWidth: 0.5, flexDirection: "row", alignItems: "center", padding: 10 }}
                        onPress={() => this.props.navigation.navigate('Connect')}
                    >
                        <Icon
                            name={"group"}
                            color={"#335272"}
                            style={{
                                // position: "absolute",
                                marginLeft: 20,
                                marginRight: 20,
                                alignSelf: "center",
                                width: "20%"
                            }}
                            size={30}
                        />
                        <Text style={styles.textStyle}>Liên hệ với chúng tôi</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={{ flex: 1, borderBottomWidth: 0.5, flexDirection: "row", alignItems: "center", padding: 10 }}
                        onPress={() => this.props.navigation.navigate('Introduce')}
                    >
                        <Icon
                            name={"address-book-o"}
                            color={"#335272"}
                            style={{
                                // position: "absolute",
                                marginLeft: 20,
                                marginRight: 20,
                                alignSelf: "center",
                                width: "20%"
                            }}
                            size={30}
                        />
                        <Text style={styles.textStyle}>Giới thiệu</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ flex: 1, borderBottomWidth: 0.5, flexDirection: "row", alignItems: "center", padding: 10 }}
                        onPress={() => this.props.navigation.navigate('Policy')}
                    >
                        <Icon
                            name={"bookmark"}
                            color={"#335272"}
                            style={{
                                // position: "absolute",
                                marginLeft: 20,
                                marginRight: 20,
                                alignSelf: "center",
                                width: "20%"
                            }}
                            size={30}
                        />
                        <Text style={styles.textStyle}>Chính sách công ty</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ flex: 1, flexDirection: "row", alignItems: "center", padding: 10 }}
                        onPress={() => this.onPressLogOut()}
                    >
                        <Icon
                            name={"sign-out"}
                            color={"#335272"}
                            style={{
                                // position: "absolute",
                                marginLeft: 20,
                                marginRight: 20,
                                alignSelf: "center",
                                width: "20%"
                            }}
                            size={30}
                        />
                        <Text style={styles.textStyle}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 20, backgroundColor:"#00FFFF"  }}>

                </View>
            </View>
        )
    }
}
var styles = StyleSheet.create({
    textStyle: {
        color: "#335272",
        fontSize: 18,
        fontWeight: "bold"
        // textAlign: "center"
    },
})