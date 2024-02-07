import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { colors } from '@/constants';
import Icon from '@/components/shared/Icons';
import { useNavigationContainerRef } from '@react-navigation/native';
import { HomeScreen, ProjectList } from '@/screens';


const BottomTab = createMaterialBottomTabNavigator();



export default function BottomTabNavigator() {


    const barColors = {
        home: colors.primary,
        cart: colors.black
    };

    const [tab, setTab] = React.useState<keyof typeof barColors>('home');
    const navRef = useNavigationContainerRef();
    React.useEffect(() => {
        const unsubscribe = navRef.addListener('state', () => {
            const currRoute = navRef.getCurrentRoute();
            if (currRoute) {
                // A work-around to set background color for the bar after the ripple
                // effect completes. The 200 ms delay comes from trial and error
                setTimeout(() => setTab(currRoute.name as keyof typeof barColors), 200);
            }
        });
        return unsubscribe;
    });


    return (
        <BottomTab.Navigator
            initialRouteName="HomeScreen"
            shifting={true}
            activeColor={colors.white}
            barStyle={{
                backgroundColor: barColors[tab]
            }}
        >
            <BottomTab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    tabBarColor: barColors.home,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused }) => (
                        <Icon name="home" size={35} color={focused == true ? colors.white : colors.gray} />
                    )
                }}
            />
            <BottomTab.Screen
                name="ProjectList"
                component={ProjectList}
                options={{
                    tabBarColor: barColors.cart,
                    tabBarLabel: 'Cart',
                    tabBarIcon: ({ focused }) => (
                        <>
                            <Icon name="cart" size={35} color={focused == true ? colors.white : colors.gray} />
                        </>
                    )
                }}
            />
        </BottomTab.Navigator>
    )
}

const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        top: -14,
        right: 3,
        height: 24,
        width: 24,
        borderRadius: 12,
        backgroundColor: colors.primary,
        justifyContent: 'center',
    },
    badgeText: {
        color: colors.white,
        textAlign: 'center'
    },
})