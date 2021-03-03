import {mount, Wrapper } from "@vue/test-utils";
import AddProduct from "@/views/AddProduct.vue"
import { createCommonPageFunctions, createVueTestFixture } from "../test-helpers";
import Vue from "vue/types/vue";
import {isEqual} from  "lodash";

const AddProductPage = () => {
const {localVue, mockRouter, mockStore, testConfig} = createVueTestFixture((testConfig) => {

})

const wrapper: Wrapper<Vue> = mount(AddProduct, {
    localVue,
    store: mockStore,
    mocks: {
        $router: mockRouter,
        $route:{
            name: "AddProduct"
        }
    }
})
}