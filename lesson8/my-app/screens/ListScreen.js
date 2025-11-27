import React from "react";
import { Text, StyleSheet, View, FlatList, TouchableOpacity,Button} from "react-native";


const students = [
  { name: "Eden", surname: "Rocha", age: "17" },
  { name: "Kaylen", surname: "Tyler", age: "15" },
  { name: "Ellie", surname: "Mcclure", age: "17" },
  { name: "Journey", surname: "Blackburn", age: "16" },
];

const ListScreen = () => {
  let count=0;
  return (
    <View>

      <Button title="Go to List Screen" onPress={() => navigation.navigate("Main")} />
      <Button title="Go to Olti Screen" onPress={() => navigation.navigate("olti")} />

    

    
      <TouchableOpacity

        style={styles.touchableBtn}
        >
        <Text style={styles.textStyle}>Click me</Text>
        onPress={()=>console.log("butoni eshte klikua nga toucheble opacity",count++)}
      </TouchableOpacity>
  
      <Button
      text = "click me"
      color="blue"
      onPress={()=>console.log("butoni eshte klikuar",count++)}
      >
        
      </Button>

      <Text style={styles.textStyle}>List of Students</Text>
      <FlatList

        data={students}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Text style={styles.textStyle}>
            {item.name} {item.surname} — Age {item.age}
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    marginVertical: 5,
  },
  btnText:{  
    color:"white",
    textAlign:"center",
    fontSize:25,
    fontWeight:"bold"
  },
  touchableBtn:{
    backgroundColor:"blue",
    marginVertical:15,
    paddingVertical:20,
    borderRadius:6,
    marginHorizontal:20,
  }
});

export default ListScreen;
