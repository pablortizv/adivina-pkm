"use client";
import styles from "./page.module.css";
import { getPkmn } from "@/request/request";
import React, { use, useEffect, useState } from "react";
import { Input } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Home() {
  const [pkmn, setPkmn] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [id, setId] = useState(Math.floor(Math.random() * 1025) + 1);
  const [isLocked, setIsLocked] = useState(true);
  const [helpName, setHelpName] = useState(false);
  const [helpNumber, setHelpNumber] = useState(false);
  const [namePokmn, setNamePkmn] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPkmn(id);
        setHelpName(false);
        setHelpNumber(false);
        setPkmn(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = () => {
    const randomId = Math.floor(Math.random() * 1025) + 1;
    setId(randomId);
    setHelpName(false);
    setHelpNumber(false);
  };

  const lockPkmn = () => {
    setIsLocked(true);
  };

  useEffect(() => {
    if (isLocked) {
      lockPkmn();
    }
  }, [pkmn]);

  const formatterName = (name) => {
    if (!name || typeof name !== "string") {
      return null;
    }
    return name.split("").map((char, index) => (
      <Input
        key={index}
        type="text"
        value={char}
        readOnly
        style={{
          width: "30px",
          height: "30px",
          textAlign: "center",
          margin: "2px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          fontSize: "16px",
          backgroundColor: "#f9f9f9",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          paddingLeft: "10px"
        }}
      />
    ));
  };

  useEffect(() => {
    if (pkmn) {
      let name = isLocked
        ? helpName
          ? `${pkmn.name.slice(0, 2)}${"-".repeat(pkmn.name.length - 2)}`
          : "-".repeat(pkmn.name.length)
        : pkmn.name;
      setNamePkmn(name);
    }
  }, [pkmn, helpName, isLocked]);

  const handleLocked = (isLocked) => {
    if(!isLocked) {
      setIsLocked(true);
      setHelpName(false);
      setHelpNumber(false);
    } else{
      setIsLocked(false);
      setHelpName(true);
      setHelpNumber(true);
    }
   
  };

  return (
    <div
      style={{
        textAlign: "center",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'Arial', sans-serif",
        height: "100vh"
      }}
    >
      <div style={{display:'flex', margin:'20px 0', gap:'10px'}}>
        <img
          src="/pokemon-4657023_1280.webp"
          alt="Pokemon Logo"
          style={{ width: "30px", height:'30px', marginBottom: 0 }}
        />
        <h1 style={{color:'#FFFF00', textShadow: '2px 0 #0000FF, -2px 0 #0000FF, 0 2px #0000FF, 0 -2px #0000FF, 1px 1px #0000FF, -1px -1px #0000FF, 1px -1px #0000FF, -1px 1px #0000FF' }}>Adivina</h1>
        <img
          src="/pokemon-4657023_1280.webp"
          alt="Pokemon Logo"
          style={{ width: "30px", height:'30px', marginBottom: 0 }}
        />
      </div>
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error.message}</p>}
      {pkmn && (
        <div
          style={{
            width: "100%",
            maxWidth: "100vw",
            padding: "0",
            borderRadius: "10px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            height: "100%",
            paddingTop: "30px"
          }}
        >
          <h2
            style={{
              color: "#3b4cca",
              fontSize: "1.5rem",
              fontFamily: "'Arial', sans-serif",
            }}
          >
            #{helpNumber && pkmn.id}
          </h2>

            {formatterName(namePokmn)}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img
              src={pkmn.sprites.front_default}
              style={isLocked ? { filter: "brightness(0)" } : null}
              alt={pkmn.name}
              width="100%"
              height="auto"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "0",
              gap: "10px",
            }}
          >
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", width: '100%', justifyContent: 'center' }}>
              <button
                style={{
                  width: "40%",
                  backgroundColor: "#008B8B",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                  height: "40px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.2s",
                }}
                onClick={() => setHelpNumber(!helpNumber)}
              >
                {helpNumber? <VisibilityIcon fontSize="10px" /> : <VisibilityOffIcon fontSize="10px" /> } Número
              </button>
              <button
                style={{
                  width: "40%",
                  backgroundColor: "#008B8B",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                  height: "40px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.2s",
                }}
                onClick={() => setHelpName(!helpName)}

              >
                 {helpName? <VisibilityIcon fontSize="10px" /> : <VisibilityOffIcon fontSize="10px" /> } Nombre
              </button>
            </div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", width: '100%', justifyContent: 'center' }}>
              <button
                  style={{
                    backgroundColor: isLocked ? "gray" : "#1E90FF",
                    width: "40%",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "14px",
                    height: "40px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.2s",
                    userSelect: 'none',
                    WebkitUserSelect: 'none', /* Necesario para iOS y Safari */
                    msUserSelect: 'none',
                    WebkitTouchCallout: 'none', /* Necesario para iOS y Safari */
                  }}
                onMouseDown={() => handleLocked(true)}
                onMouseUp={() => handleLocked(false)}
                onMouseLeave={() => handleLocked(false)}
                onTouchStart={() => handleLocked(true)}
                onTouchEnd={() => handleLocked(false)}
              >
                {isLocked ? "Desbloquear" : "Bloquear"}
              </button>
              <button
                 style={{
                  backgroundColor: "#228B22",
                  width: "40%",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                  height: "40px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.2s",
                }}
                onClick={handleChange}

              >
                Nuevo Pokémon
              </button>
              </div>
            </div>
          </div>
      )}
    </div>
  );
}
