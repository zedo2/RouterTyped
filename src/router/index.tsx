import Error404 from "../alien/components/erorrs/Error404";
import UsersPage from "../pages/users/UsersPage";
import UserPage from "../pages/users/UserPage";
import UserTodosPage from "../pages/users/todos/UserTodosPage";
import { RouteRecords, recordToNative } from "../alien/router/lib";
import LoginPage from "../pages/auth/LoginPage";
import AuthGuard from "../components/AuthGuard";
import OfficePage from "../pages/office/OfficePage";
import GuestGuard from "../components/GuestGuard";
import UserPostsPage from "../pages/users/posts/UserPostsPage";

const routes = {
	home: {
		path: '/',
		Component: UsersPage
	},
	user: {
		path: '/user/:id',
		Component: UserPage,
		children: {
			todos: {
				path: '/user/:id/todos',
				Component: UserTodosPage
			},
			hi: {
				path: '/user/:id/posts',
				element: <AuthGuard><UserPostsPage/></AuthGuard>,
				children: {
					some: {
						path: '/user/:id/posts/:sample',
						element: <div>hi there</div>
					}
				}
			}
		}
	},
	login: {
		path: '/auth/login',
		element: <GuestGuard><LoginPage/></GuestGuard>
	},
	office: {
		path: '/office',
		element: <AuthGuard><OfficePage /></AuthGuard>
	},
	e404: {
		path: '*',
		element: <Error404 />
	}
} as const satisfies RouteRecords;


export type TRoutes = typeof routes;

export const routesNative = Object.values(routes).map(recordToNative)

export default routes