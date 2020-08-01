
import React, { Component } from 'react';
import {
    Button,
    Image,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    FlatList,
    Linking,
    StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class connectComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tel: "0902384255",
            fbPageId: "105712837900436"
        }
    }

    callPhone(tel) {
        Linking.openURL(`tel:${tel}`)
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
                                    name={"arrow-left-thick"}
                                    color={"white"}
                                    style={{
                                        // position: "absolute",
                                        marginLeft: 20,
                                        alignSelf: "center"
                                    }}
                                    size={40}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 24, color: "white" }}>LIÊN HỆ</Text>
                        </View>

                        <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}>
                            <Text> </Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{ flex: 0.9, backgroundColor: "#FAFAFA" }}>
                    <View style={{ alignItems: "center", justifyContent: "center", flex: 0.3 }}>
                        <Image
                            source={require("../../res/images/footerFruit.png")}
                            style={{ borderRadius: 16, width: 300, height: 200}}
                        />
                    </View>
                    <View style={{  justifyContent: "center", flex: 0.5 }}>
                        <TouchableOpacity
                            onPress={() => this.callPhone(this.state.tel)}
                        // onPress={() => Linking.openURL('fb://page/105712837900436')}
                        >
                            <View style={{
                                flexDirection: "row",
                                // borderWidth: 1,
                                margin: 20,
                                alignItems: "center"
                            }}>
                                <Icon
                                    name={"cellphone-iphone"}
                                    color={"#335272"}
                                    style={{
                                        // position: "absolute",
                                    }}
                                    size={40}
                                />
                                <Text style={styles.textStyle}>Call to employee: {this.state.tel} </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{
                            flexDirection: "row",
                            // borderWidth: 1,
                            margin: 20,
                            alignItems: "center"
                        }}>
                            <Icon
                                name={"clock"}
                                color={"#335272"}
                                style={{
                                    // position: "absolute",
                                }}
                                size={30}
                            />
                            <Text style={[styles.textStyle, { marginLeft: 10 }]}>Mon-Sat 8:30 A.M - 8:00 P.M </Text>
                        </View>
                        <TouchableOpacity onPress={() => Linking.openURL('fb://page/' + this.state.fbPageId)}>
                            <View style={{
                                flexDirection: "row",
                                // borderWidth: 1,
                                margin: 20,
                                alignItems: "center"
                            }}>
                                <Icon
                                    name={"alpha-f-circle"}
                                    color={"#335272"}
                                    style={{
                                        // position: "absolute",
                                    }}
                                    size={40}
                                />
                                <Text style={[styles.textStyle, { marginLeft: 10 }]}>Connect to Facebook Page</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Linking.openURL('fb-messenger://user-thread/' + this.state.fbPageId)}>
                            <View style={{
                                flexDirection: "row",
                                // borderWidth: 1,
                                margin: 20,
                                alignItems: "center"
                            }}>
                                <Icon
                                    name={"facebook-messenger"}
                                    color={"#335272"}
                                    style={{
                                        // position: "absolute",
                                    }}
                                    size={40}
                                />
                                <Text style={[styles.textStyle, { marginLeft: 10 }]}>Chat with employee</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    textStyle: {
        color: "#335272",
        fontSize: 18,
        fontWeight: "bold",
        // textAlign: "center"
    },
})