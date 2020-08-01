import React, { Component } from "react";
import {
    Text,
    View,
    Aleart,
    TextInput,
    Platform,
    Alert,
    Image
} from 'react-native';
import Swipeout from 'react-native-swipeout';

export default class FlatlistAdminItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const swipeSettings = {
            autoClose: true,
            style:{ margin: 10, borderRadius: 8 },
            right: [        
                {
                    onPress: () => {
                        const { adminComponent } = this.props
                        //Show Editmodal here
                        adminComponent.refs.editModal.showEditModal({ ...this.props });
                    },
                    text: "Edit", type: "primary"
                    
                },
                {
                    onPress: () => {
                        Alert.alert(
                            "Canh bao !!!",
                            "Ban co that su muon xoa?",
                            [
                                { text: "No", onPress: () => console.log("Cancel pressed"), style: "cancel" },
                                {
                                    text: "Yes", onPress: () => {
                                        const { adminComponent } = this.props;
                                        adminComponent.props.onDeleteItem(this.props._id);
                                    }
                                }
                            ],
                            { cancelable: true }
                        )
                    },
                    text: "Delete", type: "delete"
                }
            ],
            rowId: this.props._id,
            sectionId: 1
        }
        return (
            <Swipeout {...swipeSettings}>
                <View style={{
                    flex: 1,
                    backgroundColor: (this.props.itemIndex % 2 === 0) ? '#a9ecff' :'#cbfaff',
                    height: 120,
                    // margin: 10,
                    // borderRadius: 8,
                    flexDirection: "row" }}
                >
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={{ uri:this.props.imageFruit }}
                            style={{ width: 80, height: 80, marginLeft: 40 }}
                        />
                    </View>
                    <View style={{ justifyContent: "center", marginLeft: 20 }}>
                        <Text style={{ fontSize: 18 }}> {this.props.name} </Text>
                        <View style={{ flexDirection: "row" }}>
                            <Image source={require('../../res/images/tabbar/cart.png')}
                                style={{ width: 30, height: 30, tintColor: "#3333ff" }}
                            />
                            <Text style={{ fontSize: 18 }}> {this.props.price} </Text>
                        </View>
                    </View>
                </View>
            </Swipeout>
        )
    }
}