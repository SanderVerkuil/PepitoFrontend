import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableWithoutFeedback } from 'react-native';

export default class App extends Component {

  state = {
    pending: false,
    finished: false,
    address: null,
  }

  startReceiving = () => {
    console.log('Starting to receive shizzle!');
    this.setState({
      pending: true
    });
    setTimeout(() => {
      this.setState({
        address: 'iota://9YDL9GNKTPRZNQPADINAUEWIQGTZYOEXNIOWPZHJIVXAYTN9TDDQMNMQUSGYDLAEXNIOIGAGZJAXTJJJ9ZCPWYDWDG/?timeout_at=1571568930076&multi_use=1'
      })
    }, 200)
  }

  onMoneyReceived = () => {
    this.setState({
      address: null,
      pending: false,
      finished: true
    })
    setTimeout(() => {
      this.setState({
        finished: false
      })
    }, 4000)
  }

  renderPending = () => {
    const { address } = this.state;
    if (address === null) {
      return (<View><Text>...</Text></View>)
    }
    return (
      <TouchableWithoutFeedback onPress={this.onMoneyReceived}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 18, textAlign: 'center'}}>
            Hold the phone in front of the bottle taker
          </Text>
          <Image source={{
            uri: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURI(address)}`,
          }} style={{
            width: 150,
            height: 150,
            resizeMode: 'contain'
          }} />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  renderFinished = () => {
    return (
      <View style={{backgroundColor: '#00FF00', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 24, color: 'white', textAlign: 'center'}}>Money received!</Text>
      </View>
    )
  }

  render() {
    const { pending, finished} = this.state;

    if (pending) {
      return this.renderPending();
    }
    if (finished) {
      return this.renderFinished();
    }
    return (
      <View style={styles.container}>
        <Button onPress={this.startReceiving} title={'Return bottles'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
