import react from "react";
import { View, Text, StyleSheet,Image } from "react-native";


const Item = ({ item }) => {

    return (
        <View style={styles.cardContainer}>
            <Image source={{ uri: item.image }} style={styles.img} >
            </Image>

        

          <View style={styles.textcontainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.desc}>{item.description}</Text>
            <Text style={styles.price}>{item.price}</Text>
           </View>

           </View>


      
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        flexDirection: 'row',
        marginBottom: 16,
    },
    img: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    textcontainer: {
        paddingHorizontal: 16,
        flex: 1,
    },
    name:{
        fontSize: 18,
        fontWeight: 'bold',
    },
    category:{
        color: '#2bb86c',
    },
    desc:{
        fontSize: 14,
        marginvertical: 8,
   
    },
    price:{
        backgroundColor: '2bb86c',
        color: '#fff',
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        borderRadius: 4,
    }



    
    })
export default Item;