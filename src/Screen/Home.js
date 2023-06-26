import { View, Text ,StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { songs } from '../MusicData'
import MusicListItem from '../Common/MusicListItem'
import { StatusBar } from 'expo-status-bar'

const Home = () => {
  return (
     <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.header}>
               <Text style={styles.logo}>Music App</Text>
        </View>
        <FlatList data={songs} renderItem={({item , index,data})=>{
            return <MusicListItem item={item} index={index} data={songs} />;
        }}/>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    header:{
        width:'100%',
        height:60,
        backgroundColor:'#fff',
        elevation:5,
        justifyContent:'center'
    },
    logo:{
        fontSize:23,
        fontWeight:'700',
        color:'red',
        marginHorizontal:40
    }
})