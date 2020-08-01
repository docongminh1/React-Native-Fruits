
import React, { Component } from 'react';
import {
    Button,
    Image,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    FlatList,
    StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Icon from "react-native-vector-icons/FontAwesome";
import { ScrollView } from 'react-native-gesture-handler';

export default class policyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

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
                            <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }}>
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
                            <Text style={{ fontWeight: "bold", fontSize: 24, color: "white" }}>CHÍNH SÁCH</Text>
                        </View>

                        <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}>
                            <Text style={styles.textStyle}> </Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{ flex: 0.9, backgroundColor: "#FAFAFA" }}>
                    <ScrollView style={{ marginLeft: 20, marginRight: 10 }}>
                        <Text style={{ color: "#335272", fontSize: 25, fontWeight: "bold", textAlign: "center" }}>
                            Chính sách chung
                        </Text>
                        <Text style={[styles.textStyle, { marginTop: 30, color: "#A93226 " }]}>
                            I. PHƯƠNG THỨC ĐẶT HÀNG:
                        </Text>
                        <View style={styles.viewContentStyle}>
                            <Text style={styles.textStyle}>
                                - Đặt online qua app "Fresh Fruit shop"
                            </Text>
                            <Text style={styles.textStyle}>
                                - Đặt qua số Hotline 1900 988 922 (#1)
                            </Text>
                            <Text style={styles.textStyle}>
                                Sau khi đặt hàng, nhân viên chúng tôi sẽ xác nhận đơn hàng với Quý khách qua điện thoại.
                            </Text>
                        </View>
                        <Text style={[styles.textStyle, { marginTop: 20, color: "#A93226 " }]}>
                            II. CHÍNH SÁCH GIAO HÀNG
                        </Text>
                        <View style={styles.viewContentStyle}>
                            <Text style={styles.textStyle}>
                                Các cửa hàng của Fresh Fruit shop tuỳ khu vực, hoạt động từ thứ 2 – Chủ nhật hàng tuần, có thể đặt hàng qua app bất cứ thời gian nào trong ngày. Chúng tôi sẽ sắp xếp giao cho Quý khách trong thời gian sớm nhất.
                            </Text>
                            <Text style={styles.textStyle}>
                                1. Đối với các đơn hàng trong khu vực nội thành  Hồ Chí Minh .
                            </Text>
                            <Text style={styles.textStyle}>
                                1.1: Giờ đặt hàng và nhận hàng:
                            </Text>
                            <Text style={styles.textStyle}>
                                - Đặt hàng từ 21h00 hôm trước – 8h30 ngày hôm sau, nhận hàng từ 10h00-12h00.
                            </Text>
                            <Text style={styles.textStyle}>
                                - Đặt hàng từ 9h30 – 14h30, nhận hàng từ 15h00 - 17h00 cùng ngày.
                            </Text>
                            <Text style={styles.textStyle}>
                                - Đặt hàng từ 14h30 – 18h30, nhận hàng từ 19h00 – 21h00 cùng ngày.(trừ một số trường hợp đặc biệt, phụ thuộc vào khả năng đáp ứng của cửa hàng)
                            </Text>
                            <Text style={styles.textStyle}>
                                1.2: Chính sách phí ship hàng:
                            </Text>
                            <Text style={styles.textStyle}>
                                - Đối với các đơn hàng giao nhanh trong 2h thì phí ship là 45.000 VNĐ. Giao hàng tiêu chuẩn là 30.000 VNĐ
                            </Text>
                            <Text style={styles.textStyle}>
                                - Đối với các đơn hàng dưới 500.000 VNĐ, khách hàng tự chịu chi phí vận chuyển.
                            </Text>
                        </View>
                        <Text style={[styles.textStyle, { marginTop: 20, color: "#A93226 " }]}>
                            III. PHƯƠNG THỨC THANH TOÁN:
                        </Text>
                        <View style={styles.viewContentStyle}>
                            <Text style={styles.textStyle}>
                                - Thanh toán trực tiếp tại cửa hàng
                            </Text>
                            <Text style={styles.textStyle}>
                                - Nhận hàng – thanh toán (COD)
                            </Text>
                            <Text style={styles.textStyle}>
                                - Thanh toán qua Momo.
                            </Text>
                        </View>
                        <Text style={[styles.textStyle, { marginTop: 20, color: "#A93226 " }]}>
                            IV. CHÍNH SÁCH ĐỔI TRẢ VÀ HOÀN TIỀN
                        </Text>
                        <View style={styles.viewContentStyle}>
                            <Text style={styles.textStyle}>
                                - Quý khách có thể lựa chọn đổi lấy sản phẩm loại khác tương đương với giá trị sản phẩm bị lỗi đã mua trong vòng 24h.
                            </Text>
                        </View>
                        <Text style={[styles.textStyle, { marginTop: 20, color: "#A93226 " }]}>
                            V. KHÁCH HÀNG THÂN THIẾT:
                        </Text>
                        <View style={styles.viewContentStyle}>
                            <Text style={styles.textStyle}>
                                - Mỗi lần mua hàng, quý khách sẽ được tích điểm vào hệ thống. 1 điểm = 10.000 VND. Fresh Fruit shop sẽ thường xuyên có những chương trình đặc biệt dành cho khách hàng thân thiết.
                            </Text>
                        </View>
                        <Text style={[styles.textStyle, { marginTop: 20, color: "#A93226 " }]}>
                            VI. SỬ DỤNG PHIẾU QUÀ TẶNG, MÃ GIẢM GIÁ
                        </Text>
                        <View style={styles.viewContentStyle}>
                            <Text style={styles.textStyle}>
                                - Quý khách vui lòng xuất trình trước khi thanh toán cho thu ngân.
                            </Text>
                            <Text style={styles.textStyle}>
                                - Phiếu phải được giữ nguyên vẹn, không bị rách, không chấp vá.
                            </Text>
                            <Text style={styles.textStyle}>
                                - Phiếu quà tặng/ Mã giảm giá phải còn hạn sử dụng.
                            </Text>
                            <Text style={styles.textStyle}>
                                - Quý khách có thể sử dụng phiếu nhiều lần cho đến khi hết tiền trong phiếu.
                            </Text>
                            <Text style={styles.textStyle}>
                                - Phiếu không được quy đổi thành tiền mặt.
                            </Text>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    textStyle: {
        color: "#335272",
        fontSize: 18,
        fontWeight: "bold"
        // textAlign: "center"
    },
    viewContentStyle: {
        marginLeft: 10
    }
})