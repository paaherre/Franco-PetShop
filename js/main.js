const app = Vue.createApp({
    data() {
        return {
            pharmacyData: [],
            toysData: [],
            cart: [],
            isCartVisible: false,
            cardName: "",
            cardNumber: "",
            cardCvv: "",
            cardVto: "",
            cardDesc: "",
            cardMonto: "",
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
        },
        resetCard() {
            this.cardName = ""
            this.cardNumber = ""
            this.cardCvv = ""
            this.cardVto = ""
            this.cardDesc = ""
            this.cardMonto = ""
        },
        confirmarPago() {
            var url = 'http://localhost:8080/api/payment';
            var data = {
                name: this.cardName,
                number: this.cardNumber,
                cvv: parseInt(this.cardCvv),
                thruDate: "20" + this.cardVto.replace("/", "-") + "-29",
                description: "Franco Petshop - " + this.cardDesc,
                amount: parseInt(this.cardMonto)
            };
            fetch(url, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!                
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                /* .then(res => console.log(res.json())) */
                /*.then(response => alert(data.response))*/
                .then(res => {
                    console.log(res.status)
                    if (res.status == 200 || res.status == 202) {
                        return swal('Pago procesado correctamente', res.status)
                    }
                    return swal('No se pudo procesar el pago')
                })
                .catch(error => alert(data.error))
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
        },

    }
})

