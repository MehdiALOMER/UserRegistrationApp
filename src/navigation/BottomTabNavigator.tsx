import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { colors } from '@/constants';
import Icon from '@/components/shared/Icons';
import { useNavigationContainerRef } from '@react-navigation/native';
import { HomeScreen, CustomTable } from '@/screens';


const BottomTab = createMaterialBottomTabNavigator();



export default function BottomTabNavigator() {


    const barColors = {
        chart: colors.primary,
        table: colors.black
    };

    const [tab, setTab] = React.useState<keyof typeof barColors>('chart');
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
                    tabBarColor: barColors.chart,
                    tabBarLabel: 'Chart',
                    tabBarIcon: ({ focused }) => (
                        <Icon name="chart-bar" size={30} color={focused == true ? colors.secondary : colors.gray} />
                    )
                }}
            />
            <BottomTab.Screen
                name="CustomTable"
                component={CustomTable}
                options={{
                    tabBarColor: barColors.table,
                    tabBarLabel: 'Table',
                    tabBarIcon: ({ focused }) => (
                        <>
                            <Icon name="table-large" size={30} color={focused == true ? colors.secondary : colors.gray} />
                        </>
                    )
                }}
            />
        </BottomTab.Navigator>
    )
}