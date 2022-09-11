import type { Writable } from "svelte/store";

export interface IToDoItem {
    completed: boolean
    _id: string
    _rev: string
    title: string
}


export type Response = PouchDB.Core.Response;

export type CreateIndexResponse<T extends Record<keyof T, unknown>> = PouchDB.Find.CreateIndexResponse<T>;

export type ExistingDocument<T extends Record<keyof T, unknown>> = PouchDB.Core.ExistingDocument<T>

export type FindResponse<T extends Record<keyof T, unknown>> = PouchDB.Find.FindResponse<T>;

export interface ReducerAction<T = void> {
    type: string;
    payload: T | T
}

export type ReducerFunction<T> = (state: T, action: ReducerAction<T>) => T;

export type DispatchFunction<T> = (action: ReducerAction<T>) => Promise<void>

export type Reducible<T> = (state: T, reducer: ReducerFunction<T>) => [Writable<T>, DispatchFunction<T>]