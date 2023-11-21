import React, { useState, useEffect } from "react";
import { ContextCocktail } from "./components/ContextCocktail";

function App() {
  const [userInput, setUserInput] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [contextCocktails, setContextCocktails] = useState([]);
  const url = "https://thecocktaildb.com/api/json/v1/1/search.php?s=";

  const handleSearch = () => {
    if (userInput.trim() === "") {
      setSearchResult(
        <h3 className="msg">El campo de búsqueda no puede estar vacío</h3>
      );
    } else {
      fetch(url + userInput)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Puedes manejar los resultados de la API aquí y actualizar setSearchResult
        })
        .catch((error) => console.error("Error en la solicitud:", error));
    }
  };

  useEffect(() => {
    // Coloca aquí la lógica para obtener datos y crear los cócteles
    const generateContextCocktails = () => {
      const numberOfContextCocktails = 10;
      return Array.from({ length: numberOfContextCocktails }, (_, index) => (
        <div key={index} className="div__contextCocktail">
          <ContextCocktail />
        </div>
      ));
    };

    const newContextCocktails = generateContextCocktails();
    setContextCocktails(newContextCocktails);
  }, []); // El array vacío como segundo argumento asegura que este efecto solo se ejecute una vez al montar el componente

  return (
    <>
      <header>
        <h1 className="nav__title">API Cocktails 🍷</h1>
        <div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Encuentra tu bebida..."
              id="search-inp"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button id="btn-search" onClick={handleSearch}>
              Buscar
            </button>
          </div>
        </div>
      </header>
      <section className="section__cocktail">
        <div id="result">{searchResult}</div>
        {contextCocktails}
      </section>
    </>
  );
}

export default App;
