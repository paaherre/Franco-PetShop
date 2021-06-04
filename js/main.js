const app = Vue.createApp({
    data() {
        return {
            pharmacyData: [],
            toysData: [],
            cart: [],
            isCartVisible: false,

        };
    },

    created() {
        fetch('https://apipetshop.herokuapp.com/api/articulos')
            .then(res => res.json())
            .then(json => {
                this.pharmacyData = json.response.filter(e => e.tipo == "Medicamento")
                this.toysData = json.response.filter(e => e.tipo == "Juguete")
            })
    },

    methods: {
        updateCart(id, counter, name, price, stock) {
            let arrayAux = this.cart.map(e => e.id)
            if (this.cart.length > 0) {
                if (arrayAux.indexOf(id) > -1) {
                    this.cart.map((e) => {
                        if (e.id == id) {
                            e.counter += counter
                            return
                        }
                    })
                    sessionStorage.setItem("cart", JSON.stringify(this.cart))
                } else {
                    this.cart = [...this.cart, { id: id, name: name, counter: counter, price: price, stock: stock }]
                    sessionStorage.setItem("cart", JSON.stringify(this.cart))
                    return this.cart
                }
            } else {
                this.cart = [{ id: id, name: name, counter: counter, price: price, stock: stock }]
                sessionStorage.setItem("cart", JSON.stringify(this.cart))
                return this.cart
            }
        },
        removeFromCart(product) {
            this.cart = this.cart.filter(e => e.id !== product.id)
            if (this.cart.length > 0) {
                sessionStorage.setItem("cart", JSON.stringify(this.cart))
            } else {
                sessionStorage.setItem("cart", JSON.stringify([]))
            }
            if (this.cart.length < 1) {
                this.isCartVisible = false
                sessionStorage.clear()
            }
        },
        onSubmitContactForm() {
            return swal({
                title: "Enviaste tus comentarios",
                text: "Muchas gracias por escribirnos",
                icon: "success",
                button: "Gracias Vuelvas Prontos",
            });
        }

    },
    computed: {
        updateCartCounter() {
            if (JSON.parse(sessionStorage.getItem("cart"))) {
                this.cart = JSON.parse(sessionStorage.getItem("cart"))
            }
            let cartCounter = 0
            if (this.cart.length > 0) {
                this.cart.map(e => {
                    cartCounter += e.counter
                })
            }
            return cartCounter
        },
        cartTotal() {
            let total = 0
            this.cart.forEach(e => total += (e.price * e.counter))
            return total
        },
        getCart() {
            if (JSON.parse(sessionStorage.getItem("cart"))) {
                this.cart = JSON.parse(sessionStorage.getItem("cart"))
                return true
            } else {
                return false
            }
        }
    }
})


/*
descripcion: "Power Ultra Pipeta controla y previene la infestación por pulgas y garrapatas en la mascota. Mata en forma instantánea pulgas y garrapatas, protegiendo a su mascota por 30 días. Corta el ciclo de pulgas eliminándolas antes de que se reproduzcan."
imagen: "https://puppis.vteximg.com.br/arquivos/ids/157833-1000-1000/Power-Ultra.jpg?v=635852684254630000"
nombre: "Power Ultra ( 1 Pipeta )"
precio: 329
stock: 1
tipo: "Medicamento"
__v: 0
_id: "5f20f56454c7bc0017856c84"
*/