import { MaterialCommunityIcons } from "@expo/vector-icons";
import { setStatusBarBackgroundColor } from "expo-status-bar";
import react from "react";
import { View,Text,StyleSheet} from "react-native-web";


const Icons = ({ name, iconText }) => {
    return (
        <View style={styles.iconwrapper}>

            <View style={styles.iconContainer}>

                <MaterialCommunityIcons name={name} size={27} color="black"/>

             <Text style={styles.iconText}>
                {iconText}

             </Text>
        </View>


        </View>


    )
        
    }

    const styles = StyleSheet.create({
        iconwrapper: {
            setStatusBarBackgroundColor: "2c3e50",
            width:"100%",
            height:"100%",
            alignItems:"center",
            justifyContent:"center",
            bordeRadius:10,
        },
        iconContainer: {
            alignItems:"center",
            justifyContent:"center",
        },
        iconText:{
            height:20,
            fontWeight:"500",
            color:"#34495e",
        }
    })
     

    
    export default Icons;