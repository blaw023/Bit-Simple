export default function(state = null, action) {
    switch(action.type) {
        case "CRYPTO-TABLE-DATA":
            return action.payload;
    }
    return state;
}