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
        <i class="bi bi-handbag fs-5"></i> 
        <small class="badge text-bg-primary px-2 rounded-pill position-absolute top-100 start-75 translate-middle x-small">{ $cart().length > 0 ? $cart().length: ""  }</small>
      </button>

      <Show when={open()}>

        <ul style={"width: 260px;"} class="dropdown-menu show end-0 top-100">

          <For each={$cart()} fallback={<h5>Nothing add to cart.</h5>}>
            {item => <li class="dropdown-item d-flex gap-2">
              <img style={"max-height:48px;max-width:48px"} class="object-fit-contain col-3" src={`/images/products/${item.image}`} alt="img" />
              <small class="col-9" style={"font-size:smaller;"}>
                <b>{item.category.split("-")[2]}</b> <br/>
                {item.qty}  {item.color}
              </small>
            </li>}
          </For>
          <li><a href="/checkout" class="dropdown-item"> <i class="bi bi-clipboard2-check"></i> checkout </a></li>
        </ul>
      </Show>
    </div>
  )
}

export default NavCart;
