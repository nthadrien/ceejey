import { useStore } from "@nanostores/solid"
import { createSignal, For, Show } from "solid-js";
import { shoppingCart } from "src/stores/users";



function NavCart() {
  const $cart = useStore(shoppingCart);
  const [open, setOpen] = createSignal<boolean>(false);

  const changeOpen = () => setOpen(!open());
  const mouseLeave = () => setOpen(false);

  return (
    <div onMouseLeave={mouseLeave} class="btn-group dropend">

      <button onClick={changeOpen} type="button" class="btn position-relative" aria-expanded="false">
        <i class="bi bi-handbag fs-5"></i> 
        <small class="text-bg-primary px-2 rounded-pill position-absolute top-100 start-75 translate-middle x-small">
          { $cart().length > 0 ? $cart().length: "."  }
        </small>
      </button>

      <Show when={open()}>

        <ul style={"width: 260px;"} class="dropdown-menu p-2 show end-0 top-100">

          <For each={$cart()} fallback={<h6>Nothing add to cart.</h6>}>
            {item => <li class="dropdown-item d-flex gap-2">
              <img style={"max-height:48px;max-width:48px"} class="object-fit-contain flex-shrink-0" src={`/images/products/${item.image}`} alt="img" />
              <small class="" style={"font-size:smaller;"}>
                <b>{item.category.split("-")[2]}</b> <br/>
                {item.qty}  {item.color}
              </small>
            </li>}
          </For>
          <li><a href="/checkout" class="dropdown-item"> <i class="bi bi-clipboard2-check"></i> checkout </a></li>
          <li><a href="/bookmarked" class="dropdown-item"> <i class="bi bi-clipboard2-check"></i> Wish list </a></li>
        </ul>
      </Show>
    </div>
  )
}

export default NavCart;
