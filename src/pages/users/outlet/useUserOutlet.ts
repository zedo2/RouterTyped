import { useOutletContext } from "react-router-dom"
import { UserOutletProps } from "./UserOutlet";

export default function useUserOutletContext(){
	return useOutletContext<UserOutletProps['context']>();
}