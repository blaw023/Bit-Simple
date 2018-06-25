import React, {Component} from 'react';
import axios from 'axios';
import {Label, Icon, SegmentGroup, Segment} from 'semantic-ui-react';
import NumberFormat from 'react-number-format';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {updateCryptoGlobalData} from '../../redux/actions/action-crypto-global-data';


class CryptoGlobalData extends Component{
    constructor(props) {
        super(props);
        this.state = {
            cryptoExchangeData : this.props.CryptoGlobalData || {}
        }
    };

    componentDidMount() {
        if(!this.state.cryptoExchangeData.data) {
            axios.get(`https://api.coinmarketcap.com/v2/global/?convert=USD`)
                .then(resp => {
                    this.setState({cryptoExchangeData: resp.data});
                    this.props.updateCryptoGlobalData(resp.data);
                }).catch(function (error) {
                throw error;
            });
         }
    }

    render() {
        const {cryptoExchangeData} = this.state;

        if(cryptoExchangeData.data) {
            return (
                 <SegmentGroup horizontal>
                    <Segment>
                            <Label size="large">
                                <Icon name="chain"/>Active currencies:
                                <Label.Detail>{cryptoExchangeData.data.active_cryptocurrencies}</Label.Detail>
                            </Label>
                    </Segment>
                      <Segment>
                            <Label size="large">
                                <Icon name="in cart"/>Active markets:
                                <Label.Detail>{cryptoExchangeData.data.active_markets}</Label.Detail>
                            </Label>
                      </Segment>
                      <Segment>
                            <Label size="large">
                                <Icon name="money"/>24 Hour Volume:
                                <Label.Detail>
                                    <NumberFormat
                                        value={cryptoExchangeData.data.quotes.USD.total_volume_24h}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'$'} />
                                </Label.Detail>
                            </Label>
                      </Segment>
                      <Segment>
                            <Label size="large">
                                <Icon name="money" /> Market Cap:
                                <Label.Detail>
                                    <NumberFormat
                                        value={cryptoExchangeData.data.quotes.USD.total_market_cap}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'$'} />
                                </Label.Detail>
                            </Label>
                      </Segment>
          </SegmentGroup>
            )
        }

        return (
          <div></div>
        )
    }
}

function mapStateToProps(state) {
    return {
        CryptoGlobalData: state.CryptoGlobalData
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({updateCryptoGlobalData: updateCryptoGlobalData}, dispatch);}

export default connect(mapStateToProps, mapDispatchToProps)(CryptoGlobalData);
