import React,{useState,useEffect} from 'react';
import main from '../assets/main.png';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import data from '../data.json';
import Card from '../components/Card';
import Loading from '../components/Loading';
import { StatusBar } from 'expo-status-bar';
import * as Location from "expo-location";
import axios from "axios"
import {firebase_db} from "../firebaseConfig"

import {
  setTestDeviceIDAsync,
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from 'expo-ads-admob';

/* 메인 화면 */

export default function MainPage({navigation,route}) {
  console.disableYellowBox = true;

  const [state,setState] = useState([]) //기존 꿀팁 저장
  const [cateState,setCateState] = useState([]) //카테고리 선택에 따른 꿀팁 상태

  //날씨 상태
  const [weather, setWeather] = useState({
    temp : 0,
    condition : ''
  })

  const [ready,setReady] = useState(true) //상태에 따라 로딩 또는 메인 화면

  useEffect(()=>{
    setTimeout(()=>{
        //헤더의 타이틀 변경
        navigation.setOptions({
            title:'나만의 꿀팁'
        })
        firebase_db.ref('/tip').once('value').then((snapshot) => {
          console.log("파이어베이스에서 데이터 가져왔습니다!!")
          let tip = snapshot.val();
          setState(tip)
          setCateState(tip)
          getLocation()
          setReady(false) //상태 변경 -> 메인 화면 출력
        });
    },1000) //1초 뒤에 실행 

    
  },[])

  //날씨 서버 외부 API를 이용해서 현재 위치 날씨 데이터 가져오기
  const getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const locationData= await Location.getCurrentPositionAsync();
      const latitude = locationData['coords']['latitude']
      const longitude = locationData['coords']['longitude']
      const API_KEY = "cfc258c75e1da2149c33daffd07a911d";
      const result = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );

      const temp = result.data.main.temp; 
      const condition = result.data.weather[0].main
      
      console.log(temp)
      console.log(condition)

      //날씨 상태 저장
      setWeather({
        temp,condition
      })


    } catch (error) { //에러 발생 시
      Alert.alert("위치를 찾을 수가 없습니다.", "앱을 껐다 켜볼까요?");
    }
  }

    const category = (cate) => {
        if(cate == "전체보기"){ //전체 꿀팁 데이터로 상태 변경
            setCateState(state)
        }else{  //filter을 이용해서 해당 카테고리에 속하는 꿀팁만 저장
            setCateState(state.filter((d)=>{
                return d.category == cate
            }))
        }
    }

  //삼항연산자 이용, ready 상태 true -> 로딩 화면 / false -> 메인 화면 그려짐
  return ready ? <Loading/> :  (
    /*
      return 구문 안에서는 {슬래시 + * 방식으로 주석
    */
    <ScrollView style={styles.container}>
        <StatusBar style="black" />
        <Text style={styles.weather}>오늘의 날씨: {weather.temp + '°C   ' + weather.condition} </Text>
        <TouchableOpacity style={styles.aboutButton} onPress={()=>{navigation.navigate('AboutPage')}}>
          <Text style={styles.aboutButtonText}>소개 페이지</Text>
        </TouchableOpacity>
        <Image style={styles.mainImage} source={main}/>
        <ScrollView style={styles.middleContainer} horizontal indicatorStyle={"white"}>
            <TouchableOpacity style={styles.middleButtonAll} onPress={()=>{category('전체보기')}}><Text style={styles.middleButtonTextAll}>전체보기</Text></TouchableOpacity>
            <TouchableOpacity style={styles.middleButton01} onPress={()=>{category('생활')}}><Text style={styles.middleButtonText}>생활</Text></TouchableOpacity>
            <TouchableOpacity style={styles.middleButton02} onPress={()=>{category('재테크')}}><Text style={styles.middleButtonText}>재테크</Text></TouchableOpacity>
            <TouchableOpacity style={styles.middleButton03} onPress={()=>{category('반려견')}}><Text style={styles.middleButtonText}>반려견</Text></TouchableOpacity>
            <TouchableOpacity style={styles.middleButton04} onPress={()=>{navigation.navigate('LikePage')}}><Text style={styles.middleButtonText}>꿀팁 찜</Text></TouchableOpacity>
        </ScrollView>
        <View style={styles.cardContainer}>
            {/* 하나의 카드 영역을 나타내는 View */}
            {
            cateState.map((content,i)=>{
                return (<Card content={content} key={i} navigation={navigation}/>)
            })
            }
            {/* 플랫폼에 따라 다른 배너 광고 나타냄 */}
            {Platform.OS === 'ios' ? (
                <AdMobBanner
                  bannerSize="fullBanner"
                  servePersonalizedAds={true}
                  adUnitID="ca-app-pub-8819561212978097/5997924102"
                  style={styles.banner}
                />
            ) : (
                <AdMobBanner
                  bannerSize="fullBanner"
                  servePersonalizedAds={true}
                  adUnitID="ca-app-pub-8819561212978097/7119434086"
                  style={styles.banner}
                />
            )}
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginTop:50,
    marginLeft:20
  },
weather:{
    alignSelf:"flex-end",
    paddingRight:20
  },
  mainImage: {
    width:'90%',
    height:200,
    borderRadius:10,
    marginTop:20,
    alignSelf:"center"  //컨텐츠 자체가 앱에서 어떤 곳에 위치시킬지 결정 (정렬)
  },
  middleContainer:{
    marginTop:20,
    marginLeft:10,
    height:60
  },
  middleButtonAll: {
    width:100,
    height:50,
    padding:15,
    backgroundColor:"#20b2aa",
    borderColor:"deeppink",
    borderRadius:15,
    margin:7
  },
  middleButton01: {
    width:100,
    height:50,
    padding:15,
    backgroundColor:"#fdc453",
    borderColor:"deeppink",
    borderRadius:15,
    margin:7
  },
  middleButton02: {
    width:100,
    height:50,
    padding:15,
    backgroundColor:"#fe8d6f",
    borderRadius:15,
    margin:7
  },
  middleButton03: {
    width:100,
    height:50,
    padding:15,
    backgroundColor:"#9adbc5",
    borderRadius:15,
    margin:7
  },
  middleButton04: {
    width:100,
    height:50,
    padding:15,
    backgroundColor:"#f886a8",
    borderRadius:15,
    margin:7
  },
  middleButtonText: {
    color:"#fff",
    fontWeight:"700",
    textAlign:"center"  //텍스트의 현재 위치에서의 정렬 
  },
  middleButtonTextAll: {
    color:"#fff",
    fontWeight:"700",
    textAlign:"center"  //텍스트의 현재 위치에서의 정렬 
  },
  cardContainer: {
    marginTop:10,
    marginLeft:10
  },
  aboutButton: {
    backgroundColor:"pink",
    width:100,
    height:40,
    borderRadius:10,
    alignSelf:"flex-end",
    marginRight:20,
    marginTop:10
  },
  aboutButtonText: {
    color:"#fff",
    textAlign:"center",
    marginTop:10
  }


});