import { StyleSheet} from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { SafeAreaView } from 'react-native-safe-area-context'
import Booking from './Booking'

const ActiveBookings = () => {
  return (
    <SafeAreaView style={tw`px-5 h-full`}>
      <Booking />
      <Booking margin="mt-5"/>
      <Booking margin="mt-5"/>
      <Booking margin="mt-5"/>
      <Booking margin="mt-5"/>
    </SafeAreaView>
  )
}

export default ActiveBookings

const styles = StyleSheet.create({})