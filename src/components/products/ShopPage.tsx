
import { Show, createMemo, createSignal, For, onMount, type JSX } from "solid-js";

// components tsx:
import FilterProducts from "./FilterProducts";
import SearchNav from "./SearchNav";
import ProductCard from "@components/cards/ProductCard";
import Pagination from "@components/paginations/Pagination";
import { type ShopProps, type SearchQueryType, initialQuery } from "./search.type";
import { LoadingBoxes } from "@components/loading/loading";




function ShopPage(props: ShopProps): JSX.Element {

  const [myQuery, setMyQuery] = createSignal<SearchQueryType>(initialQuery);
  const [loading, setLoading] = createSignal<boolean>(true);
  const [style, setStyle] = createSignal<number>(1);

  onMount(() => {
    const data = Object.fromEntries(new URLSearchParams(window?.location.search));
    const newOne = {
      page: data.page ? parseInt(data.page) : 0,
      size: data.size ? parseInt(data.size) : 6,
      category: data.category ? data.category : "none",
      minP: data.minP ? parseInt(data.minP) : 0,
      maxP: data.maxP ? parseInt(data.maxP) : 100,
      promo: data.promo ?? "none",
      sortby: data.sorty ?? "none"
    };
    setMyQuery(newOne)
  });

  
  const changeStyle = (a: number) => setStyle(a);

  const filteredProducts = createMemo(() => {
    const catgo = myQuery().category;
    const promo = myQuery().promo == "on" ? true : false;
    const minPrice = (myQuery().minP);
    const maxPrice = (myQuery().maxP);
    new Promise(r => setTimeout(() => setLoading(false), 420));
    return props.products.filter(
      item => (["none", "null", "undefined", null, undefined].includes(catgo) ? true : item.category === catgo)
          && (item.price >= minPrice && item.price <= maxPrice ) 
          && ( !promo ? true : item.discount )
    );
  });

  const sliceAndFilter = ():ShopProps["products"] => {
    const startAt = myQuery().page * myQuery().size;
    const endAt = startAt + myQuery().size;
    if (myQuery().sortby == "popularity") {
      console.log( myQuery().sortby )
      return filteredProducts().sort( ( a ,b ) => a.reviews.length - b.reviews.length ).slice(startAt, endAt);
    } else
    return filteredProducts().sort( ( a ,b ) => (b.price) - (a.price) ).slice(startAt, endAt);
  }



  return (<Show when={!loading()} fallback={<LoadingBoxes />}>

    <main style="max-width: 1280px;" class="container g-2 row mx-auto">

      <SearchNav
        size={filteredProducts().length}
        current={myQuery()}
        displayStyle={style()}
        changeStyle={changeStyle}
      />

      <nav class="col-md-3" aria-label="products search">

        <button class="d-inline d-md-none btn btn-outline-primary" type="button" data-bs-toggle="collapse" data-bs-target="#searchFilter" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <i class="bi bi-search"></i> 
        </button>

        <aside class="collapse-md" id="searchFilter">
          <FilterProducts initial={myQuery()} brands={props.brands} categories={props.categories} />
        </aside>

      </nav>
      

      <section class="col-md-9 nav flex-column justify-content-between ">

        {!filteredProducts()[0] && <h1 class="text-zeyada p-4">Sorry the product you are looking for is not available.</h1>}

        <div class={`row  ${style() === 1 ? "row-cols-2 row-cols-lg-3 row-cols-xl-4" : "row-cols-1 row-cols-xl-2"} g-2 g-lg-3 mb-4 p-2`}>

          <For each={sliceAndFilter()} >
            {item => <div class="col">
              <ProductCard
                id={item.id}
                name={item.name}
                price={item.price}
                images={item.images}
                category={item.category}
                brand={item.brand}
                discount={item.discount}
                displayStyle={style()}
                description={item.description}
              />
            </div>}
          </For>

        </div>

        <Pagination info={myQuery()} listSize={filteredProducts().length} />

      </section>

    </main>
  </Show>);

}

export default ShopPage;
