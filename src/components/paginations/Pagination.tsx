
import { useStore } from "@nanostores/solid";
import { For, type JSX } from "solid-js";
import { changeData, page } from "src/stores/users";

interface Props {
    size: number
}

export default function Pagination(props:Props): JSX.Element {

    const $page = useStore(page);

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


    return (<section id="paginate" class="col-12 nav justify-content-between gap-2">

        <div class="d-flex align-items-center gap-2">
            <select onChange={perPageChange} style={"max-height:3rem;"} name="itemsPerPage" class="btn btn-sm border-0" >
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={36}>36</option>
                <option value={60}>60</option>
            </select>
            items per page
        </div>

        <div class="border-top border-2">
            <For each={pageMaps()}>
                {item => <button onClick={_ => changePage(item)} class={`btn ${item == parseInt($page().page) ? "text-bg-primary" : ""}`}>
                    {item + 1}
                </button>}
            </For>
        </div>
    </section>
    )
}
