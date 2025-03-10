import { useStore } from "@nanostores/solid";
import { createMemo, type JSX } from "solid-js";
import { page } from "src/stores/users";

interface Props {
    size: number
}

function SearchNav(props:Props): JSX.Element {

    const $page = useStore(page);

    const seen = createMemo(() => {
        if ( props.size < 1) return 0;
        const b:number = parseInt($page().page)  * parseInt($page().size) + parseInt($page().size);
        const limit:number = props.size;
        if ( b > limit ) return  b%limit;
        return b;
    })


    return (<nav class="nav justify-content-between fw-semibold align-items-center gap-2">
        <p>{seen()} of  {props.size} items</p>

        <p class="d-flex align-items-center">
            sort by:
            <select style="max-width: 90px;" name="sort" class="bg-body-tertiary rounded-0 border-0 smaller border-bottom form-select">
                <option value="price">Price</option>
                <option value="popularity">popularity</option>
            </select>
        </p>

    </nav>)
}

export default SearchNav;
