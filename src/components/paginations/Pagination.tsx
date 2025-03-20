
import type { SearchQueryType } from "@components/products/search.type";
import { For, type JSX } from "solid-js";

interface Props {
    listSize: number, // list size per pages
    info : SearchQueryType
}

export default function Pagination(props:Props): JSX.Element {

    const perPageChange: JSX.EventHandler<HTMLSelectElement , Event > = (e) => {
        const goTO = new URLSearchParams( {...props.info, size : parseInt(e.currentTarget.value), page:0 } as {}).toString();
        window.location.search = "?"+goTO;
    }

    const changePage = (e:number) => {
        const goTO = new URLSearchParams( {...props.info, page : e } as {}).toString();
        window.location.search = "?"+goTO;
    }

    const pageMaps = () => {
        const numberOfPages = Math.ceil(props.listSize/props.info.size);
        let p:number[] = [];
        for ( let j=0; j < numberOfPages ; j++ ) {
            p.push(j);
        }
        return p;
    }

    return (<section id="paginate" class="col-12 nav justify-content-between gap-2 text-swanky">

        <div class="d-flex align-items-center gap-2">
            <select onChange={perPageChange} style={"max-height:3rem;"} name="itemsPerPage" class="btn btn-sm border-0" >
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={36}>36</option>
                <option value={60}>60</option>
            </select>
            items per page
        </div>

        <div>
            <For each={pageMaps()}>
                {item => <button onClick={_ => changePage(item)} class={`btn ${item == props.info.page ? "btn-primary" : ""}`}>
                    {item + 1}
                </button>}
            </For>
        </div>
    </section>
    )
}
