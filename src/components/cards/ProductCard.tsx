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

    


    return (<div class="product-card card bg-body-tertiary rounded-0 border-0 p-1 position-relative overflow-x-hidden">

        <div class="options d-flex flex-column gap-2 position-absolute">

            <button class="btn bg-body shadow-lg rounded-pill">
                <i class="bi bi-handbag"></i>
            </button>

            <button class="btn bg-body shadow-lg rounded-pill">
                <i class="bi bi-stars"></i>
            </button>

        </div>

        <img style="height: 200px;" src={`/images/products/${props.images[0]}`} alt={`${props.name}`} class="card-img-top rounded-0 object-fit-contain" />
        <a href={`/shop/${props.category}/${props.id}`} class="card-body text-center lh-sm">
            <p class="card-subtitle smaller fw-light">{props.category}</p>
            <p class="card-title">{props.name}</p>
            <p class="card-text">${props.price}</p>
        </a>
    </div>);
}


