import { writable } from "svelte/store";

export let estado = writable("referencias");

export function trocarestadodojogo(novoestado){
    estado.set(novoestado)
}