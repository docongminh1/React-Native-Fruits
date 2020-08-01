import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Icon from "react-native-vector-icons/FontAwesome";
import { Image } from 'react-native';

import LoginComponent from '../components/login/loginComponent';
import UserContainer from '../containers/userContainers'
import CreateAccountComponent from '../components/login/createAccountComponent';

import UserProfile from '../components/userProfile/userProfile'

// import Home from '../components/home/homeComponent';
import HomeContainer from '../containers/homeContainer';
import getProducyByClassName from '../components/home/getProductByClassName'

import CartComponent from '../components/cart/cartComponent';
import OrderComponent from '../components/order/orderComponent';
import PayWithMomo from '../components/order/payWithMomo'

// import ProductComponent from '../components/products/productComponent';
import ProductContainer from '../containers/productContainer';
import detailProduct from '../components/products/detailProduct'

import Menu from '../components/menu/Menu'
import Introduce from '../components/menu/introduceComponent'
import Policy from '../components/menu/policyComponent'
import Connect from '../components/menu/connectComponent'

//import AdminComponent from '../components/admin/adminComponent';
import AdminContainer from '../containers/adminContainer';
import AddData from '../components/admin/AddData'

//import AdminCart from '../components/adminCart/adminCartComponent'
import AdminCart from '../containers/adminCartContainer'
import DetailAdminCart from '../components/adminCart/detailOrderCart'

const TabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeContainer,
            navigationOptions: {
                tabBarLabel: 'Trang Chủ',
                tabBarIcon: ({ focused }) => (
                    <>
                        {focused ? (
                            <Image  source={require('../res/images/tabbar/home.png')}
                                    resizeMode="contain"
                                    style={{width: 23, height: 23, tintColor: '#555CC4'}}
                            />
                        ) :
                        (
                            <Image  source={require('../res/images/tabbar/home.png')}
                                    resizeMode="contain"
                                    style={{width: 23, height: 23}}
                            />
                        )}
                    </>
                ),
            },
        },
        Product: {
            screen: ProductContainer,
            navigationOptions: {
                tabBarLabel: 'Sản phẩm',
                tabBarIcon: ({ focused }) => (
                    <>
                        {focused ? (
                            <Image  source={require('../res/images/tabbar/pages.png')}
                                    resizeMode="contain"
                                    style={{width: 23, height: 23, tintColor: '#555CC4'}}
                            />
                        ) : (
                            <Image  source={require('../res/images/tabbar/pages.png')}
                                    resizeMode="contain"
                                    style={{width: 23, height: 23}}
                            />
                            )}
                    </>
                ),
            },
        },
        Cart: {
            screen: CartComponent,
            navigationOptions: {
                tabBarLabel: 'Giỏ hàng',
                tabBarIcon: ({ focused }) => (
                    <>
                        {focused ? (
                            <Image  source={require('../res/images/tabbar/cart.png')}
                                    resizeMode="contain"
                                    style={{width: 40, height: 40, tintColor: '#555CC4'}}
                            />
                        ) : (
                            <Image  source={require('../res/images/tabbar/cart.png')}
                                    resizeMode="contain"
                                    style={{width: 40, height: 40}}
                            />
                            )}
                    </>
                ),
            },
        },
    },
    {
        tabBarOptions: {
            activeTintColor: '#4390DF',
            inactiveTintColor: '#707070',
            style: {
                paddingTop: 11,
                paddingBottom: 10,
                height: 63,
            },
        },
    },
);

const BottomTab = createAppContainer(TabNavigator);

const drawerMenu = createDrawerNavigator({
    Tabbar: {
        screen: BottomTab,
    },
    Admin: {
        screen: AdminContainer,
    },
    AddData: {
        screen: AddData,
    },
    AdminCart: {
        screen: AdminCart,
    },
    ProductByClass:{
        screen: getProducyByClassName
    },
    DetailOrder:{
        screen: DetailAdminCart
    },
    Detail: {
        screen: detailProduct,
    },
    Order:{
        screen: OrderComponent,
    },
    PayWithMomo:{
        screen: PayWithMomo,
    },
    UserProfile:{
        screen: UserProfile
    },
    //slide Menu
    Introduce:{
        screen: Introduce
    },
    Policy:{
        screen: Policy
    },
    Connect:{
        screen: Connect
    }
    
},
    {
        drawerWidth: 350,
        drawerPosition: "left",
        // drawerBackgroundColor: "#00FFFF",
        drawerType: "back",
        defaultNavigationOptions:"",
        contentComponent: props => <Menu {...props} />
    }
)

const SideMenu = createAppContainer(drawerMenu);

const RootStack = createStackNavigator(
    {
        // Init: {
        //     screen: LoginComponent,
        // },
        Init: {
            screen: SideMenu,
        },
        // HomePage: {
        //     screen: BottomTab,
        // },
        Login: {
            screen: LoginComponent,
        },
        // User: {
        //     screen: UserContainer,
        // },
        Create: {
            screen: CreateAccountComponent,
        },
        // Admin: {
        //     screen: AdminComponent,
        // }
    },
    {
        mode: 'modal',
        headerMode: 'none',
    },
);


// const SplashStack = createStackNavigator(
//   {
//     Splash: SplashScreen,
//     RootStack: RootStack
//   },
//     {
//       headerMode:"none",
//     }
// )

export default createAppContainer(RootStack);
// export default createAppContainer(SplashStack);
