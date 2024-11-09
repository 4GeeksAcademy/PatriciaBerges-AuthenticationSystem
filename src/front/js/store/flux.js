const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: "Hello World"
		},
		actions: {
			// Use getActions to call a function within a fuction
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			login: async (email, password) => {
				const resp = await fetch(`https://paranormal-spooky-apparition-x599w9g9756jc9q6r-3001.app.github.dev/login`, { 
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
		}
		}
	};
};

export default getState;
