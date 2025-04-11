import { Show, type JSXElement } from "solid-js";

interface Props {
    id: string | number;
    name: string;
    price: number;
    images:string[]
    category: string;
    brand: string;
    discount: number | null | undefined ;
    displayStyle ?: number;
    description : string;
}

export default function ProductCard(props:Props): JSXElement {


    return (<aside class={`product-card position-relative d-flex align-items-center gap-2 p-2 ${ props.displayStyle === 2 ? "justify-content-between" : "flex-column" }`}>

        <Show when={ props.discount && props.discount > 0}>
            <small style="width:fit-content;z-index:1" class="position-absolute text-pacifico fw-bold start-0 top-0 p-2 text-bg-primary rounded-2">
            -{props.discount }%
            </small>
        </Show>

        <div style='height:225px;' class={`bg-body-tertiary ${props.displayStyle === 2 ? "col-4 col-lg-5" : "col"}`}>
            <img style="height: 220px;" src={`/images/products/${props.images[0]}`} alt={`${props.name}`} class="rounded-0 object-fit-fill" />
        </div>

        <div  class="card-body col">
            
            <a class="lh-lg" href={`/shop/${props.category}/${props.id}`}>
                <h6 class="card-title">{props.name}</h6>
                <p class="card-text text-muted nav justify-content-between">
                    <span>{props.category}</span>
                    <span class="text-success">${props.price}</span>
                </p>

                <Show when={props.displayStyle == 2}>
                    
                    <p class="mt-3">
                        {props.description ?? "ooopps someting went wrong"}
                    </p>
                </Show>
            </a>

            <div class={ `bg-body nav gap-2 rounded-3 ${props.displayStyle == 1 ? "options position-absolute shadow" : "" }`}>

                <button title="Add to Cart" class="btn">
                    <i class="bi bi-handbag"></i>
                </button>

                <button title="Add to WishList" class="btn">
                    <i class="bi bi-stars"></i>
                </button>
            </div>
            
        </div>

        
    </aside>);
}


