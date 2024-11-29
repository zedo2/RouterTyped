import { AxiosInstance } from "axios";
import { TPost, TTodo, TUser } from "../types/data";

function createUsersApi(http: AxiosInstance){
	return {
		async all(){
			return (await http.get<TUser[]>('users')).data;
		},
		async one(id: number){
			return (await http.get<TUser>(`users/${id}`, {
				errorAlert: {
					text: 'Cant load user'
				}
			})).data;
		},
		todos: {
			async all(userId: number){
				return (await http.get<TTodo[]>(`users/${userId}/todos`)).data;
			}
		},
		posts: {
			async all(userId: number){
				return (await http.get<TPost[]>(`users/${userId}/posts`)).data;
			}
		}
	};
}

export default createUsersApi;