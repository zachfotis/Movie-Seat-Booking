const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = parseInt(movieSelect.value);


// Initialize UI
loadSelections();
updateUI();

// --------------------- EVENT LISTENERS -------------------------
// Movie select event
movieSelect.addEventListener('change', () => {
    storeSelections();
    updateUI();
});

// Seat click event
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {

        e.target.classList.toggle('selected');
        storeSelections();
        updateUI();
    }
});

// ---------------------- FUNCTIONS -----------------------------

// UPDATE UI
function updateUI() {

    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    ticketPrice = parseInt(movieSelect.value)
    total.innerText = selectedSeatsCount * ticketPrice;
}

// STORE selections
function storeSelections() {
    // STORE movie and value
    localStorage.setItem('selectedMovieIndex', movieSelect.selectedIndex);
    localStorage.setItem('selectedMoviePrice', movieSelect.value);

    // STORE seats
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    let seatsIndex = [...selectedSeats];
    seatsIndex = seatsIndex.map((seat) => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
}

// LOAD selections
function loadSelections() {

    // Get and set the stored seats
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }
    // Get and set the stored movie
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
};
