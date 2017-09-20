import React from 'react';
import { StyleSheet, Text, View, Button, Slider } from 'react-native';
import { VictoryBar } from "victory-native";
import BubbleSort from './src/algorithms/BubbleSort';
import LinearSort from './src/algorithms/LinearSort';
import QuickSort from './src/algorithms/QuickSort';
import MergeSort from './src/algorithms/MergeSort';

// 0: slowest, 500: fastest
const DEFAULT_SORT_SPEED = 0;
const MAX_SPEED = 500;
const MIN_SPEED = 1;
const NUMBERS_AMOUNT = 50;

export default class App extends React.Component {
  sortAlgorithm;
  intervalId;

  componentWillMount() {
    this.state = {
      data: [],
      speed: DEFAULT_SORT_SPEED
    };
  }

  componentDidMount() {
    this.resetTimer();
  }

  resetTimer() {
    if (this.intervalId)
      clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      if (!this.sortAlgorithm)
        return;
      while (!this.sortAlgorithm.isCompleted() && !this.sortAlgorithm.next()) {

      }
      this.setState(() => {
        return {
          data: this.sortAlgorithm.getData()
        };
      });
    }, MAX_SPEED - this.state.speed);
  }

  generateRandomValues(amount) {
    values = [];
    for (var i = 0; i < amount; i++)
      values[i] = parseInt(Math.random() * 100);
    return values;
  }

  setBubbleSort() {
    this.sortAlgorithm = new BubbleSort(this.generateRandomValues(NUMBERS_AMOUNT));
    this.setState(() => {
      return {
        data: this.sortAlgorithm.getData()
      };
    });
  }

  setLinearSort() {
    this.sortAlgorithm = new LinearSort(this.generateRandomValues(NUMBERS_AMOUNT));
    this.setState(() => {
      return {
        data: this.sortAlgorithm.getData()
      };
    });
  }

  setQuickSort() {
    this.sortAlgorithm = new QuickSort(this.generateRandomValues(NUMBERS_AMOUNT));
    this.setState(() => {
      return {
        data: this.sortAlgorithm.getData()
      };
    });
  }

  setMergeSort() {
    this.sortAlgorithm = new MergeSort(this.generateRandomValues(NUMBERS_AMOUNT));
    this.setState(() => {
      return {
        data: this.sortAlgorithm.getData()
      };
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={styles.title}>
          sort algorithms
        </Text>
        <VictoryBar
          data={this.state.data}
          style={ { data: { fill: '#ff66cc' } }}
        />
        <Text
          style={styles.text}>
          Speed: {Math.floor(this.state.speed * 100 / (MAX_SPEED - MIN_SPEED))}%
        </Text>
        <Slider
          maximumTrackTintColor='white'
          minimumTrackTintColor='#ff66cc'
          style={{ width: 300 }}
          step={2}
          minimumValue={0}
          maximumValue={MAX_SPEED - MIN_SPEED}
          onValueChange={val => {
            this.setState({ speed: val })
            this.resetTimer();
          }}
        />
        <Button
          color='#ff66cc'
          title='bubble sort'
          onPress={this.setBubbleSort.bind(this)}
        />
        <Button
          color='#ff66cc'
          title='linear sort'
          onPress={this.setLinearSort.bind(this)}
        />
        <Button
          color='#ff66cc'
          title='quick sort'
          onPress={this.setQuickSort.bind(this)}
        />
        <Button
          color='#ff66cc'
          title='merge sort'
          onPress={this.setMergeSort.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#222',
        paddingTop: 50
    },
    title: {
      color: 'white',
      fontSize: 20,
      fontWeight: '900'
    },
    text: {
      color: 'white'
    }
});
