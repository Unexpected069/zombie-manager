import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

const ModalComponent = ({isVisible,id,data,onPress,onClosed}) => {
 // const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
         // Alert.alert("Modal has been closed.");
         // setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, {backgroundColor:'green',width:200}]}
              onPress={onClosed}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>


            <Text style={styles.modalText}>Move To</Text>
            {data.map(item=>{
              return(
            <Pressable
                key={item.id}
              style={[styles.button, styles.buttonClose]}
              onPress={()=>onPress(item.quarantineLocation)}>
              <Text style={styles.textStyle}>{item.quarantineLocation}</Text>

            </Pressable>
             )})}
          </View>
        </View>
      </Modal>
      
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
   
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    width:'90%',
    height:'50%',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    //borderRadius: 20,
    marginBottom:20,
    width:300,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
   // backgroundColor: "#2196F3",
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    fontSize:24,
    textAlign: "center"
  }
});

export default ModalComponent;