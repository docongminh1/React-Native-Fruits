import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';
import { WebView } from 'react-native-webview';

export default class introduceComponent extends Component {
    render() {
        return( 
            <WebView 
                source={{ uri: 'https://vietnam.vnanet.vn/vietnamese/trai-cay-viet/25679.html' }} 
            />
        )
    }
}