import react from "react"
import { View,Text,StyleSheet,Image } from "react-native-web";

const Student = (props) => {
    return (
        <View> 
            <Text style={styles.text}>{props.name}</Text>
            <View>
                <Image 
                source={props.image}
                style={{width:100,height:100,marginLeft:100}}
                ></Image>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontSize: 20,
        marginVertical: 20,

       
    }
})


export default Student;