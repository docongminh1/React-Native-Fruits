import React, { Component } from 'react';
import {
    Text,
    Image,
    Alert,
    View,
    Platform,
    TextInput,
    FlatList,
    TouchableOpacity,
    Dimensions,
    ScrollView,
} from 'react-native';
import Modal from 'react-native-modalbox';
import ImagePicker from "react-native-image-picker";

var screen = Dimensions.get('window');
export default class EditDataModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            price: "",
            countInStock: "",
            imageFruit: null,
            brand: "",
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

    componentDidMount() {

    }

    //lay gia tri va hien thi len 
    showEditModal = (item) => {
        this.setState({
            _id: item._id,
            name: item.name,
            price: item.price.toString(),
            brand: item.brand,
            countInStock: item.countInStock.toString(),
            imageFruit: item.imageFruit
        })
        // console.log("test image", item.imageFruit)
        // console.log("test brand", item.brand)
        this.refs.myModal.open();
    }

    render() {
        return (
            <Modal
                //ten tham chieu
                ref={"myModal"}
                style={{
                    justifyContent: "center",
                    borderRadius: Platform.OS === 'ios' ? 30 : 0,
                    shadowRadius: 10,
                    width: screen.width - 80,
                    height: 500
                }}
                position="center"
                backdrop={true}
                onClosed={() => {

                }}
            >
                <ScrollView>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            textAlign: "center",
                            marginTop: 10
                        }}
                    >Fruit's Infomation</Text>
                    {/* <TouchableOpacity onPress={this.selectGallery.bind(this)}> */}
                    <View style={{ height: 100, alignItems: "center" }}>
                        <TouchableOpacity onPress={this.selectGallery.bind(this)}>
                            {this.state.imageFruit === null
                                ? <Image style={{
                                    borderRadius: 8,
                                    width: 100,
                                    height: 100,
                                    // justifyContent: 'center',
                                    // alignItems: 'center',
                                }} source={require("../../res/images/noImage.png")}
                                />
                                : <Image style={{
                                    borderRadius: 8,
                                    width: 100,
                                    height: 100,
                                    // justifyContent: 'center',
                                    // alignItems: 'center',
                                }}
                                // source= {{ uri: this.state.imageFruit }}
                                source= {this.state.imageFruit }
                                />
                            }
                        </TouchableOpacity>
                    </View>
                    {/* </TouchableOpacity> */}
                    <TextInput
                        style={{
                            height: 40,
                            borderColor: "gray",
                            marginTop: 20,
                            marginLeft: 30,
                            marginRight: 30,
                            marginBottom: 10,
                            borderBottomWidth: 1
                        }}
                        onChangeText={(name) => this.setState({ name })}
                        placeholder="Ten trai cay"
                        //lay gia tri title gan vao state title
                        value={this.state.name}
                    />
                    <TextInput
                        style={{
                            height: 40,
                            borderColor: "gray",
                            marginTop: 10,
                            marginLeft: 30,
                            marginRight: 30,
                            marginBottom: 20,
                            borderBottomWidth: 1
                        }}
                        onChangeText={(price) => this.setState({ price })}
                        placeholder="Gia trai cay"
                        //lay gia tri title gan vao state title
                        value={this.state.price}
                    />
                    <TextInput
                        style={{
                            height: 40,
                            borderColor: "gray",
                            marginTop: 10,
                            marginLeft: 30,
                            marginRight: 30,
                            marginBottom: 20,
                            borderBottomWidth: 1
                        }}
                        onChangeText={(brand) => this.setState({ brand })}
                        placeholder="Xuat xu"
                        //lay gia tri title gan vao state title
                        value={this.state.brand}
                    />
                    <TextInput
                        style={{
                            height: 40,
                            borderColor: "gray",
                            marginTop: 10,
                            marginLeft: 30,
                            marginRight: 30,
                            marginBottom: 20,
                            borderBottomWidth: 1
                        }}
                        onChangeText={(countInStock) => this.setState({ countInStock })}
                        placeholder="So luong"
                        //lay gia tri title gan vao state title
                        value={this.state.countInStock}
                    />
                    <TouchableOpacity
                        style={{
                            padding: 8,
                            marginLeft: 70,
                            marginRight: 70,
                            borderRadius: 6,
                            borderWidth: 0.5,
                            height: 40,
                            backgroundColor: "mediumseagreen"
                        }}
                        onPress={() => {
                            if (this.state.name.length == 0
                                || this.state.price.length == 0
                                || this.state.countInStock.length == 0
                                || this.state.brand.length == 0
                                || this.state.imageFruit == null
                            ) {
                                alert(" Ban phai nhap ten gia va so luong");
                                return;
                            }
                            this.props.adminComponent.props.onUpdateItem(this.state);
                            this.refs.myModal.close();
                        }}
                    ><Text style={{ fontSize: 18, color: "white", textAlign: "center" }}>OK</Text>
                    </TouchableOpacity>
                </ScrollView>
            </Modal>
        )
    }
}

