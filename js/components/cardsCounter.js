app.component('cards-counter', {
    props: {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true,
        },
        stock: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    },
    template:
        /*html*/
        `<div>
            <div class="prodCounterButtons">
                <button class="➕" @click="prodCounter--" :disabled="!prodCounter"> - </button> 
                <span >{{prodCounter}}</span> 
                <button class="➕" @click="prodCounter++" :disabled="this.stock == this.prodCounter"> + </button>
            </div>
            <div class="d-flex justify-content-center">
                <button class="addToCart" @click="addToCart" :disabled="!prodCounter"> Añadir al Carrito </button>
            </div>
        </div>
    `,
    data() {
        return {
            prodCounter: 0,
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.id, this.prodCounter, this.name, this.price, this.stock)
            this.prodCounter = 0
        },
    }
})