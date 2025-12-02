import React from "react";
import { View ,Text,StyleSheet} from "react-native-web";
import Student from "../components/Student";


const StudentScreen =(props)=> {
    return(


        <View>
            <Text style={styles.text}>Student scrren</Text>
            <Student name="olti"
            image={require("../assets/person1.jpg")}

            ></Student>
            <Student name="andi"
            image={require("../assets/person1.jpg")}
            ></Student>
            <Student name="nil"
            image={require("../assets/person1.jpg")}
            ></Student>


        </View>


    )


}



const styles = StyleSheet.create({


    text:{
        textAlign:'center',
        fontSize :20,
        marginVertical:20
    }


})





export default StudentScreen;



