import React, {Component} from 'react';
import {Table, Menu, Icon, Input, Dropdown, Popup} from 'semantic-ui-react';
import {CoinDetails} from "../TableDetails/coinDetails";
import axios from "axios";
import _ from "lodash";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {updateCryptoTableData} from '../../redux/actions/action-crypto-table-data';


export class CryptoTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : this.props.CryptoTableData || [],
            activeItem : "1",
            tableDataPerPage: this.props.CryptoTableData || [],
            filteredSearch: null,
            column: null,
            direction: "ascending"
        };
    };

    componentDidMount() {
      let prodApiUrl = 'http://bitsimple.rfportergreen.com/api/';
      //let devApiUrl = 'http://127.0.0.1:8000/api/';

      if(this.state.data.length < 1) {
          axios.get(prodApiUrl)
              .then(resp => {
                  let coins = _.clone(resp.data);
                  this.setState({tableDataPerPage: coins.splice(0, 10), data: resp.data});
                  this.props.updateCryptoTableData(resp.data);
              }).catch(function (error) {throw error;});
      } else {
            let coinDetails = _.clone(this.state.data);
            this.setState({tableDataPerPage: coinDetails.splice(0, 10)});
      }
    }

    filter = (e) => {
        this.setState({filteredSearch : e.target.value});
    };

    handlePaginationClick = (e, { name }) => {
        this.setState({ activeItem: name });
        let coinsToSplice = _.clone(this.state.data);

        switch(name) {
            case "1":
                this.setState({tableDataPerPage : _.clone(coinsToSplice.splice(0, 10))});
                break;
            case "2":
                this.setState({tableDataPerPage : _.clone(coinsToSplice.splice(10, 10))});
                break;
            case "3":
                this.setState({tableDataPerPage : _.clone(coinsToSplice.splice(20, 10))});
                break;
            case "4":
                this.setState({tableDataPerPage : _.clone(coinsToSplice.splice(30, 10))});
                break;
            case "5":
                this.setState({tableDataPerPage : _.clone(coinsToSplice.splice(40, 10))});
                break;
            default:
                break;
        }
    };

    handleSort = clickedColumn => () => {
         const {column, tableDataPerPage, direction } = this.state;

          if (column !== clickedColumn) {
              this.setState({
                column: clickedColumn,
                tableDataPerPage: _.sortBy(tableDataPerPage, [clickedColumn]),
                direction: 'ascending'
              });
              return;
          }

        this.setState({
          tableDataPerPage: tableDataPerPage.reverse(),
          direction: direction === 'ascending' ? 'descending' : 'ascending',
        });

    };

    getSelectedCurrency = (e, currencyType) => {
        if(currencyType.value === 'USD') {
            let coins = _.clone(this.props.CryptoTableData);
            this.setState({data: this.props.CryptoTableData, tableDataPerPage: coins.splice(0, 10)});
        } else {
            axios.get(`https://api.coinmarketcap.com/v1/ticker/?convert=${currencyType.value}&limit=50`)
                .then(resp => {
                    let coinData = _.clone(resp.data);
                    this.setState({data: resp.data, tableDataPerPage: coinData.splice(0, 10)});
                    this.mountNewCurrencyObjectToCoinData(currencyType.value);
                }).catch(error => {
                    console.log(error);
            });
        }
    };

    mountNewCurrencyObjectToCoinData = (currencyType) => {
        let storeNewCurrencyData = [];

        if(currencyType === "BTC") {
            this.state.data.forEach(coinData => {
                coinData.currencyType = currencyType;
                coinData.price = coinData[Object.keys(coinData)[5]];
                coinData.market_cap = coinData[Object.keys(coinData)[8]];
                coinData.volume_24hr = coinData[Object.keys(coinData)[15]];
                coinData.change_1hr = coinData[Object.keys(coinData)[11]];
                coinData.change_24hr = coinData[Object.keys(coinData)[12]];

                storeNewCurrencyData.push(coinData);
            });
        } else {
            this.state.data.forEach(coinData => {
                coinData.currencyType = currencyType;
                coinData.price = coinData[Object.keys(coinData)[15]];
                coinData.market_cap = coinData[Object.keys(coinData)[17]];
                coinData.volume_24hr = coinData[Object.keys(coinData)[16]];
                coinData.change_1hr = coinData[Object.keys(coinData)[11]];
                coinData.change_24hr = coinData[Object.keys(coinData)[12]];

                storeNewCurrencyData.push(coinData);
            });
        }

        this.setState({data: storeNewCurrencyData});
    };


    render() {
        let coins =  this.state.tableDataPerPage;
        let activeItem = this.state.activeItem;
        let allCoins = this.state.data;
        const{column, direction} = this.state;


        if(this.state.filteredSearch) {
            allCoins = allCoins.filter(coin =>
                coin.name.toLowerCase()
                    .includes(this.state.filteredSearch.toLowerCase()));

            coins = allCoins;
        } else
            coins = this.state.tableDataPerPage;

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col col-md-6">
                            <Input
                                icon="search"
                                placeholder="Search By Coin Name..."
                                onChange={this.filter}/>
                     </div>
                    <div className="col col-md-6">
                        <Popup trigger={<Dropdown placeholder="USD" search selection options={currencyList}
                            onChange={(e, data) => {this.getSelectedCurrency(e, data)}}/>} wide inverted>
                            Based on coinmarketcap traffic, data may be slow to return.</Popup>
                    </div>
                </div>
             <br/>

            <Table singleLine sortable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell
                            sorted={column === 'rank' ? direction : null}
                            onClick={this.handleSort('rank')}>
                            Rank
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={column === 'name' ? direction : null}
                            onClick={this.handleSort('name')}>
                            Name
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={column === 'symbol' ? direction : null}
                            onClick={this.handleSort('symbol')}>
                            Symbol
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={column === 'market_cap' ? direction : null}
                            onClick={this.handleSort('market_cap')}>
                            Market Cap
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={column === 'price' ? direction : null}
                            onClick={this.handleSort('price')}>
                            Price
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={column === 'volume_24hr' ? direction : null}
                            onClick={this.handleSort('volume_24hr')}>
                            Volume(24hr)
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={column === 'change_1hr' ? direction : null}
                            onClick={this.handleSort('change_1hr')}>
                            Change(1hr)
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={column === 'change_24hr' ? direction : null}
                            onClick={this.handleSort('change_24hr')}>
                            Change(24hr)
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                    {coins.map(coin =>
                        <CoinDetails key={coin.name} mappedCoin={coin}/>)}
                <Table.Footer>
                     <Table.Row>
                        <Table.HeaderCell colSpan='9'>
                          <Menu pagination color="blue">
                            <Menu.Item as='a' icon>
                              <Icon name='left chevron' />
                            </Menu.Item>
                            <Menu.Item name='1' active={activeItem === '1'} onClick={this.handlePaginationClick} />
                            <Menu.Item name='2' active={activeItem === '2'} onClick={this.handlePaginationClick} />
                            <Menu.Item name='3' active={activeItem === '3'} onClick={this.handlePaginationClick} />
                            <Menu.Item name='4' active={activeItem === '4'} onClick={this.handlePaginationClick} />
                            <Menu.Item name='5' active={activeItem === '5'} onClick={this.handlePaginationClick} />
                            <Menu.Item as='a' icon>
                              <Icon name='right chevron' />
                            </Menu.Item>
                          </Menu>
                        </Table.HeaderCell>
                      </Table.Row>
                </Table.Footer>
            </Table>
          </div>
        )
    }
}

const currencyList = [
    {key: "USD", value: "USD", text: "USD"},
    {key: "BTC", value:"BTC", text: "BTC"},
    {key: "XRP", value:"XRP", text: "XRP"},
    {key: "LTC", value: "LTC", text: "LTC"},
    {key: "BCH", value: "BCH", text: "BCH"}

];


function mapStateToProps(state) {
    return {
        CryptoTableData: state.CryptoTableData
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({updateCryptoTableData: updateCryptoTableData}, dispatch);}

export default connect(mapStateToProps, mapDispatchToProps)(CryptoTable);








