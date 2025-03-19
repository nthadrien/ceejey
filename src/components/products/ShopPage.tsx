
import { useStore } from "@nanostores/solid";
import { Show, createMemo, createSignal, For, onMount, Suspense, type JSX } from "solid-js";

// components tsx:
import FilterProducts from "./FilterProducts";
import SearchNav from "./SearchNav";
import { page } from "src/stores/users";
import ProductCard from "@components/cards/ProductCard";
import Pagination from "@components/paginations/Pagination";
import { type ShopProps, type SearchQueryType, initialQuery } from "./search.type";





function ShopPage (props:ShopProps) : JSX.Element {
  
  const $page = useStore(page);

  const [myQuery , setMyQuery ] = createSignal<SearchQueryType>(initialQuery);
  const [ loading , setLoading ] = createSignal<boolean>(true);
  const [ style , setStyle ] = createSignal<number>(1);

  onMount(()=>{
    const data = Object.fromEntries(new URLSearchParams(window?.location.search));
    const newOne = { 
      page:  data.page ? parseInt(data.page) : 1,
      size:  data.size ? parseInt(data.size) : 1,
      category: data.category ? data.category : "none",
      minP:  data.minP ? parseInt(data.minP) : 1,
      maxP:  data.maxP ? parseInt(data.maxP) : 100,
      promo : data.promo?? "none",
      sortby : data.sorty ?? "none"
    };

    console.log("mounting to:", newOne, window.location.search);
    setMyQuery(newOne)
  });

  const filteredProduct = createMemo( ()=>{
    setLoading(true)
    const catgo = myQuery().category;
    // simulate delay
    new Promise(r => setTimeout( () =>setLoading(false) , 3000));
    
    return props.products.filter( item => catgo == "none" ? true : item.category === catgo  );
  });

  const startAt = () => myQuery().page ?? 0;
  const endAt = () => startAt() + myQuery().size ;
  const changeStyle = (a:number) => setStyle(a);
  
  return (<Show when={!loading()} fallback={<p>Loading ..........</p>}>
    <main style="max-width: 1280px;" class="container g-2 row mx-auto">

      
      <SearchNav size={filteredProduct().length} />

      <aside class="col-md-3 bg-body">
        <FilterProducts initial={myQuery()} brands={props.brands} categories={props.categories} />
      </aside>

      <section class="col-md-9">

        <p>{startAt()} - {endAt()}</p>

        <div class="row row-cols-2 row-cols-lg-3 row-cols-xl-4 g-1 g-lg-2 mb-4">

          <For each={filteredProduct().slice( startAt() , endAt() ) } >
            { item => <div class="col">
              <ProductCard
                id = {item.id}
                name={item.name}
                price ={item.price}
                images={item.images}
                category={item.category}
                brand={item.brand}
              />
            </div>}
          </For>
          
        </div>

        <Pagination size={filteredProduct().length} />
      </section>



      </main>
    </Show>);

}

export default ShopPage;
