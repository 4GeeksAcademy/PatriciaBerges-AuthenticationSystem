const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: "Hello World",
		},
		actions: {
			// Use getActions to call a function within a fuction
			login: async (email, password) => {
				const resp = await fetch(process.env.BACKEND_URL + `/api/login`, { 
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password })
				})
				if(!resp.ok) throw Error("There was a problem in the login request")
	
				if(resp.status === 401){
					throw("Invalid credentials")
				}
				else if(resp.status === 400){
					throw ("Invalid email or password format")
				}
				const data = await resp.json()
				// Guarda el token en la localStorage
				// También deberías almacenar el usuario en la store utilizando la función setItem
				localStorage.setItem("jwt-token", data.token);
				return data
			},
			privatePage: async () => {
				// Recupera el token desde la localStorage
				const token = localStorage.getItem('jwt-token');
		
				const resp = await fetch(process.env.BACKEND_URL + `/api/protected`, {
				method: 'GET',
				headers: { 
					"Content-Type": "application/json",
					'Authorization': 'Bearer ' + token // ⬅⬅⬅ authorization token
				} 
				});
		
				if(!resp.ok) {
					if(resp.status === 422){
						throw Error("You must be logged in to access this page")
					}
					else if(resp.status === 403) {
						throw Error("Missing or invalid token");
					} else {
						throw Error("There was a problem in the request");
					}
				}
				const data = await resp.json();
				return data
			},
			signup: async (email, password) => {
				const resp = await fetch(process.env.BACKEND_URL + `/api/signup`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password })
				})
				if(resp.status === 401){
					throw new Error ("Email already in use")
				}
				if(!resp.ok) throw new Error("There was a problem in the sign up request")
				const data = await resp.json()
				return data
			}
	}
	};
};

export default getState;
