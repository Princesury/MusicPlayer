import { View, Text, TouchableOpacity , Dimensions, StyleSheet,Image} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


const {height,width} = Dimensions.get('window')
const MusicListItem = ({item,index,data}) => {
    const navigation =useNavigation();
  return (
    
    <TouchableOpacity style={[styles.container,
    {
        marginBottom: index==data.length -1 ?30:0
    },
    ]}  
    onPress={()=>{
      navigation.navigate('Music',{

        data:item,
        index:index,
      })
    }}
    >
    <Image source={item.image} style={styles.songImage}  /> 
    <View style={styles.nameView}>
         <Text style={styles.name}>{item.title}</Text>
         <Text style={styles.name}>{item.singer}</Text>
    </View>
    <TouchableOpacity>
        <Image source={require('../images/play.png')} style={styles.playimg}/>
    </TouchableOpacity>
    </TouchableOpacity>
    
  )
}

export default MusicListItem


const styles =StyleSheet.create({
    container:{
        width:width-40,
        height:70,
        elevation:5,
        marginTop:20,
        alignSelf:'center',
        backgroundColor:'#fff',
        borderRadius:10,
        alignItems:'center',
        flexDirection:'row'
    },
    songImage:{
        width:90,
        height:60,
        borderRadius:10,
        marginLeft:5,
        margin:5
    },
    nameView:{
  paddingLeft:15,
  width:'50%'
    },

    name:{
        fontSize:20,
        fontWeight:'600',
        color:'#000'
    },
    playimg:{
        height:30,
        width:25
    }
})