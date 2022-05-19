import * as AuthActionCreators from "./login"
import * as ContactsActionCreators from "./news"

export default {
    ...AuthActionCreators,
    ...ContactsActionCreators
}