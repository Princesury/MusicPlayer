import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Home from './Screen/Home';
import Music from './Screen/Music';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Home' component={Home} options={{headerShown:false}} />
            <Stack.Screen name='Music' component={Music} options={{headerShown:true}} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator