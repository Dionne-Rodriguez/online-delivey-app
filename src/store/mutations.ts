import { State } from '../store/state';
import * as types from "../js/types";
import Vue from "vue"

export default {
    addProduct(state: State, product: types.product[]) {
        Vue.set(state, "product", product)
    }
}