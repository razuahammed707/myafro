import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { Button } from 'react-native-elements'

const BottomDrawer = () => {
    const [show, setShow] = useState(false)
  return (
    <View>
     <Button title="Hair Type" onPress={() => setShow(true)}></Button>
     <BottomSheet />
    </View>
  )
}

export default BottomDrawer

const styles = StyleSheet.create({})