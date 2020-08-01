
import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    Alert,
    ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Icon from "react-native-vector-icons/FontAwesome";
import ImagePicker from "react-native-image-picker";

import { API_FRUIT } from '../../config/setting'

const urlCreateListFruit = `${API_FRUIT}/api/creatListFruit`;

export default class adminComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            imageFruit: null,
            price: "",
            brand: "",
            countInStock: "",
            description: ""
        }
    }

    selectGallery() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        }
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                this.setState({
                    imageFruit: response
                    //ImageSource: source
                })
            }
        });
    }

    async postDataToApi() {
        const name = this.state.name
        const price = this.state.price
        const brand = this.state.brand
        const countInStock = this.state.countInStock
        const description = this.state.description

        // const randomNumber = Math.floor(Math.random() * 10000) + 1
        // const imageUrl = this.state.imageFruit.uri
        const image = this.state.imageFruit

        let bodyData = new FormData()

        bodyData.append('name', name)
        bodyData.append('price', price)
        bodyData.append('brand', brand)
        bodyData.append('countInStock', countInStock)
        bodyData.append('description', description)
        bodyData.append('imageFruit', {
            // name: `${image.fileName}_${randomNumber}`,
            name: image.fileName,
            // name: image.fileName.replace("HEIC", 'JPG'),
            type: image.type,
            uri: image.uri,
            size: image.fileSize,
        })
        console.log("bodyData", bodyData)
        const response = await fetch(`${urlCreateListFruit}`, {
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: bodyData

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
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.1 }}>
                    <ImageBackground
                        source={require('../../res/images/topBarBg.png')}
                        style={{ flex: 1, flexDirection: "row" }}
                        resizeMode="cover"
                    >
                        <View style={{ flex: 0.5, alignItems: "flex-start", justifyContent: "center" }}>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Admin'); }}>
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
                            <Text style={{ fontWeight: "bold", fontSize: 24, color: "white" }}>Thêm sản phẩm</Text>
                        </View>

                        <View style={{ flex: 0.5, alignItems: "flex-end", justifyContent: "center" }}>

                        </View>
                    </ImageBackground>
                </View>
                <View style={{ flex: 0.9, backgroundColor: "#FAFAFA" }}>

                    <TouchableOpacity
                        onPress={this.selectGallery.bind(this)}
                        style={{ flexDirection: "row", alignItems: "center", marginLeft: 20 }}>
                        <Image
                            source={require("../../res/images/tabbar/ic_gallery.png")}
                            style={{ width: 36, height: 36 }}
                        />
                        <Text style={{ fontSize: 18, marginLeft: 10, color: "#335272", fontWeight: "bold" }}>Thư viện ảnh</Text>
                    </TouchableOpacity>

                    <View style={{ height: 250, alignItems: "center" }}>
                        {this.state.imageFruit === null
                            ? <Image style={{
                                borderRadius: 8,
                                width: 250,
                                height: 250,
                                // justifyContent: 'center',
                                // alignItems: 'center',
                            }} source={require("../../res/images/noImage.png")}
                            />
                            : <Image style={{
                                borderRadius: 8,
                                width: 250,
                                height: 250,
                                // justifyContent: 'center',
                                // alignItems: 'center',
                            }} source={this.state.imageFruit}
                            />
                        }
                    </View>
                    <ScrollView>
                        <TextInput
                            style={{
                                margin: 20,
                                // marginRight: 20,
                                // marginBottom: 20,
                                borderColor: 'gray',
                                borderWidth: 1,
                                borderRadius: 8,
                                fontSize: 20,
                                backgroundColor: "white"
                            }}
                            onChangeText={(name) => this.setState({ name })}
                            placeholder="Nhập ten sản phẩm"
                            maxLength={100}
                            value={this.state.name}
                        />

                        <TextInput
                            style={{
                                margin: 20,
                                // marginRight: 20,
                                // marginBottom: 20,
                                borderColor: 'gray',
                                borderWidth: 1,
                                borderRadius: 8,
                                fontSize: 20,
                                backgroundColor: "white"
                            }}
                            onChangeText={(price) => this.setState({ price })}
                            placeholder="Nhập gia sản phẩm"
                            maxLength={100}
                            keyboardType="numeric"
                            value={this.state.price}
                        />

                        <TextInput
                            style={{
                                margin: 20,
                                // marginRight: 20,
                                // marginBottom: 20,
                                borderColor: 'gray',
                                borderWidth: 1,
                                borderRadius: 8,
                                fontSize: 20,
                                backgroundColor: "white"
                            }}
                            onChangeText={(brand) => this.setState({ brand })}
                            placeholder="Nhập noi san xuat sản phẩm"
                            maxLength={100}
                            value={this.state.brand}
                        />

                        <TextInput
                            style={{
                                margin: 20,
                                // marginRight: 20,
                                // marginBottom: 20,
                                borderColor: 'gray',
                                borderWidth: 1,
                                borderRadius: 8,
                                fontSize: 20,
                                backgroundColor: "white"
                            }}
                            onChangeText={(countInStock) => this.setState({ countInStock })}
                            placeholder="Nhập so luong sản phẩm"
                            keyboardType="numeric"
                            maxLength={100}
                            value={this.state.countInStock}
                        />

                        <TextInput
                            style={{
                                margin: 20,
                                // marginRight: 20,
                                // marginBottom: 20,
                                borderColor: 'gray',
                                borderWidth: 1,
                                borderRadius: 8,
                                fontSize: 20,
                                backgroundColor: "white"
                            }}
                            onChangeText={(description) => this.setState({ description })}
                            placeholder="Nhập mo ta sản phẩm"
                            keyboardType="numeric"
                            maxLength={100}
                            value={this.state.description}
                        />

                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity
                                style={{
                                    borderWidth: 1,
                                    backgroundColor: "#3c3ab2",
                                    height: 40,
                                    marginLeft: 20,
                                    marginRight: 10,
                                    borderRadius: 8,
                                    width: "44%",
                                    alignItems: "center",
                                    justifyContent: "center",

                                }}
                                // onPress={() => this.props.navigation.navigate('HomePage')}>
                                onPress={async () => {
                                    const { name, price, brand, countInStock, imageFruit } = this.state;
                                    //yeu cau nhap textInput
                                    if (name.trim() === ""
                                        || imageFruit === null
                                        || price.trim() === ""
                                        || brand.trim() === ""
                                        || countInStock.trim() === ""
                                    ) {
                                        Alert.alert(
                                            'THÔNG BÁO !!!',
                                            ' Bạn còn thông tin sản phẩm chưa nhập hoặc đang để trống hình ảnh !!!'
                                        );
                                        return;
                                    }
                                    else {
                                        const response = await this.postDataToApi()
                                        // console.log('ddđ', response)
                                        if (response.resultCode !== undefined && response.resultCode === 1) {
                                            alert(response.message)
                                            this.setState({
                                                name: "",
                                                imageFruit: null,
                                                price: "",
                                                brand: "",
                                                countInStock: ""
                                            })
                                        }
                                        else {
                                            alert(response.message === undefined ? 'Không kết nối được tới server 2' : response.message)
                                        }
                                    }

                                }}
                            >
                                <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Luu</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    borderWidth: 1,
                                    backgroundColor: "#528de3",
                                    height: 40,
                                    marginRight: 20,
                                    marginLeft: 10,
                                    borderRadius: 8,
                                    width: "44%",
                                    alignItems: "center",
                                    justifyContent: "center",

                                }}
                                onPress={() => this.props.navigation.navigate('Admin')}>
                                <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Huy</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}