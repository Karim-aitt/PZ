import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";

import { CardCategory } from "../component/Card-category.jsx"
import { CardExpanded } from "../component/CardExpanded.jsx"
import { CardDetail } from "../component/Card-detail.jsx";

import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

import "../../styles/home.css";
import banner from "../../img/bannerWeb2.png"

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
		{store.token != null ? 
		<>
			<Navbar />
			<div className="container-fluid mx-0 px-0 banner-container shadow-lg">
				<img className="img-fluid d-flex mx-auto" src={banner} />
			</div>
			<div className="d-flex flex-row justify-content-center px-0">
			<div className="me-sm-3">
				{/* AQUI SE GENERAN TODAS LAS CARDS PRINCIPALES */}
				<CardDetail name={"Domus"} type={"Trigo"} alcohol={"4.5%"} autor={"Inc SL"}/>
				<CardDetail name={"Domus"} type={"Trigo"} alcohol={"4.5%"} autor={"Inc SL"}/>
			</div>

			<div className="mt-5 ms-3">
				{/* ESTO ES EL DIV DONDE SE GENERAN TODAS LAS CARDS DE CATEGORIAS */}
				<div className="d-none d-md-block mes me-auto borde back-color sticky-top">
					<div className="mes-header fw-bold text-center bg-dark"><p className="py-2 text-white">Categories</p></div>
					<CardCategory />
				</div>
				
			</div>
			</div>
			{/* COLOCAR DEBAJO DE CATEGORIAS */}
			<Footer />
		</>	
		: <Navigate to="/" />}
		</>
		
	);
};
