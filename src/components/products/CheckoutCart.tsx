import { useStore } from "@nanostores/solid"
import { createSignal, createEffect } from "solid-js";
import { shoppingCart, type CartItem, deleteCartItem, addToCart } from "src/stores/users";


function CheckoutCart() {
    
    const [ cart , setCart ] = createSignal<CartItem[]>([]);

    const totalItemPrice = (): number => {
        let price = 0;
        for (let x of cart()) {
            price += (parseInt(x.qty) * parseFloat(x.price));
        }
        return price;
    }

    createEffect(()=>{
        const b = useStore(shoppingCart)
        setCart( b );
    });

    const shippingPrice = 10;

    return (
    <section class="nav flex-column gap-2">
        <ul class="list-unstyled p-0">

            {cart()[0] && cart().map(item => <li class="border d-flex justify-content-between align-items-center gap-2 position-relative p-2">

                <img src={`/images/products/${item.image}`} style="height: 68px;width: 68px;" class="col-3 text-bg-dark" />

                <button onClick={() => deleteCartItem(item.id, item.color)} style="right:5px;top:0px;" class="btn btn-sm position-absolute">
                    <i class="fw-bold bi bi-x-lg text-danger"></i>
                </button>

                <div class="col-9 lh-sm">

                    <h6>{item.category}</h6>
                    <p>color/ variation : {item.color}</p>
                    <div class="d-flex justify-content-between align-items-center gap-2">
                        <span>
                            qty:
                            <button class="btn btn-sm"> - </button>
                            {item.qty}
                            <button class="btn btn-sm">+</button>
                        </span>

                        <span>price: {item.price}</span>
                    </div>
                </div>

            </li>)}

            {!cart()[0] && <p class="fs-2 text-danger text-zeyada">Your cart is empty !!!</p>}
        </ul>

        <div>
            <p>Total Items Price : ${totalItemPrice()}</p>
            <p>Shipping: {shippingPrice}</p>
            <p>Total Price:  ${totalItemPrice() + shippingPrice}</p>
        </div>

    </section>
    );
}

export default CheckoutCart
