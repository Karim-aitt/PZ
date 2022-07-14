import config from "../../js/config.js"

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			// myAuthFlag: false,
			token: null,
			nombre: "",
			userExist: false,
			emailExist: false,
			loginEmailPassMatch: false,
			categories: [],
			beers: [],
			userVotes: false,
			userDataVotes: [],
		
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			firstLoadToken: () => {
				const tok = localStorage.getItem('token')
				if(tok){
					const val = fetch(`${config.hostname}/api/validation`)
					if (val === true || val === "true"){
						setStore({token: tok})
						setStore({userVotes: true})
					} else {
						return "Token no valido o expirado flux 42"
					}
				} else {
					return "No hay token flux 45"
				}
			},

			// Consigue las categorias existentes en la DB al entrar en la web
			getCategories: async () => {
				const res = await fetch(`${config.hostname}/api/category`, {
					method: 'GET'
				})

				const data = await res.json();
				await setStore({categories: data})
			},

			//Esto se hace al cargar la página y recoge todas las beers de la DB y las almacena en global
			getBeers: async () => {
				const res = await fetch(`${config.hostname}/api/beers`, {
					method: 'GET'
				})

				const data = await res.json();
				await setStore({beers: data})
			},

			// Esto es usado en sincronizacion con el fetch utilizado en ___ para almacenar los votos de un usuario.
			saveUserDataVotes: (data) => {
				setStore({userDataVotes: data})
			},

			//EL SIGNUP retorna un token en forma de token con los datos del usuario nickname, email y pass dentro.
			signup: (nickname, name, surnames, email, password,) => {
				fetch(`${config.hostname}/api/signup`, {
					method: 'POST',
					body: JSON.stringify({nickname, name, surnames, email, password}),
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(res => {
					if(res.status == 200 || res.status == 201){
						// setStore({myAuthFlag: true})
						setStore({nombre: res.nickname})
						setStore({userExist: false})
						
					} 
					else if(res.status == 402){
						setStore({emailExist: true})
						setStore({userExist: false})
					
					}else if(res.status == 403){
						setStore({userExist: true})
						setStore({emailExist: false})
					}
					else if(res.status == 400 || res.status == 500){
						alert("Error raro del back")
					}
					return res.json()
				})
				.then(data => {
					localStorage.setItem("token", data)
					setStore({token: data})
				})
				.catch((error) => {
					alert("Error en el fetch - flux 106")
				})
			},

			login: (email, password) => {
				fetch(`${config.hostname}/api/login`, {
					method: 'POST',
					body: JSON.stringify({email, password}),
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(res => {
					console.log("esto es res", res)
					if (res.status == 200 || res.status == 201){
						// setStore({myAuthFlag: true})
						setStore({nombre: res.nickname})
						setStore({userVotes: true})
						// Si la respuesta del back es positiva, setea esta flag en false para que en caso de que el usuario 
						// haya fallado anteriormente al intentar loguearse pueda loguear sin problema
						setStore({loginEmailPassMatch: false})
						alert("esto es el res 200")

					} else {
						// Es una flag para validar en form del login, si la respuesta del back es negativa te dice que fallaste
						// al escribir el email o la password
						setStore({loginEmailPassMatch: true}) 
						return "Usuario o clave incorrectas"
					}
					
					return res.json()
				})
				.then(data => {
					console.log("esto es data l 137", data)
					localStorage.setItem("token", data)
					setStore({token: data})
					
					
					// const modal = document.getElementById("loginModal")
					// const m = bootstrap.Modal.getInstance(modal)
					// m.hide()
				})
				.catch(error => {
					console.log("esto es error", {error})
					alert("error en el fetch flux l 147", error)
				})
			},

			//Crear cerveza
			createbeer: (image, name, smell, category, source, alcohol, company, description) => {
				let tokenRequired = localStorage.getItem("token")

				fetch(`${config.hostname}/api/beers`, {
					method: 'POST',
					body: JSON.stringify({image, name, smell, category, source, alcohol, company, description}),
					headers: {
						'Content-Type': 'application/json',
						'Authorization': "Bearer " + tokenRequired
					}
				})
				.then(res => {
					if(res.status == 200 || res.status == 201){
						const modal = document.getElementById("createbeerModal")
						const m = bootstrap.Modal.getInstance(modal)
						m.hide()
					} else (alert("Error en backend"))
				})

			},

			//LOGOUT
			logout: () => {
				localStorage.removeItem('token')
				// setStore({myAuthFlag: false})
			},

			// setMyAuthFlag: (value) => {
			// 	setStore({myAuthFlag: value})
			// },

			
			//EJEMPLOS
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},		

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
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
