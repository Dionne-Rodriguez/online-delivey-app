import * as types from "@/js/types";
import { State } from "@/store/state";
import subject from"@/store/mutations";

describe("mutations", () => {
    let state: State;

    beforeEach(() => (state = new State()))

    describe("setProduct", () => {
        let product: types.product
        beforeEach(() => {
             product = [{ 
                 title: "product-title",
                description: "product-description",
                stock: 50
            }]
            subject.addProduct(state, [product])
        })
        it("sets the added product", () => {
            expect(state.product).toEqual(product)
        })
    })
})