import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AirbnbRating } from 'react-native-elements'
import tw from 'twrnc'

const Feedback = () => {
  return (
    <View style={tw`flex justify-between`}>
    <View
      style={tw`py-4 flex flex-row justify-between border-gray-200 border-t-2 px-5`}
    >
      <View style={tw`flex flex-row`}>
        <Image
          style={{
            width: 36,
            height: 36,
          }}
          source={require("../../../../assets/img/a2.png")}
          resizeMode="contain"
        />
        <View style={tw`ml-4 w-60`}>
          <View>
            <Text style={tw`font-bold text-xl mr-2`}>Theresa Webb</Text>
            <Text style={tw`text-gray-400`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci,
              consequat sem molestie et, montes, pellentesque. Id.
            </Text>
          </View>
          <View style={tw`flex flex-row`}>
            <AirbnbRating
              count={5}
              reviewSize={0}
              defaultRating={5}
              size={13}
              starContainerStyle={{
                marginTop: -20,
                marginRight: 5,
              }}
            />
          </View>
        </View>
      </View>
      <View>
        <Text style={tw`text-gray-400`}>2 months ago</Text>
      </View>
    </View>
  </View>
  )
}

export default Feedback

const styles = StyleSheet.create({})