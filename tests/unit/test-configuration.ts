import { State } from "../../src/store/state";
import mutations from "../../src/store/mutations";
import actions from "../../src/store/actions";
//need to set up getters

export default () => ({
    state: new State(),
    mutations,
    actions,
    //getters
})