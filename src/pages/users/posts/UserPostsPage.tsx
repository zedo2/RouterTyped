import useApiRequest from "../../../alien/hooks/useApiRequest";
import useUserOutletContext from "../outlet/useUserOutlet";

function UserPostsPage(){
	const user = useUserOutletContext();
	const { success, data: posts } = useApiRequest('users.posts.all', user.id);

	return <div>
		{ success && <pre>{JSON.stringify(posts, null, 2)}</pre> }
	</div> 
}

export default UserPostsPage;