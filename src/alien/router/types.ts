import routes from "../../router";
import { RouteRecord, RouteRecords } from "./lib";

export type TRoutes = typeof routes

export type TRouteNames = GenerateRoutesNames<TRoutes>

export type GenerateRoutesNames<T extends RouteRecords, K = keyof T> =
	K extends string
		? T[K] extends { children: RouteRecords } 
			? `${K}.${GenerateRoutesNames<T[K]['children']>}` | `${K}`
			: `${K}`
		: never;

export type GetRouteByName<O extends RouteRecords, N extends string> = 
	N extends `${infer R1}.${infer R2}` 
		? O[R1] extends { children: RouteRecords } 
			? GetRouteByName<O[R1]['children'], R2>
			: never
		: N extends keyof O ?
			O[N] : 
			never

export type InferRouteParams<N extends TRouteNames, R = GetRouteByName<TRoutes, N>> = 
	R extends RouteRecord 
		? SplitRoutePathToParams<R['path']>
		: never

export type ValidRouteParam = string | number;

type SplitRoutePathToParams<P extends string> = 
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	P extends `${infer _R1}:${infer R2}`
		? [ ValidRouteParam, ...SplitRoutePathToParams<R2> ]
		: [] 

