import { createEffect, createSignal, onMount, type JSX } from "solid-js";

import type { SearchQueryType } from "./search.type";

interface Props {
  initial : SearchQueryType;
  brands: string[];
  categories: string[]
}

const FilterProducts = (props:Props) : JSX.Element => {

  const [query, setQuery] = createSignal<SearchQueryType>(props.initial);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const dataObj = Object.fromEntries(formData.entries());
    const goTO = new URLSearchParams(dataObj as {}).toString();
    window.location.search = "?page=1&size=12&" + goTO;
  }

  return (<form onSubmit={handleSubmit} class="d-flex flex-column gap-3 p-2 shadow rounded-1">

    <div class="p-2 rounded-2">
      <p class="border-bottom pb-2 fw-bold">All Categories</p>
      {props.categories[0] && props.categories.map((catego) => <p class="small">
        <input type="radio" class="btn-check" name="category" id={catego} value={catego} checked={ query()?.category == catego } />
        <label class="btn p-1 px-2 text-start text-swanky w-100" for={catego}> {catego} </label>
      </p>)}
      <p class="small">
        <input type="radio" class="btn-check" name="category" id="none" value="none" checked={ query()?.category == "none" } />
        <label class="btn p-1 px-2 text-start text-swanky w-100" for="none"> all categories </label>
      </p>
    </div>

    <div class="p-2 rounded-2">
      <p class="border-bottom pb-2 fw-bold">Price Range</p>
        <input type="range" class="form-range" name="minP"  min={1} max={100} />
        <p class="w-100 text-swanky text-center"> $ 1 - $ 12 </p>
    </div>

    <div class="p-2">
      <p class="border-bottom pb-2 fw-bold">Others:</p>
      <label class="form-check-label text-swanky  form-check form-switch">
        promotion
        <input class="form-check-input" type="checkbox" role="switch" name="promo" checked={ query()?.promo == 'on'} />
      </label>

    </div>

    <div class="pb-3">
      <button class="btn btn-primary" type="submit">
        <i class="bi bi-search smaller me-3"></i>
        search
      </button>
    </div>

  </form>)
}

export default FilterProducts
