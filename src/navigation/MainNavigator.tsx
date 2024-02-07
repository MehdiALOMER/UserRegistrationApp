import React from "react"               // Badge Kullanıldığı için eklenmiştir.
import AppStackNavigator from "./AppStackNavigator"
import { NavigationContainer } from "@react-navigation/native"



const MainNavigator = () => {
    return (
        <NavigationContainer>
            <AppStackNavigator />
        </NavigationContainer>
    )
}

export default MainNavigator;