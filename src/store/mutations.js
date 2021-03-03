const store = new Vuex.Store({
    state: {
        product: 1
    },
    mutations: {
        addProduct(product) {
            state.product.push(product);
        }
    }
})