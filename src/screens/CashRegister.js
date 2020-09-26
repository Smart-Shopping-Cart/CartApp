import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {Table, TableWrapper, Row} from 'react-native-table-component';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import BackButton from '../components/BackButton';

export default class ExampleThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['I.Desc', 'Price'],
      tableB: ['Items', '', 'Sum', ''],
      widthArr: [80, 80],
      numberOfProdcuts: '',
      dataSource: [],
    };
  }

  onRead = () => {
    this.props.navigation.navigate('HomeScreen');
  };

  componentDidMount() {
    return fetch('localhost:8080/products', {
      method: 'POST',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOiI1ZjY3NGUzNDNjMzA4ZTEwMDFkZWIzZDgiLCJjdXN0b21lcklkIjoiIiwiY3JlYXRlRGF0ZSI6IlN1biBTZXAgMjAgMTM6MjI6MjQgVVRDIDIwMjAiLCJzaG9wcGluZ0RhdGUiOiIifQ.CzNaen82Ppvcu8kq7oqs9JCe0xQpUFTdEQzg3_9yhEa-uw6DN9cPIa8usj_IwFS3h-0Id471g0I6TIW43BFrKQ',
      },
    })
      .then((response) => {
        console.log(response.status);
        return response.json();
      })
      .then((responseJson) => {
        console.log(responseJson);

        this.setState({
          dataSource: responseJson,
          isLoading: false,
          numberOfProdcuts: Object.keys(responseJson).length,
        });
        console.log(this.state.numberOfProdcuts);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const tableData = [];
    for (let i = 0; i < parseInt(this.state.numberOfProdcuts); i += 1) {
      const rowData = [];
      for (let j = 0; j < 2; j += 1) {
        rowData.push(`${i}${j}`);
      }
      tableData.push(rowData);
    }

    return (
      <Background>
        <BackButton goBack={() => onRead} />
        <Logo />
        <View style={styles.container}>
          <ScrollView horizontal={true}>
            <View>
              <Table borderStyle={{borderColor: '#C1C0B9'}}>
                <Row
                  data={this.state.tableHead}
                  widthArr={this.state.widthArr}
                  style={styles.header}
                  textStyle={styles.text}
                />
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{borderColor: '#C1C0B9'}}>
                  {tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={this.state.widthArr}
                      style={[
                        styles.row,
                        index % 2 && {backgroundColor: '#F7F6E7'},
                      ]}
                      textStyle={styles.text}
                    />
                  ))}
                </Table>
              </ScrollView>
              <Table borderStyle={{borderColor: '#C1C0B9'}}>
                <Row
                  data={this.state.tableB}
                  widthArr={this.state.widthArr}
                  style={styles.header}
                  textStyle={styles.text}
                />
              </Table>
            </View>
          </ScrollView>
        </View>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  table: {margin: 10},
  data: {margin: 10},
  header: {height: 50},
  text: {textAlign: 'center', fontWeight: '100'},
  dataWrapper: {marginTop: -1},
  row: {height: 40},
});
