
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

  const startAt = () => myQuery().page * myQuery().size;
  const endAt = () => startAt() + myQuery().size;
  const changeStyle = (a: number) => setStyle(a);

  return (<Show when={!loading()} fallback={<LoadingBoxes />}>

    <main style="max-width: 1280px;" class="container g-2 row mx-auto">

      <SearchNav displayStyle={style()} changeStyle={changeStyle} current={myQuery()} size={filteredProducts().length} />

      <aside class="col-md-3">
        <FilterProducts initial={myQuery()} brands={props.brands} categories={props.categories} />
      </aside>

      <section class="col-md-9 nav flex-column justify-content-between ">

        <div class={`row  ${style() === 1 ? "row-cols-2 row-cols-lg-3 row-cols-xl-4" : "row-cols-1 row-cols-xl-2"} g-2 g-lg-3 mb-4 p-2`}>

          <For each={filteredProducts().slice(startAt(), endAt())} >
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
