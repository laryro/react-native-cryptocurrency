import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

const coins = [
  {
    id: 1,
    name: 'Bitcoin',
    label: 'BTC',
  },
  {
    id: 2,
    name: 'Ether',
    label: 'ETH'
  },
  {
    id: 3,
    name: 'DevCircle',
    label: 'DEV'
  }
]

export default class App extends React.Component {
  state = {
    coins: [],
    url: 'https://api.coinmarketcap.com/v1/ticker/?limit=10'
  }

  _keyExtractor = (item, index) => `${index}: ${item.id}`;

  _renderItem = ({item}) => (
    <View style={styles.row}>
    <Text>{item.name}</Text>
    <Text>{item.symbol}</Text>
    </View>
  );

  fetchCoins = async () => {
    const response = await fetch(this.state.url);
    this.setState({
      coins: await response.json()
    })
  };

  async componentDidMount() {
    await this.fetchCoins();
  }


  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.container}
          data={this.state.coins}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingLeft: 50,
    paddingRight: 50
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  }
});
