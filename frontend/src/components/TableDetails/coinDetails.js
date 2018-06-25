import React, {Component} from 'react';
import {Table, Button, Popup, Comment, Icon, Label} from 'semantic-ui-react';
import {Modal} from 'react-bootstrap';
import axios from "axios";
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
import renderHTML from 'react-render-html';
import Draggable from 'react-draggable';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
var convert = require('xml-js');
var moment = require('moment');



export class CoinDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            showDraggableModel: false,
            showGraph: false,
            parsedFeed: [],
            historicalData: [],
            lineGraphData: [],
            coinName: null,
            activeMonth: '1 week',
            formattedNewsArticle: {
                id: null,
                title: null,
                link: null,
                published: null,
                articleCount: 0
            },
        }
    };

   /* Open/close modal for more information button */
    handleClose = () => {this.setState({show: false});};
    handleShow = () => {this.setState({show: true});};

    /* Open/close modal for graphical data */
    closeGraph = () => {this.setState({showGraph: false});};
    openGraph = () => {this.setState({showGraph: true});};

    /* Open/close modal for newsFeed button */
    closeDraggableModal = () => {this.setState({showDraggableModal : false});};
    openDraggableModal = () => {this.setState({showDraggableModal: true});};

    getRSSFeed = (coin_newsFeed) => {
       let proxyUrl = 'https://bit-simple-proxy.herokuapp.com/';
       let url = proxyUrl + coin_newsFeed;

        axios({
            method: 'GET',
            url: url
        }).then(resp => {
                let feed = convert.xml2js(resp.data);
                feed = feed.elements[0].elements;
                this.parseRSSFeedData(feed)
            }).catch(error => {
            throw error;
        })
    };

    parseRSSFeedData = (feed) => {
        /*Looking for the key tags...*/
        const id = "id";
        const name = "entry";
        const title = "title";
        const link = "link";
        const published = "published";

        let tempFeed = [];
        feed.forEach(function (f) {
            if (f.name === name) tempFeed.push(f);
        });

        this.state.formattedNewsArticle.articleCount = tempFeed.length;

        for (let i = 0; i < tempFeed.length; i++) {
            let elementLength = tempFeed[i].elements.length;
            this.state.formattedNewsArticle = {
                id: null,
                title: null,
                link: null,
                published: null,
                articleCount: tempFeed.length
            };

            for (let j = 0; j < elementLength; j++) {
                let searchForMatchId = tempFeed[i].elements[j].name;
                let searchForMatchTitle = tempFeed[i].elements[j].name;
                let searchForMatchLink = tempFeed[i].elements[j].name;
                let searchForMatchPublished = tempFeed[i].elements[j].name;

                if (searchForMatchId === id) {
                    this.state.formattedNewsArticle.id = tempFeed[i].elements[j].elements[0].text;
                }

                if (searchForMatchTitle === title) {
                    this.state.formattedNewsArticle.title = tempFeed[i].elements[j].elements[0].text;
                }

                if (searchForMatchLink === link) {
                    this.state.formattedNewsArticle.link = tempFeed[i].elements[j].attributes.href;
                }

                if (searchForMatchPublished === published) {
                    this.state.formattedNewsArticle.published = tempFeed[i].elements[j].elements[0].text;
                }

            }

            this.state.parsedFeed.push(this.state.formattedNewsArticle);
        }

        this.openDraggableModal();

    };


    getCoinHistoricalData = (e) => {
        let coinStartDate = null;
        let coinName = this.props.mappedCoin.name.replace(/ /g, '-');

        if(!e.target.id) {
           coinStartDate = moment().subtract(7, 'd').format('MM/DD/YYYY');
        } else {
            let days = e.target.id;
            coinStartDate = moment().subtract(days, 'd').format('MM/DD/YYYY');
            this.getActiveMonthForGraph(days);
        }

        let url = `https://t5l36wjn3d.execute-api.us-west-2.amazonaws.com/latest/api/history/${coinName}?start=${coinStartDate}`;
        axios.get(url)
            .then(resp => {
                this.setState({historicalData: resp.data});
                this.setGraphData();
            }).catch(error => {
                throw error;
        });
    };


    setGraphData = () => {
        let graphData = [];

        this.state.historicalData.forEach(coinDay => {
            let formattedGraphData = {
            name: null,
            coinPrice: 0,
            date: null
            };

            formattedGraphData.name = coinDay.id;
            formattedGraphData.coinPrice = coinDay.close;
            formattedGraphData.date = moment(coinDay.date).format('MM/DD/YY');
            graphData.push(formattedGraphData);
        });

        graphData.reverse();
        this.setState({lineGraphData: graphData});
        this.openGraph();
    };

    formatDifferentCurrencyMarketCap = (mappedCoin) => {
        if(mappedCoin.hasOwnProperty("currencyType")) {
            return (
                <NumberFormat
                    value={mappedCoin.market_cap}
                    displayType={'text'}
                    thousandSeparator={true}
                    decimalScale={0}
                    suffix = {' ' + mappedCoin.currencyType}
                />
            )
        } else {
            return (
                 <NumberFormat
                    value={mappedCoin.market_cap}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                />
            )
        }
    };

    formatDifferentCurrencyPrice = (mappedCoin) => {
        if(mappedCoin.hasOwnProperty("currencyType")) {
            return (
                <NumberFormat
                    value={mappedCoin.price}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={' ' + mappedCoin.currencyType}
                />
            )
        } else {
            return (
                 <NumberFormat
                    value={mappedCoin.price}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                />
            )
        }
    };

    formatDifferentCurrencyVolume = (mappedCoin) => {
        if(mappedCoin.hasOwnProperty("currencyType")) {
            return (
                <NumberFormat
                    value={mappedCoin.volume_24hr}
                    displayType={'text'}
                    thousandSeparator={true}
                    decimalScale={0}
                    suffix={' ' + mappedCoin.currencyType}
                />
            )
        } else {
            return (
                 <NumberFormat
                    value={mappedCoin.volume_24hr}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                />
            )
        }
    };

    NumberPercentIcon = (changeVal) => {
        if(changeVal > 0) {
           return (
               <div className="row">
                   <div className="col col-md-4">
                       <NumberFormat
                        value={changeVal}
                        displayType={'text'}
                        suffix={'%'}/>
                    </div>
                   <div className="col col-md-1 push-right">
                       <Icon name="arrow up" color="green"/>
                    </div>
               </div>
           )
        }
        else if(changeVal < 0) {
            return (
               <div className="row">
                   <div className="col col-md-4">
                       <NumberFormat
                        value={changeVal}
                        displayType={'text'}
                        suffix={'%'}/>
                    </div>
                   <div className="col col-md-1 push-right">
                       <Icon name="arrow down" color="red"/>
                    </div>
               </div>
            )
        }
        else {
            return (
               <NumberFormat
                value={changeVal}
                displayType={'text'}
                suffix={'%'}/>
            )
        }
    };

    getActiveMonthForGraph = (days) => {
        if (days === '30') {
            this.setState({activeMonth: '1 month'});
        } else if (days === '90') {
            this.setState({activeMonth: '3 months'});
        } else if(days === '7') {
            this.setState({activeMonth: '1 week'});
        } else {
            this.setState({activeMonth: '6 months'})
        }
    };

    render() {
        let mappedCoin = this.props.mappedCoin;
        let rssData = this.state.parsedFeed;

        return (
            <Table.Body>
                <Table.Row>
                    <Table.Cell>{mappedCoin.rank}</Table.Cell>
                    <Table.Cell>{mappedCoin.name}</Table.Cell>
                    <Table.Cell>
                        <div className="row">
                            <div className="col col-md-2">
                                {mappedCoin.symbol}
                            </div>
                            <div className="col col-md-2 push-right">
                                <Popup
                                    content={'Find out more information about ' + mappedCoin.name}
                                    trigger={<Button
                                        circular
                                        color="facebook"
                                        icon="info"
                                        size="mini"
                                        onClick={this.handleShow}
                                    />}

                                />
                            </div>
                            <div className="col col-md-2 push-right">
                                <Popup
                                    content={'Catch up on the latest news about ' + mappedCoin.name}
                                    trigger={<Button
                                        circular
                                        color="google plus"
                                        icon="newspaper"
                                        size="mini"
                                        onClick={() => this.getRSSFeed(mappedCoin.coin_newsFeed)}
                                    />}
                                />
                            </div>
                            <div className="col col-md-2 push-right">
                                <Popup
                                    content={'View graphical data for ' + mappedCoin.symbol}
                                    trigger={<Button
                                        circular
                                        color="green"
                                        icon="bar chart"
                                        size="mini"
                                        onClick={this.getCoinHistoricalData}
                                    />}
                                 />
                            </div>
                        </div>
                             <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
                                    <Modal.Dialog>
                                        <Modal.Header>
                                            <Modal.Title>{mappedCoin.name}</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>{mappedCoin.currency_detail}</Modal.Body>
                                        <Modal.Footer>
                                            <div className="col col-md-10">
                                             <i>Sources: Whitepaperdatabase.com | coincentral.com</i>
                                            </div>
                                            <Button negative onClick={this.handleClose}>Close</Button>
                                        </Modal.Footer>
                                    </Modal.Dialog>
                                </Modal>

                             <Modal show={this.state.showGraph} onHide={this.closeGraph} animation={false}>
                                <Modal.Dialog>
                                    <Modal.Header>
                                        <Modal.Title>{mappedCoin.name} Price Graph</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className="row calendarPadding">
                                            <div className="col col-md-9">
                                                <Button onClick={this.getCoinHistoricalData}
                                                        color="green" size="tiny" id="7">1 wk.</Button>
                                                <Button onClick={this.getCoinHistoricalData}
                                                        color="blue" size="tiny" id="30">1 mo.</Button>
                                                <Button onClick={this.getCoinHistoricalData}
                                                        color="yellow" size="tiny" id="90">3 mo.</Button>
                                                <Button onClick={this.getCoinHistoricalData}
                                                        color="youtube" size="tiny" id="180">6 mo.</Button>
                                            </div>
                                            <div className="col col-md-3">
                                                <Label content={this.state.activeMonth} icon='calendar' />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col col-xs-12">
                                            <LineChart width={730} height={250} data={this.state.lineGraphData}
                                                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                                  <CartesianGrid strokeDasharray="3 3" />
                                                  <XAxis dataKey="date" label={{ value: "Date", position: 'insideBottomRight', offset: -10 }} />
                                                  <YAxis label={{ value: "Price(USD)",  angle: -90, position: 'insideLeft' }} />
                                                  <Tooltip />
                                                  <Legend />
                                                  <Line type="monotone" dataKey="coinPrice" stroke="#8884d8" />
                                            </LineChart>
                                            </div>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button negative onClick={this.closeGraph}>Close</Button>
                                    </Modal.Footer>
                                </Modal.Dialog>
                             </Modal>

                                  <Draggable>
                                    <Modal className="box" show={this.state.showDraggableModal} onHide={this.closeDraggableModal}
                                           animation={false}>
                                        <Modal.Dialog>
                                            <Modal.Header>
                                                    <Modal.Title>{mappedCoin.name} Latest News</Modal.Title>
                                                    <Icon className="iconMargin" name="close"
                                                            bordered
                                                            onClick={this.closeDraggableModal}
                                                            />
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Comment.Group>
                                               <Comment>
                                                  <Comment.Content>
                                                    <div>
                                                      {rssData.map(newsItem =>
                                                        <NewsFeed key={newsItem.id} newsItem={newsItem}/>)}
                                                    </div>
                                                  </Comment.Content>
                                               </Comment>
                                                </Comment.Group>
                                            </Modal.Body>
                                             <Modal.Footer>
                                               <Icon className="iconMargin" name="close"
                                                        bordered
                                                        onClick={this.closeDraggableModal}
                                                        />
                                            </Modal.Footer>
                                        </Modal.Dialog>
                                    </Modal>
                                  </Draggable>
                        </Table.Cell>
                    <Table.Cell>
                        {this.formatDifferentCurrencyMarketCap(mappedCoin)}
                    </Table.Cell>
                    <Table.Cell>
                        {this.formatDifferentCurrencyPrice(mappedCoin)}
                    </Table.Cell>
                    <Table.Cell>
                        {this.formatDifferentCurrencyVolume(mappedCoin)}
                    </Table.Cell>
                    <Table.Cell>
                        {this.NumberPercentIcon(mappedCoin.change_1hr)}
                    </Table.Cell>
                    <Table.Cell>
                        {this.NumberPercentIcon(mappedCoin.change_24hr)}
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        )
    }
}

const NewsFeed = (props) => {
    return(
        <div>
            <div className="row">
                <div className="col col-md-1">
                    <Icon name="rss" size='small' color="yellow"/>
                </div>
                <div className="col col-md-11">
                    <a href={props.newsItem.link} target="_blank">
                     <Comment.Author as="a">{renderHTML(props.newsItem.title)}</Comment.Author>
                    </a>
                </div>
            </div>
            <br/>
            <div className="row">
                <div className="col col-md-1"></div>
                <div className="col col-md-11">
                    <Comment.Metadata>
                        Published:
                        <div>
                            <Moment format="MM/DD/YYYY">{props.newsItem.published}</Moment>
                        </div>
                    </Comment.Metadata>
                </div>
            </div>
            <hr/>
        </div>

    );
};

