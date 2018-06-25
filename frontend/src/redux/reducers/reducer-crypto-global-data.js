export default function(state = null, action) {
    switch(action.type) {
        case "CRYPTO-GLOBAL-DATA":
            return action.payload;
    }
    return state;
}