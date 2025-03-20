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


    return (<aside class={`product-card position-relative ${ props.displayStyle === 2 ? "d-flex gap-2 justify-content-between align-items-center p-2" : "card p-1" }`}>

        <Show when={ props.discount && props.discount > 0}>
            <small style="width:fit-content;z-index:1" class="position-absolute text-pacifico start-0 top-0 p-2 text-bg-primary rounded-2">
            - {props.discount } %
            </small>
        </Show>

        <div class={props.displayStyle === 2 ? "col-4 col-lg-5" : "col"}>
            <img style="height: 220px;" src={`/images/products/${props.images[0]}`} alt={`${props.name}`} class="card-img-top rounded-2 ratio ratio-2x1 object-fit-contain" />
        </div>

        <div  class="card-body col lh-sm">
            
            <a href={`/shop/${props.category}/${props.id}`}>
                <h6 class="card-title">{props.name}</h6>
                <p class="card-text text-muted nav justify-content-between">
                    <span>{props.category}</span>
                    <span class="text-success">${props.price}</span>
                </p>
                <Show when={props.displayStyle == 2}>
                    
                    <p class="mt-3">
                        <b>Description</b> <br/>
                        {props.description ?? "ooopps someting went wrong"}
                    </p>
                </Show>
            </a>

            <div class={ `nav  gap-2 ${props.displayStyle == 1 ? "options position-absolute" : "" }`}>
                <button class="btn bg-body shadow-sm">
                    <i class="bi bi-handbag"></i>
                </button>

                <button class="btn bg-body shadow-sm">
                    <i class="bi bi-stars"></i>
                </button>
            </div>
        </div>

        
    </aside>);
}


