import { createEffect, createSignal, onMount } from "solid-js";


type searchQuery = {
  category : string;
  price : string[];
  promo ?: string ;
  brands?: string[];
}

const FilterProducts = () => {

  const [query, setQuery] = createSignal<searchQuery>();

  onMount(() => {
    const details:any = Object.fromEntries(new URLSearchParams(window.location.search));
    setQuery({ 
      category : details.category ?? "",
      price : [details.minP, details.maxP],
      promo : details.promo ?? 'off' ,
      brands: details.brands
    });
  });

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const dataObj = Object.fromEntries(formData.entries());
    const goTO = new URLSearchParams(dataObj as {}).toString();
    window.location.href = "/shop?page=1&size=12&" + goTO;
  }

  return (<form onSubmit={handleSubmit} class="d-flex flex-column gap-3 p-2 shadow-sm border rounded-2">


    <div class="p-2">
      <h6 class="border-bottom pb-2">All Categories</h6>
      {['1', '2', '3', '4'].map((catego) => <small class="small">
        <input type="radio" class="btn-check" name="category" id={catego} value={catego} checked={ query()?.category == catego } />
        <label class="btn p-1 text-start text-swanky w-100" for={catego}>  category {catego} </label>
      </small>)}
    </div>

    <label class="form-label p-2" >
      <h6 class="border-bottom pb-2">Price Range</h6>
      <input type="range" class="form-range" name="price" />
      <small class="text-body-emphasis text-swanky fw-light">price :  $0 - $120</small>
    </label>

    <label class="form-label p-2">
      <h6 class="border-bottom pb-2">Brands</h6>
      {[1, 2, 3, 4].map(brand => <a>
        <input type="checkbox" class="btn-check" name={"brand" + brand} autocomplete="off" checked={false} />
        <label class="btn" for="option5"> Icon {brand}</label>
      </a>)}
    </label>

    <div class="p-2">

      <h6 class="border-bottom pb-2">Others:</h6>

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
