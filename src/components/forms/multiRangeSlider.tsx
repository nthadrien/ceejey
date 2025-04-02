import { createEffect, createSignal, type JSX } from "solid-js";

interface Props {
    values: number[];
}


function MultiRangeSlider(props:Props):JSX.Element {

    let indicatorELement!: HTMLDivElement;
    const [values, setValues] = createSignal<number[]>([ ...props.values]);

    const handleMin : JSX.EventHandler<HTMLInputElement, InputEvent> = (e) => {
        const min = parseInt(e.currentTarget.value);
        setValues( _ => [ min , values()[1] ]);
    }

    const handleMax : JSX.EventHandler<HTMLInputElement, InputEvent> = (e) => {
        const max = parseInt(e.currentTarget.value);
        setValues( _ => [  values()[0] , max ]);
    }

    createEffect(()=>{
        indicatorELement.style.left= values()[0] + "%";
        indicatorELement.style.width = Math.abs(values()[1] - values()[0] - 1)  + "%";
    });

    return (
        <>
            <div class="d-flex gap-0 position-relative p-0">
                <input onInput={handleMin} class="form-range w-50 flex-shrink-0" type="range" name="minP" value={props.values[0]} min="0" max="50" />
                <div ref={indicatorELement} style={"height:28%"} class="range-indicator bg-primary position-absolute top-50 translate-middle-y"></div>
                <input onInput={handleMax}  class="form-range w-50 flex-shrink-0" type="range" name="maxP" value={props.values[1]} min="51" max="100" />
            </div>
            <p class="text-center"> ${values()[0]} - ${values()[1]}</p>
        </>
    )
}

export default MultiRangeSlider;
