import {State} from "./state";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations"
import createPersistedState from "vuex-persistedstate";

export default {
    state: new State(),
    getters,
    mutations,
    actions,
    plugins: [createPersistedState({storage: window.sessionStorage})]
}