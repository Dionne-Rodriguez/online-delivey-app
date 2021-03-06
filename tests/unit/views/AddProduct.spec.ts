import { mount, Wrapper } from "@vue/test-utils";
import AddProduct from "@/views/AddProduct.vue";
import { createCommonPageFunctions, createVueTestFixture } from "../test-helpers";
import {Vue} from "vue/types/vue";
//import { isEqual } from "lodash";

const AddProductPage = () => {
    const { localVue, mockRouter, mockStore, testConfig } = createVueTestFixture((testConfig) => {
    
        
    })

    const wrapper: Wrapper<Vue>= mount(AddProduct as any, {
        localVue,
        store: mockStore,
        mocks: {
            $router: mockRouter,
            $route: {
                name: "AddProduct"
            }
        }
    })



    const commmonFunctions = createCommonPageFunctions(wrapper)
    return {
        ...commmonFunctions,
        "enterStockNumber": () => {
            wrapper.find("[data-stock-number]").trigger("click")
        }

    }

}

describe("When Apothica wants to add a product", () => {
    it("should set the product in state", () => {
        const page = AddProductPage()
        page.answerTextQuestion("data-product-title", "ZAZA");
         page.answerTextQuestion("data-product-description", "THE GOOD STUFF");
         page.enterStockNumber(67)
         page.clickOnNextButton();

        
    })
})

