let errDiv;

const restMagicApi = axios.create({
  baseURL: "https://api.scryfall.com/cards/named?exact="
});

function getMagicInfo(theName) {
  console.log(theName)
  restMagicApi
    .get(theName)
    .then(responseFromAPI => {
      console.log("Response from API is: ", responseFromAPI.data);
      removeErrDiv();
      const cardName = responseFromAPI.data.name;
      const cardImage = responseFromAPI.data.image_uris.png;
      const cardDesc = responseFromAPI.data.oracle_text;
      const cardRarity = responseFromAPI.data.rarity
      const cardPrice = responseFromAPI.data.prices.eur ////mas de un valor ?
      const release = responseFromAPI.data.released_at
      const manaCost = responseFromAPI.data.mana_cost
      const colorId = responseFromAPI.data.color_identity
      const legS = responseFromAPI.data.legalities.standard
      const legL = responseFromAPI.data.legalities.legacy


      // instead in the console, show data in the browser using JS DOM manipulation:
      document.getElementById("cardName").innerHTML = cardName;
      document.getElementById("cardImage").src = cardImage;
      document.getElementById("cardDesc").innerHTML = cardDesc
      document.getElementById("rarity").innerHTML = ` <strong>Rarity:</strong> ${cardRarity}`;
      document.getElementById("release").innerHTML = `<strong>Release:</strong> ${release}`;
      document.getElementById("manaCost").innerHTML = `<strong>Mana cost:</strong> ${manaCost}`
       document.getElementById("colorId").innerHTML = `<strong>Color:</strong> ${colorId}`
      document.getElementById("legS").innerHTML = `<strong>Standard:</strong> ${legS}`
      document.getElementById("legL").innerHTML = `<strong>Legacy:</strong> ${legL}`
      document.getElementById("price").innerHTML = `<strong>Price:</strong> ${cardPrice}<strong> €</strong>`;
    })
    .catch(err => {
      if (err.response.status === 404) {
        removeCardInfo();
        createDiv();
        const theErr = document.createTextNode(`Carta no encontrada `);
        errDiv.appendChild(theErr);
      } else {
        console.log("err => ", err);
      }
    });
}

function createDiv() {
  errDiv = document.createElement("div");
  errDiv.setAttribute("id", "error");
  document.body.appendChild(errDiv);
}

function removeErrDiv() {
  if (document.getElementById("error")) {
    const error = document.getElementById("error");
    error.parentNode.removeChild(error);
  }
}

function removeCardInfo() {
  document.getElementById("cardName").innerHTML = "";
  document.getElementById("cardId").innerHTML = "";
}

function checkInput() {
  removeErrDiv();
  if (document.getElementById("theInput").value === "") {
    document.getElementById("theButton").disabled = true;
    removeCardInfo();
    createDiv();
    const theErr = document.createTextNode(`Wanna input something? `);
    errDiv.appendChild(theErr);
  } else {
    document.getElementById("theButton").disabled = false;
  }
}
