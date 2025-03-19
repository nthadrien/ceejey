
import type { SearchQueryType } from "@components/products/search.type";
import { useStore } from "@nanostores/solid";
import { createSignal, For, onMount, type JSX } from "solid-js";
import { changeData, page } from "src/stores/users";

interface Props {
    size: number
}

export default function Pagination(props:Props): JSX.Element {

    const $page = useStore(page);

    const [query, setQuery] = createSignal<SearchQueryType>();
    
      onMount(() => {
        const details:any = Object.fromEntries(new URLSearchParams(window.location.search));
        setQuery({ 
          page : parseInt(details?.page) ?? 1,
          size: parseInt(details?.size) ?? 4,
          category: details?.category ?? "none",
          minP : parseInt(details?.minP) ?? 1,
          maxP : parseInt(details?.maxP) ?? 100,
          promo : details.promo ?? 'off' ,
        });
      });

    const perPageChange = (e:any) => changeData("size", e.target.value.toString() );
    const changePage = (e:number) => changeData("page", e.toString() );

    const pageMaps = () => {
        const numberOfPages = Math.ceil(props.size/parseInt($page().size));
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
                {item => <button onClick={_ => changePage(item)} class={`btn ${item == parseInt($page().page) ? "text-bg-primary" : ""}`}>
                    {item + 1}
                </button>}
            </For>
        </div>
    </section>
    )
}
