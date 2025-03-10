
import { persistentAtom, persistentMap } from "@nanostores/persistent";
import { atom, map, onMount } from "nanostores"

export type SearchDetails = {
    page: string;
    size: string;
    sortBy: "popularity"|"price";
    brands: string;
    category: string;
}

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

export const page = persistentMap<SearchDetails>("page:",{
    page: "0",    
    size: "12",
    sortBy: "popularity",
    brands:"",
    category:""
});

export const changeData = (a:"category"|"size"|"page"|"sortBy"|"brands", b:string ) => page.setKey(a,b);


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

    const toast = document.createElement("div");
    toast.className = `toast align-items-center border-0 show shadow-lg ${a.type == "danger" ? "text-bg-danger" : a.type =="warning" ?"text-bg-warning" : "text-bg-primary"}`;
    toast.role = "alert";
    toast.ariaAtomic = "true";
    toast.id = "toast";

    let iClass = `fs-4 me-2 bi  bi-${a.type == "danger" ? "emoji-grimace" : a.type =="warning" ?"emoji-smile-upside-down" : "emoji-wink"}`

    const innertoast = document.createElement("div");
    innertoast.innerHTML = `<i class="${iClass}"></i> ${a.message}`;
    innertoast.className ="toast-body d-flex gap-2 text-monospace"

    // const btn = document.createElement("button");
    // btn.className = "btn-close btn-close-white me-2 m-auto"
    // btn.setAttribute("bs-dismiss","toast")
    // btn.ariaLabel = "close";

    toast.append(innertoast);
    // toast.append(btn);

    document.body.append(toast);

    setTimeout(()=>{
        document.body.removeChild(toast);
    }, 5000)

}