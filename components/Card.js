import React, { useEffect } from 'react';
import {View, Image, Text, StyleSheet,TouchableOpacity} from 'react-native'
import {
  setTestDeviceIDAsync,
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from 'expo-ads-admob';

/* 메인 화면의 꿀팁 데이터 카드 */

//MainPage로 부터 받아온 content, navigation 속성
export default function Card({content,navigation}){

    useEffect(()=>{
        //외부 API (Admob) 이용 -> 실행 순서를 지키기위해 async/await 사용
        Platform.OS === 'ios' ? AdMobInterstitial.setAdUnitID("ca-app-pub-8819561212978097/2915152110") : AdMobInterstitial.setAdUnitID("ca-app-pub-8819561212978097/7975907105")

        AdMobInterstitial.addEventListener("interstitialDidLoad", () =>
            console.log("interstitialDidLoad")
        );
        AdMobInterstitial.addEventListener("interstitialDidFailToLoad", () =>
            console.log("interstitialDidFailToLoad")
        );
        AdMobInterstitial.addEventListener("interstitialDidOpen", () =>
            console.log("interstitialDidOpen")
        );
        AdMobInterstitial.addEventListener("interstitialDidClose", () => {
            console.log("interstitialDidClose")
            navigation.navigate('DetailPage',{idx:content.idx}) //광고가 끝나면 상세 페이지로 이동, idx 전달
        });
    },[])

    //카드 클릭 -> 광고 띄운 후 상세 페이지로 이동
    const goDetail = async () =>{
      await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
      await AdMobInterstitial.showAdAsync();
    }

    return(
        //카드를 클릭하여 상세 페이지로 이동 (onPress)
        <TouchableOpacity style={styles.card} onPress={()=>{goDetail()}}>
            <Image style={styles.cardImage} source={{uri:content.image}}/>
            <View style={styles.cardText}>
                <Text style={styles.cardTitle} numberOfLines={1}>{content.title}</Text>
                <Text style={styles.cardDesc} numberOfLines={3}>{content.desc}</Text>
                <Text style={styles.cardDate}>{content.date}</Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    
    card:{
      flex:1,
      flexDirection:"row",
      margin:10,
      borderBottomWidth:0.5,
      borderBottomColor:"#eee",
      paddingBottom:10
    },
    cardImage: {
      flex:1,
      width:100,
      height:100,
      borderRadius:10,
    },
    cardText: {
      flex:2,
      flexDirection:"column",
      marginLeft:10,
    },
    cardTitle: {
      fontSize:20,
      fontWeight:"700"
    },
    cardDesc: {
      fontSize:15
    },
    cardDate: {
      fontSize:10,
      color:"#A6A6A6",
    }
});