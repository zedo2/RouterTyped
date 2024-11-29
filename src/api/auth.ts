import { AxiosInstance } from "axios";
import { TCheckResponse, TLoginResponse } from "../types/data";

function createAuthApi(http: AxiosInstance){
	return {
		async login(email: string, password: string){
			return (await http.post<TLoginResponse>(`auth/login`, {
				email, password
			})).data;
		},
		async check(){
			return (await http.get<TCheckResponse>(`auth/check`)).data;
		}
	};
}

export default createAuthApi;