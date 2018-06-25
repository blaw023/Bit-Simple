export const updateCryptoTableData = (cryptTableData) => {
    return {
        type:"CRYPTO-TABLE-DATA",
        payload: cryptTableData
    }
};