import { useParams } from "react-router-dom";

function useRouteInt(key: string){
	const params = useParams();
	const value = params[key] ?? '';
	const isValid = /^[1-9]+\d*$/.test(value);

	return isValid 
		? { isValid: true as const, value: +value } 
		: { isValid: false as const, value: null };
}

/* [ 1, '' ] -> Array<number | string>
[ 1, '' ] as const -> [ number, string ] */

export default useRouteInt;