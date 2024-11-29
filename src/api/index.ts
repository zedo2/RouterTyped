import { FlattenObjectKeys } from "../alien/utility/objects";
import createAuthApi from "./auth";
import createUsersApi from "./users";
import { AxiosInstance } from "axios";

function createApi(http: AxiosInstance){
	return {
		users: createUsersApi(http),
		auth: createAuthApi(http)
	}
}

export default createApi

export type TApiInstance = ReturnType<typeof createApi>;
export type TApiInstanceKeys = FlattenObjectKeys<TApiInstance, true>