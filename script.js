const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(occupied)");
const count = document.querySelector("#count");
const total = document.querySelector("#total");
const movieSelect = document.querySelector("#movie");

populateUI();

let ticketPrice = +movieSelect.value;

//Seçilen filmin indexini ve ücretini kaydetme
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Gidilecek film sayısı ve ücretini güncelleme
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const numOfSelectedSeats = selectedSeats.length;

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  count.innerText = numOfSelectedSeats;
  total.innerText = numOfSelectedSeats * ticketPrice;
}

// LocalStorage dan veri çekme
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if(selectedSeats !== null && selectedSeats.length > 0){
    seats.forEach((seat, index) =>{
      if(selectedSeats.indexOf(index) > -1){
        seat.classList.add("selected")
      }
    })
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if(selectedMovieIndex !== null){
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//Film seçildiğinde
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;

  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

//Koltuklara tıklandığında
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});


//Başlangıçta localstroge dan veri çekerek seçili koltuk miktarı ve ücretini gösterme
updateSelectedCount();