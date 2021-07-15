
import React ,{useEffect,useContext, useState,}from 'react';
import { StyleSheet,View,FlatList,Text, TouchableOpacity, Alert} from "react-native";
import ModalComponent from '../component/ModalComponent';
import UserContext from '../context/userContext';
import { ApolloProvider, Query, useQuery,useMutation } from "react-apollo";
import { zombiesQuaratineLocation } from '../data/dummydata';
import { GET_ZOMBIES, UPDATE_ZOMBIES } from '../data/api';




const List=({route,navigation})=>{
    const context=useContext(UserContext);
    const [modal,showModal]=useState(false);
    const [getId,setId]=useState(0);
    const {facility}=route.params!=undefined?route.params:'';
    const  {status, data, error, refetch}  = useQuery(GET_ZOMBIES,{manual:true});
    const [onMoveHandler] = useMutation(UPDATE_ZOMBIES);


    useEffect(()=>{
        navigation.setOptions({ headerTitle: facility })
    },[])

    const onShowModal=(id)=>{
        setId(id);
        showModal(true);
    }


const onMove=(location)=>{
    console.log('id '+getId);
   
    console.log('location '+location);
 
    onMoveHandler({ variables: { id:parseInt(getId),location:location.toString()}})
    .then((response)=>{
       // console.log('success !! '+response.data);
        refetch().then((fetchresponse)=>{
            //console.log('fetch !! '+fetchresponse.data.zombies);
            context.setZombies([...fetchresponse.data.zombies])

        })
        showModal(false);
    }).catch((error)=>{
        Alert.alert(error)
    })
        


   

}

const renderItem=({item})=>{
    return(
      <TouchableOpacity 
      onPress={()=>onShowModal(item.id)}
      style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>
            {item.zombieName}
            </Text>
            
        </TouchableOpacity>
    )
}




return(


<View style={{flex:1}}>

<FlatList
data={context.zombies.filter((value)=>{return value.zombieLocation.toLowerCase().match(facility.toLowerCase())})}
keyExtractor={(item) => item.id}
renderItem={renderItem}/>

<ModalComponent
isVisible={modal}
onClosed={()=>showModal(false)}
data={zombiesQuaratineLocation.filter((value)=>{return value.quarantineLocation!=facility})}
onPress={onMove}
/>

</View>)

}


const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
     // borderColor:'red',
     // borderWidth:1,
      paddingHorizontal: 24,
      justifyContent:'space-between',
      flexDirection:'row',
      width:300,
  
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
  });


export default List;
