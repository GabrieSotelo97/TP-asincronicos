window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  // Aqui debemos agregar nuestro fetch

  fetch('http://localhost:3031/api/movies')
  .then(response =>
    response.json()
  )
  .then(peliculas =>{
    let data = peliculas.data;

    if(!localStorage.getItem("favoritas")){
      const favoritas =[]
      localStorage.setItem("favoritas", JSON.stringify(favoritas))
    }

    data.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      const bttn = document.createElement("button");
      bttn.innerText = "favorita";
      bttn.setAttribute("class", "botonAgregar")
      bttn.setAttribute("id" ,movie.id)

      bttn.addEventListener("click",(e)=>{
        e.preventDefault()
        let favoritas = JSON.parse(localStorage.getItem("favoritas"))

        if(!favoritas.find(favorita => favorita.id === +e.target.id)){
          favoritas.push(movie)
          bttn.classList.add("disable")

        }else{
          favoritas = favoritas.filter(favorita => favorita.id !== +e.target.id)
          bttn.classList.remove("disable")
        }


        localStorage.setItem("favoritas", JSON.stringify(favoritas))


      })

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      

      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);

      card.appendChild(bttn);
    });
  })
  .catch(error =>{
    alert(error)
  })


    
  
};
