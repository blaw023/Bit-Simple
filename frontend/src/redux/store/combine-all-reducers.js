import {combineReducers} from 'redux';
import CryptoGlobalData from '../reducers/reducer-crypto-global-data';
import CryptoTableData from '../reducers/reducer-crypto-table-data';

const allReducers = combineReducers({
    CryptoGlobalData: CryptoGlobalData,
    CryptoTableData: CryptoTableData
});

export default allReducers;