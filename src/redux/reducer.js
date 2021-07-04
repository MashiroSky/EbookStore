export default function Reducer(preState, action) {
    const {type, data} = action
    switch (type) {
        case "Login":
            return {user:data}
        case "Logout":
            return {user:null}
        default:
            return {user:null}
    }
}