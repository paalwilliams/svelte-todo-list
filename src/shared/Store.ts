import type { DispatchFunction, IToDoItem, ReducerAction, ReducerFunction, Reducible } from "src/types";
import { writable, type Writable } from "svelte/store";
import { reducer } from "./Reducer";


export const reducible: Reducible<IToDoItem[]> = (state: IToDoItem[], reducer: ReducerFunction<IToDoItem[]>): [Writable<IToDoItem[]>, DispatchFunction<IToDoItem[]>] => {
    const store = writable(state);

    const dispatch: DispatchFunction<IToDoItem[]> = async (action: ReducerAction<IToDoItem[]>): Promise<void> => {
        store.update((state) => reducer(state, action));
    }
    return [{ ...store }, dispatch];
}

export const [state, dispatch] = reducible([{} as IToDoItem], reducer);