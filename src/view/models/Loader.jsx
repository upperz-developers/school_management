import React from "react";

const Loader = () => {
  return (
    <div
      style={{
        height: "83vh",

        display: "flex",
        alignItems: "center",
        alignContent: "center",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        gap: "20px",
      }}
    >
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p style={{ fontSize: "16px", textAlign: "center" }}>
        Veillez patientez le temps que nous obtenons vos données !
      </p>
    </div>
  );
};

export default Loader;
