export type TLatLng = {
	lat: string
	lng: string
}

export type TAddress = {
	street: string
	suite: string
	city: string
	zipcode: string,
	geo: TLatLng
}

export type TCompany = {
	name: string
	catchPhrase: string
	bs: string
}

export type TUser = {
	id: number
	name: string
	username: string
	email: string
	address: TAddress,
	phone: string
	website: string
	company: TCompany
}

export type TUserNeighbours = { 
	prev: TUserPrimary | null, 
	next: TUserPrimary | null 
}

export type TUserPrimary = Pick<TUser, 'id' | 'username' | 'email'>

export type TTodo = {
	userId: number,
	id: number,
	title: string,
	completed: boolean
}

export type TLoginResponse = {
	success: true,
	token: string
} | {
	success: false,
	errors: string[]
}

export type TCheckResponse = {
	auth: true,
	user: TUser
} | { auth: false }

export type TPost = {
	userId: number,
	id: number,
	title: string,
	body: string
}