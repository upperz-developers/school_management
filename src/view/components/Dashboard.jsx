/* eslint-disable array-callback-return */
import { Card, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";
import ScrollToTop from "../models/ScrollToTop";
import { MdOutlineSettings } from "react-icons/md";

const Dashboard = ({ actived }) => {
  let tabDash = [
    
  ]
  return (
    <React.Fragment>
      <div className="day">
        <ScrollToTop />
        <div className="stack"></div>

        <button
          className="btn_add_task"
          style={{ left: { sm: `calc(100% - ${240}px)`, xs: "100%" } }}
          onClick={actived}
        >
          <div className="img-svg">
            <MdOutlineSettings color="#01a9f9" fontSize={85} />
          </div>
          <div className="text-acceuil">
            <p id="text-acceuil1">
              Commencez par la configurations de votre espace de travail !
            </p>
            {/* <p id="text-acceuil2">
            Effectuez de taches avec Ma journée
            <br /> une liste actualisée tout les jours
          </p> */}
          </div>
        </button>
        {/* <div className="input-task">
        <GrAdd fontSize={24} />
        <input className="input-task1" />
      </div> */}
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
