import React from 'react';
import {Header, Icon, Message} from 'semantic-ui-react';
import {Jumbotron} from 'reactstrap';
import CryptoGlobalData from '../CryptoGlobalData/cryptoGlobalData';
import CryptoTable from '../CryptoTable/cryptoTable';


const cryptoHomeDisplay = () => {
        return (
            <div className="container-fluid">
                <Jumbotron>
                    <Header as='h2' icon textAlign='center'>
                        <Icon name='chain'/>
                        <Header.Subheader>
                            <h2 className="display-4" color="black">Bit Simple</h2>
                        </Header.Subheader>
                        <Header.Subheader>
                            <p className="lead">Giving you the latest information on the
                                top 50 cryptocurrency coins</p>
                        </Header.Subheader>
                    </Header>
                </Jumbotron>
                <div className="row">
                    <div className="col col-md-6">
                        <Message
                            icon='hourglass end'
                            header='You should know...'
                            list={info}
                        />
                    </div>
                    <div className="col col-md-6">
                       <Message
                           icon='configure'
                           header='New Features Coming Soon'
                           list={features}
                       />
                    </div>
                </div>
                <CryptoGlobalData/>
                <br/>
                <CryptoTable/>
            </div>
        );
};

const features = [
    "Cool page themes",
    "Something else"
];

const info = [
    "Data is updated every 5 minutes",
    "I had a really fun time developing this"
];

export default cryptoHomeDisplay;



