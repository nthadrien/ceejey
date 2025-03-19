import type { JSXElement } from "solid-js";

interface Props {
    id: string | number;
    name: string;
    price: number | string;
    images:string[]
    category: string;
    brand: string;
}

export default function ProductCard(props:Props): JSXElement {

    


    return (<div class="product-card card position-relative overflow-x-hidden">

        <div class="options d-flex flex-column gap-2 position-absolute">
            <button class="btn bg-body  shadow-lg">
                <i class="bi bi-handbag"></i>
            </button>

            <button class="btn bg-body shadow-lg">
                <i class="bi bi-stars"></i>
            </button>
        </div>

        <img style="height: 220px;" src={`/images/products/${props.images[0]}`} alt={`${props.name}`} class="card-img-top rounded-2 object-fit-contain" />
        <a href={`/shop/${props.category}/${props.id}`} class="card-body lh-sm">
            
            <h6 class="card-title">{props.name}</h6>
            <p class="card-text text-muted nav justify-content-between">
                <span>{props.category}</span>
                <span class="text-success">${props.price}</span>
            </p>
        </a>
    </div>);
}


