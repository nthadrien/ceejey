
import { type JSX } from "solid-js";
import type { SearchQueryType } from "./search.type";

interface Props {
    size: number,
    current : SearchQueryType,
    displayStyle : number;
    changeStyle: (a:number) => void
}

function SearchNav(props:Props): JSX.Element {

    const seen = ():number => {
        const total:number = (props.current.page + 1) * props.current.size;
        const diff:number = total - props.size;
        if ( total <= props.size ) return total;
        return  total - diff;
    }

    const changeSort:JSX.EventHandler<HTMLSelectElement , Event > = (e) => {
        const goTO = new URLSearchParams( {...props.current, sortby : e.currentTarget.value  } as {}).toString();
        window.location.search = "?"+goTO;
    }

    return (<nav class="nav justify-content-between fw-semibold align-items-center gap-2 px-2">

        <div>
            {seen()} of  {props.size} items
        </div>

        <div>
            <button class={`btn btn-sm ${props.displayStyle == 1 ? "btn-outline-info" : ""}`} onclick={()=> props.changeStyle(1)}> 
                <i class="bi bi-grid-fill"></i>
            </button>
            
            <button class={`btn btn-sm ${props.displayStyle == 2 ? "btn-outline-info" : ""}`} onclick={()=> props.changeStyle(2)}> 
                <i class="bi bi-list-task"></i>
            </button>
        </div>


        <p class="d-flex align-items-center">
            

            sort by:
            <select onChange={changeSort} style="max-width: 90px;" name="sort" class="border-0 smaller form-select">
                <option value="price">Price</option>
                <option value="popularity">popularity</option>
            </select>
        </p>

    </nav>)
}

export default SearchNav;
