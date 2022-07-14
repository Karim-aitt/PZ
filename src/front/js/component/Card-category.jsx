import React from "react";
import "../../styles/card-category.css";

export const CardCategory = (props) => {

    //GENERAR 1 div plantilla POR CATEGORIA

  return (
    <div className="d-flex flex-wrap category-item">
        {/* PLANTILLA

        <div className="col-6 text-center">
            <p className="m-3 p-4 fw-bold category-size">{props.category_name}</p>
        </div>

        */}
        <div className="col-6 text-center">
            <p className="m-3 p-4 fw-bold category-size">ALE</p>
        </div>
        <div className="col-6 text-center">
            <p className="m-3 p-4 fw-bold category-size">PALEALE</p>
        </div>
        <div className="col-6 text-center">
            <p className="m-3 p-4 fw-bold category-size">GERMAN ALE</p>
        </div>
        <div className="col-6 text-center">
            <p className="m-3 p-4 fw-bold category-size">BELGIUM ALE ABADIA</p>
        </div>
        
    </div>
  );
};