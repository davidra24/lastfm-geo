import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'

export const Loading = ({ size = 'small', text = '', fontSize = 20 }) => (
    <View>
        <ActivityIndicator color="red" size={size} />
        <Text style={{fontSize: fontSize}}>{text}</Text>
    </View>

)