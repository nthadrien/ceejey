import { useStore } from "@nanostores/solid"
import { createEffect, createSignal, For, onMount, Show } from "solid-js";
import { shoppingCart } from "src/stores/users";



function NavCart() {
  const $cart = useStore(shoppingCart);
  const [open, setOpen] = createSignal<boolean>(false);

  const changeOpen = () => setOpen(!open());
  const mouseLeave = () => setOpen(false);

  return (
    <div onMouseLeave={mouseLeave} class="btn-group">

      <button onClick={changeOpen} type="button" class="btn position-relative" aria-expanded="false">
        <i class="bi bi-handbag fs-6"></i> 
        <small class="badge text-bg-primary rounded-pill position-absolute me-5 mt-3">{ $cart().length > 0 ? $cart().length: ""  }</small>
      </button>

      <Show when={open()}>

        <ul style="right:0;top:100%; max-width:240px;" class="dropdown-menu show position-absolute p-1">

          <For each={$cart()} fallback={<h5>Nothing add to cart.</h5>}>
            {item => <li class="dropdown-item d-flex gap-2">

              <img style={"max-height:48px;max-width:48px"} class="object-fit-contain" src={`/images/products/${item.image}`} alt="img" />
              <p class="text-swanky" style={"font-size:smaller;"}>
                {item.category.split("-")[2]} <br/>
                Quantity : {item.qty} , color: {item.color}
              </p>
            </li>}
          </For>
          <li><hr class="dropdown-divider" /></li>
          <li><a href="/checkout" class="dropdown-item"> <i class="bi bi-clipboard2-check"></i> checkout </a></li>
        </ul>
      </Show>
    </div>
  )
}

export default NavCart;
