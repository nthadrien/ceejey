
import { persistentAtom } from "@nanostores/persistent";
import { map } from "nanostores"

export type CartItem = {
    id: string;
    image: string;
    category: string;
    price: string;
    qty: string;
    color: string;
    max: string;
    discount?: string;
}

export const notifications = map<{ message: string, type:"success"|"warning"}[]> ([]);

//  shopping cart functionalities ----------------------------------

export const shoppingCart = persistentAtom<CartItem[]>('cart', [], {
    encode: JSON.stringify,
    decode: JSON.parse,
});

export const addToCart = (a:CartItem) => {
    const itExist = shoppingCart.get().findIndex(it => it.id == a.id && it.color == a.color );

    if( itExist < 0 ) {
        shoppingCart.set([...shoppingCart.get(), a]);
    } else {
        const newList = shoppingCart.get().splice( itExist ,1, { ...a, qty: a.qty + 1 })
        shoppingCart.set(newList);
    }
    notifyUser({ type:"success", message: `${a.category} was successfully added to cart !!!`});
}

export const deleteCartItem = (id:string,color:string) => {
    const filtered = shoppingCart.get().filter( item => item.id !== id && item.color !== color );
    shoppingCart.set(filtered);
}


// Notifiactions utilities ------------------------------------------------------------------

export type NotifyUser = {
    message: string;
    type: "success" | "danger" | "warning" 
}

export const notifyUser = (a:NotifyUser) => {

    console.log("working on adding on dom")

    const toast = document.createElement("div");
    toast.className = `d-flex gap-2 align-items-center p-2 shadow position-fixed top-50 start-50 translate-middle bg-${a.type == "danger" ? "danger" : a.type =="warning" ?"warning" : "success"}-subtle`;
    toast.role = "alert";
    toast.ariaAtomic = "true";
    toast.id = "toast";

    let iClass = `fs-5 bi bi-${a.type == "danger" ? "emoji-grimace-fill" : a.type =="warning" ?"emoji-smile-upside-down-fill" : "emoji-laughing-fill"}`

    const innertoast = document.createElement("div");
    innertoast.innerHTML = `<i class="${iClass}"></i> ${a.message}`;
    innertoast.className ="toast-body d-flex gap-2 text-monospace";
    toast.append(innertoast);
    document.body.append(toast);

    setTimeout(()=>{
        document.body.removeChild(toast);
    }, 5000);

    return;

}