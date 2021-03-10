import { State } from '../store/state';
import * as types from "../js/types";
import Vue from "vue"

export default {
    setProduct(state: State, product: types.product[]) {
        console.log(product)
        Vue.set(state, "product", product)
    }
}