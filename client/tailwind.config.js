/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/Pages/Home.js",
    "./src/Components/Navbar.js",
    "./src/Pages/Login.js",
    "./src/Pages/Register.js",
    "./src/Pages/Dashboard.js",
    "./src/Components/FlightCard.js",
    "./src/Pages/ExploreFlight.js",
    "./src/Components/SearchBar.js",
    "./src/Pages/NewTicket.js",
    "./src/Components/TicketCard.js",
    "./src/Pages/BookFlight.js",
    "./src/Pages/NewPassenger.js",
    "./src/Pages/Admin.js"
  ],
  theme: {
    extend: {
      spacing: {
        '128': '80vw',
      }
    },
  },
  plugins: [],
}

