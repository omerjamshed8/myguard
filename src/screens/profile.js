import React from 'react';
import {View, Text, SafeAreaView, Image, ScrollView} from 'react-native';
import { Images } from 'theme';

export default function Profile() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <ScrollView>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={Images.profileIcon}
            style={{marginTop: '20%', height: 100, width: 100}}
          />
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: 'black',
              fontSize: 25,
            }}>
            Name
          </Text>
        </View>
        <View style={{marginTop: '10%'}}>
          <Text style={{color: '#2A2D4314'}}>
            ____________________________________________________
          </Text>
          <View style={{marginTop: '8%', marginLeft: '5%'}}>
            <Text style={{textAlign: 'left', color: '#2A2D43'}}>Email</Text>
            <Text
              style={{textAlign: 'left', color: '#2A2D43', fontWeight: 'bold'}}>
              abc@xyz.com
            </Text>
          </View>
          <Text style={{marginTop: '8%', color: '#2A2D4314'}}>
            ____________________________________________________
          </Text>
        </View>
        <View>
          <View style={{marginTop: '8%', marginLeft: '5%'}}>
            <Text style={{textAlign: 'left', color: '#2A2D43'}}>Phone</Text>
            <Text
              style={{textAlign: 'left', color: '#2A2D43', fontWeight: 'bold'}}>
              000-1234-567
            </Text>
          </View>
          <Text style={{marginTop: '8%', color: '#2A2D4314'}}>
            ____________________________________________________
          </Text>
        </View>
        <View>
          <View style={{marginTop: '8%', marginLeft: '5%'}}>
            <Text style={{textAlign: 'left', color: '#2A2D43'}}>Address</Text>
            <Text
              style={{textAlign: 'left', color: '#2A2D43', fontWeight: 'bold'}}>
              Address
            </Text>
          </View>
          <Text style={{marginTop: '8%', color: '#2A2D4314'}}>
            ____________________________________________________
          </Text>
        </View>
        <View>
          <View style={{marginTop: '8%', marginLeft: '5%'}}>
            <Text style={{textAlign: 'left', color: '#2A2D43'}}>City</Text>
            <Text
              style={{textAlign: 'left', color: '#2A2D43', fontWeight: 'bold'}}>
              City
            </Text>
          </View>
          <Text style={{marginTop: '8%', color: '#2A2D4314'}}>
            ____________________________________________________
          </Text>
        </View>
        <View>
          <View style={{marginTop: '8%', marginLeft: '5%'}}>
            <Text style={{textAlign: 'left', color: '#2A2D43'}}>Province</Text>
            <Text
              style={{textAlign: 'left', color: '#2A2D43', fontWeight: 'bold'}}>
              Province
            </Text>
          </View>
          <Text style={{marginTop: '8%', color: '#2A2D4314'}}>
            ____________________________________________________
          </Text>
        </View>
        <View>
          <View style={{marginTop: '8%', marginLeft: '5%'}}>
            <Text style={{textAlign: 'left', color: '#2A2D43'}}>Email</Text>
            <Text
              style={{textAlign: 'left', color: '#2A2D43', fontWeight: 'bold'}}>
              abc@xyz.com
            </Text>
          </View>
          <Text style={{marginTop: '8%', color: '#2A2D4314'}}>
            ____________________________________________________
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
