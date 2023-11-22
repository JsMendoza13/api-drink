import { useState, useEffect } from "react";
import { RiArrowUpCircleFill, RiGithubFill } from "react-icons/ri";

function App() {
  const [userInput, setUserInput] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [errorSearch, setErrorSearch] = useState("");
  const [contextCocktails, setContextCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = "https://thecocktaildb.com/api/json/v1/1/search.php?s=";
  const urlRandom = "https://thecocktaildb.com/api/json/v1/1/random.php";

  //funcion de scroll del btn flecha del footer
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //Se genera una funcion una clave unica en el array de keys
  const generateUniqueKey = () => {
    return new Date().getTime().toString();
  };

  //funcion para traer los ingredientes, clasificarlos para no mostrar
  //los null
  const createIngredients = (myDrink) => {
    const ingredients = [];
    let count = 1;

    for (let i in myDrink) {
      let ingredient = "";
      let measure = "";

      if (i.startsWith("strIngredient") && myDrink[i]) {
        ingredient = myDrink[i];

        if (myDrink[`strMeasure${count}`]) {
          measure = myDrink[`strMeasure${count}`];
        } else {
          measure = "";
        }
        count += 1;
        ingredients.push(`${measure} ${ingredient}`);
      }
    }

    return ingredients;
  };

  //metodo handle para la busqueda de un coctel
  const handleSearch = () => {
    if (userInput.trim() === "") {
      //se limpian resultados si es que existen
      setContextCocktails([]);
      setSearchResult([]);
      //y si el campo esta vacio se lanza un mensaje
      setErrorSearch(
        <span className="msg">You must write the name of a cocktail...</span>
      );

      //al dar click al btn buscar se recarga la pagina a los 4s
      //  setTimeout(() => {
      //     window.location.reload();
      //   }, 4000);
    } else {
      //al buscar se muestra el loading
      setLoading(true);
      // Limpiar los cocteles antes de realizar la nueva búsqueda
      setContextCocktails([]);
      setSearchResult([]);
      setErrorSearch([]);

      //funcion para cargar la busqueda del pues de un setTimeout
      const timeoutId = setTimeout(() => {
        fetch(url + userInput)
          .then((response) => response.json())
          .then((data) => {
            const myDrink = data.drinks[0];
            const ingredients = createIngredients(myDrink);

            //Se crea el resultado de la busqueda en un div con sus elementos
            setSearchResult(
              <>
                <div className="div__search_card">
                  <div className="div__SearchCocktail">
                    <img src={myDrink.strDrinkThumb} alt={myDrink.strDrink} />
                    <div className="overlay">
                      <div className="overlay__cocktail_info">
                        <h2>{myDrink.strDrink}</h2>
                        <div className="div__cocktail__ingre">
                          <h3>Ingredients: 🥝</h3>
                          <ul>
                            {ingredients.map((ingredient, index) => (
                              <li key={index}>{ingredient}</li>
                            ))}
                          </ul>
                          <h3>Get it ready 🤩</h3>
                          <p>{myDrink.strInstructions}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })
          //se muestra un error, si algo sale mal
          .catch((error) => {
            console.error("Error in the application:", error);
            setErrorSearch(
              <span className="msg">
                Error in the application. Please try again.
              </span>
            );
          })
          //al finalizar de cargar lo anterior se ciera el loading
          .finally(() => {
            clearTimeout(timeoutId);
            setLoading(false);
          });
      }, 1500); //tiempo que dura el loading
    }
  };

  useEffect(() => {
    const usedKeys = new Set(); //En esta variable se guardan las Key que se estan usando de la API

    const fetchData = async () => {
      setLoading(true); //al cargar la web se muestra el loading

      // se crea un try catch oara generar 10 elementos
      try {
        const numberOfContextCocktails = 10;
        //Aqui se realizan varias peticiones asincronas para esperar que sean devuelta antes de continuar
        const newContextCocktails = await Promise.all(
          Array.from({ length: numberOfContextCocktails }, async () => {
            let newKey = generateUniqueKey();

            while (usedKeys.has(newKey)) {
              //si se encuentra un id repetido entre los que trae se busca otro diferente y se guarda en el array
              newKey = generateUniqueKey();
            }

            usedKeys.add(newKey);

            try {
              const cocktailResponse = await fetch(urlRandom); //se hace la peticion a la api por medio de la url
              const cocktailData = await cocktailResponse.json(); //se analiza y extrae la informacion del json que se consulta
              const myDrink = cocktailData.drinks[0]; // se toma el primer elemento
              const ingredients = createIngredients(myDrink); //se llama a la funcion de ingredientes
              //se genera el div con los resultados
              return (
                <div key={newKey} className="div__contextCocktail">
                  <div className="div__SearchCocktail">
                    <img src={myDrink.strDrinkThumb} alt={myDrink.strDrink} />
                    <div className="overlay">
                      <div className="overlay__cocktail_info">
                        <h2>{myDrink.strDrink}</h2>
                        <div className="div__cocktail__ingre">
                          <h3>Ingredients: 🥝</h3>
                          <ul>
                            {ingredients.map((ingredient, index) => (
                              <li key={index}>{ingredient}</li>
                            ))}
                          </ul>
                          <h3>Get it ready 🤩</h3>
                          <p>{myDrink.strInstructions}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            } catch (error) {
              //se atrapa el error si ocurre
              console.error("Error fetching cocktail:", error);

              return null;
            }
          })
        );

        setContextCocktails(newContextCocktails); //del estado useState se muestra la peticion anterior
      } finally {
        setLoading(false); //se cierra el loading
      }
    };

    const timeoutId = setTimeout(() => {
      fetchData(); //Aqui se llama la funcion donde se esta realizando operaciones asincronas en la api
    }, 1850); //tiempo del loading

    return () => clearTimeout(timeoutId);
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
      {loading && (
        <div className="div__loading">
          {" "}
          <span className="loader"></span>
        </div>
      )}
      <section className="section__cocktail">
        <div id="result">{searchResult}</div>
        {!loading && contextCocktails}
        {errorSearch}
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
