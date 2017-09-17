import React from 'react';
import { StyleSheet, Text, View, Button, Slider } from 'react-native';
import { VictoryBar } from "victory-native";
import BubbleSort from './src/algorithms/BubbleSort';
import LinearSort from './src/algorithms/LinearSort';
import QuickSort from './src/algorithms/QuickSort';

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
      this.sortAlgorithm.next();
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

  render() {
    return (
      <View style={styles.container}>
        <VictoryBar
          data={this.state.data}
        />
        <Text>
          Speed: {Math.floor(this.state.speed * 100 / (MAX_SPEED - MIN_SPEED))}%
        </Text>
        <Slider
         style={{ width: 300 }}
         step={2}
         minimumValue={0}
         maximumValue={MAX_SPEED - MIN_SPEED}
         value={this.state.speed}
         onValueChange={val => {
           this.setState({ speed: val })
           this.resetTimer();
         }}
        />
        <Button
          title='Bubble Sort'
          onPress={this.setBubbleSort.bind(this)}
        />
        <Button
          title='Linear Sort'
          onPress={this.setLinearSort.bind(this)}
        />
        <Button
          title='Quick Sort'
          onPress={this.setQuickSort.bind(this)}
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
        backgroundColor: 'white',
    },
    chart: {
        width: 200,
        height: 200,
    },
});
