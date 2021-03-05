import { mount } from "@vue/test-utils";
import AddProduct from "@/views/AddProduct.vue";
import { createCommonPageFunctions, createVueTestFixture } from "../test-helpers";
import Vue from "vue/types/vue";
import { isEqual } from "lodash";

describe("When Apothica wants to add a product", () => {
    it("should set the product in state", () => {
        const page = AddProductPage()
        page.typeInField("data-prroduct-title", "ZAZA");
        page.typeInField("data-product-description", "THE GOOD STUFF");
        page.enterStockNumber()
    })
})

const AddProductPage = () => {
    const { localVue, mockRouter, mockStore, testConfig } = createVueTestFixture((testConfig) => {

    })

    const commmonFunctions = createCommonPageFunctions(wrapper)
    return {
        ...commmonFunctions,
        "enterStockNumber": (wrapper) => {
            wrapper.find("[data-stock-number]").trigger("click")

            console.log("WRAPPER", wrapper.html())
        }

    }




    const wrapper = mount(AddProduct, {
        localVue,
        store: mockStore,
        mocks: {
            $router: mockRouter,
            $route: {
                name: "AddProduct"
            }
        }
    })
}