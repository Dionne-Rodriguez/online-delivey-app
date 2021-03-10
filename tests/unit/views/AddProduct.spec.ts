import { mount, Wrapper } from "@vue/test-utils";
import AddProduct from "@/views/AddProduct.vue";
import { createCommonPageFunctions, createVueTestFixture } from "../test-helpers";
import {Vue} from "vue/types/vue";
import * as types from "@/js/types";





describe("When Apothica wants to add a product", () => {
    it("should call setProduct with the right parameters", async () => {
        const page = AddProductPage()
        page.answerTextQuestion("data-product-title", "Razzle Dazzle");
        page.answerTextQuestion("data-product-description", "THE GOOD STUFF");
        page.enterStockNumber(67)
        page.clickOnNextButton();
        page.waitForUpdate();
        const expectedStateUpdate: types.product = [{
            title: "Razzle Dazzle",
            description: "THE GOOD STUFF",
            stock:67
        }]
        expect(page.hasCalledSetProductWith(expectedStateUpdate)).toBeTruthy()

    })
})



const AddProductPage = () => {
    const { localVue, mockRouter, mockStore, testConfig } = createVueTestFixture((testConfig) => {

    testConfig.mutations.setProduct = jest.fn().mockName("setProduct");
        
    })

    const wrapper: Wrapper<Vue>= mount(AddProduct, {
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
        enterStockNumber: (stockNumber: Number) => {
            wrapper.find("[data-stock-number]").setValue(stockNumber)
        },
        answerTextQuestion: (questionDataId: string, answer: string | boolean) => {
                wrapper.find(`[${questionDataId}]`).setValue(answer)
              },

        hasCalledSetProductWith: (params:any) => {
            commmonFunctions.hasUpdatedStateWith(testConfig.mutations.setProduct, params)
    },


    }

}
