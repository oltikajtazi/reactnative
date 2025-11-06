import React from "react";
import {Text, StyleSheet, View} from "react-native";



const MainScreen=()=>{

    return ( 
    <View>
        <Text style={style.textStyle}> This is main screen 2</Text>
    </View>
 );
};

const style = StyleSheet.create({
    textStyl:{
        fontsize: 30,
    },
})