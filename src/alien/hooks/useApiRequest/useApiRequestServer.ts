import { TApiInstance, TApiInstanceKeys } from "../../../api";
import { GetByDotKey, getByDotKey, runFnWithTuple } from "../../utility/objects";
import useApi from "../useApi";
import useCache from "../useCache";
import { TApiRequest } from "./types";

function useApiRequestServer<T extends TApiInstanceKeys>(
	schema: T, 
	...params: Parameters<GetByDotKey<TApiInstance, T>>
){
	type Res = Awaited<ReturnType<GetByDotKey<TApiInstance, T>>>;

	const api = useApi();
	const cache = useCache();

	const key = schema + ':' + JSON.stringify(params);
	let result: TApiRequest<Res>;

	if(key in cache.data){
		result = {
			done: true,
			success: true,
			data: cache.data[key] as Res,
			error: null
		}
	}
	else{
		if(!(key in cache.awaiting)){
			const fn = getByDotKey(api, schema);
			cache.awaiting[key] = runFnWithTuple(fn, params);
		}

		result = {
			done: false,
			success: false,
			data: null,
			error: null
		}
	}

	return result;
}

export default useApiRequestServer;