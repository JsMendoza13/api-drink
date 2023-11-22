import { useState, useEffect } from "react";
import { ContextCocktail } from "./components/ContextCocktail";

import { RiArrowUpCircleFill, RiGithubFill } from "react-icons/ri";

function App() {
  const [userInput, setUserInput] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [contextCocktails, setContextCocktails] = useState([]);

  const url = "https://thecocktaildb.com/api/json/v1/1/search.php?s=";

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //Se genera una funcion para guardar una key una en la Api
  const generateUniqueKey = () => {
    return new Date().getTime().toString();
  };

  const handleSearch = () => {
    if (userInput.trim() === "") {
      setContextCocktails([]);
      setSearchResult("You must write the name of a cocktail...");

      setTimeout(() => {
        window.location.reload();
      }, 4000);
    } else {
      // Limpiar los cocteles antes de realizar la nueva búsqueda
      setContextCocktails([]);

      fetch(url + userInput)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Puedes manejar los resultados de la API aquí y actualizar setSearchResult
        })
        .catch((error) => {
          console.error("Error in the application:", error);
        });
    }
  };

  useEffect(() => {
    const usedKeys = new Set(); //En esta variable se guardan las Key que se estan usando de la API

    // lógica Obtener los datos de la API y mostrar 10 resultados
    const generateContextCocktails = () => {
      const numberOfContextCocktails = 10;
      return Array.from({ length: numberOfContextCocktails }, () => {
        //Se llama la funcion donde se genera la Key unica y se almacena
        let newKey = generateUniqueKey();
        //Se crea el bucle para saber si ya esta siendo usada y si no generar una nueva
        while (usedKeys.has(newKey)) {
          newKey = generateUniqueKey();
        }
        //Agrega la nueva al conjunto
        usedKeys.add(newKey);

        return (
          <div key={newKey} className="div__contextCocktail">
            <ContextCocktail />
          </div>
        );
      });
    };

    const newContextCocktails = generateContextCocktails();
    setContextCocktails(newContextCocktails);
  }, []); // El array vacío este argumento asegura que este efecto solo se ejecute una vez al montar el componente

  return (
    <>
      <header>
        <a className="nav__title" href="/">
          API Cocktails 🍷
        </a>

        <div className="search-container">
          <input
            type="text"
            placeholder="Find your drink..."
            id="search-inp"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button id="btn-search" onClick={handleSearch}>
            Search
          </button>
        </div>
      </header>
      {searchResult && <span className="msg">{searchResult}</span>}
      <section className="section__cocktail">
        <div id="result"></div>
        {contextCocktails}
      </section>
      <footer>
        <a
          href="https://github.com/JsMendoza13"
          target="_blank"
          rel="noreferrer"
        >
          <RiGithubFill className="RiGithubFill" />
        </a>
        <a href="#" onClick={handleScrollToTop}>
          <RiArrowUpCircleFill className="RiArrowUpCircleFill" />
        </a>
      </footer>
    </>
  );
}

export default App;
