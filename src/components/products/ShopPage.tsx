
import { useStore } from "@nanostores/solid";
import { createMemo, For } from "solid-js";

// components tsx:
import FilterProducts from "./FilterProducts";
import SearchNav from "./SearchNav";
import { page } from "src/stores/users";
import data from "src/data/products/all-products.json";
import ProductCard from "@components/cards/ProductCard";
import Pagination from "@components/paginations/Pagination";

function ShopPage (props:any) {
  
  const $page = useStore(page);

  const filteredProduct = createMemo(()=>{
    const brands = $page().brands.split(",");
    return data.products.filter( item => ( $page().category == "" ? true : $page().category == item.category ) 
    && ( brands.length < 1 ? brands.includes(item.brand) : true ) );
  });

  const startAt = () => parseInt($page().page);
  const endAt = () => startAt() + parseInt( $page().size );
  
  return (<>
    <main class="container-xl row mx-auto">

      <aside class="col-md-3 col-xxl-2">
        <FilterProducts />
      </aside>

      <section class="col-md-9 col-xxl-10">

        <SearchNav size={filteredProduct().length} />

        <div class="row row-cols-2  row-cols-lg-3 g-1 g-lg-2 mb-4">

          <For each={props.products.slice( startAt() , endAt() ) } >
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
    </>)

}

export default ShopPage;
