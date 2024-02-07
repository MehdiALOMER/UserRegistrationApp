import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DashboardScreen } from '@/screens';
import UserProfileInformationScreen from '@/screens/UserProfileInformationScreen';
import RegisterScreen from '@/screens/RegisterScreen';
import DrawerNavigator from './DrawerNavigator';


export type RootStackParamList = {
    RegisterScreen: undefined;
    UserProfileInformationScreen: undefined;
    LoginScreen: undefined;
    DrawerNavigator: undefined;
    DashboardScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();



const AppStackNavigator = () => {

    useEffect(() => {

    }, []);

    return (
        <Stack.Navigator
            /* initialRouteName="AppStackNavigator" */
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name={"RegisterScreen"} component={RegisterScreen} />
            <Stack.Screen name={"UserProfileInformationScreen"} component={UserProfileInformationScreen} />
            <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
            <Stack.Screen name={"DashboardScreen"} component={DashboardScreen} />
        </Stack.Navigator>
    );
};

export default AppStackNavigator;