import React from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'

export default function AboutPage(){
    return(
        <View style={styles.container}>
           <Text style={styles.welcomeText}>HI! 스파르타코딩 앱개발 반에 오신 것을 환영합니다</Text>
           <View style={styles.innerContainer}>
               <Image style={styles.img} source={{uri:'https://firebasestorage.googleapis.com/v0/b/sparta-image.appspot.com/o/lecture%2FaboutImage.png?alt=media&token=13e1c4f6-b802-4975-9773-e305fc7475c4'}}/>
               <View style={styles.textContainer}>
                    <Text style={styles.text1}>많은 내용을 간결하게 담아내려 노력했습니다!</Text>
                    <Text style={styles.text2}>꼭 완주하셔서 꼭 여러분 것으로 만들어가시길 바랍니다</Text>
               </View>
               <View style={styles.btnConatiner}>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btnText}>여러분의 인스타계정</Text>
                    </TouchableOpacity>
               </View>
           </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#1F266A',
        paddingLeft:50,
        paddingRight:50
    },
    welcomeText:{
        height:150,
        fontSize:30,
        fontWeight:'500',
        color:'#fff',
        marginTop:80,
        marginBottom:50
    },
    innerContainer:{
        height:'60%',
        backgroundColor:'#fff',
        borderRadius:30,
        padding:30
    },
    img:{
        flex:1,
        width:'70%',
        alignSelf:'center',
        resizeMode:'center',
        borderRadius:30
    },
    textContainer:{
        flex:1
    },
    text1:{
        textAlign:'center',
        fontSize:20,
        fontWeight:'700',
        marginBottom:30
    },
    text2:{
        textAlign:'center'
    },
    btnContainer:{
        flex:1
    },
    btn:{
        backgroundColor:'#fdc453',
        alignSelf:'center',
        borderRadius:20
    },
    btnText:{
        textAlign:'center',
        color:'#fff',
        padding:20
    }
})