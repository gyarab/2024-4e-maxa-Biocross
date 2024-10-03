// import React, { useState, useEffect } from "react";
// import "./App.css";

// function App() {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     fetch("http://localhost:5000/welcome")
//       .then((res) => res.json())
//       .then((data) => setMessage(data.message));
//   }, []);

//   return (
//     <div className="App">
//       <h1>{message}</h1>
//     </div>
//   );
// }
import "./App.css";
import Nav from "./Nav";
import { BrowserRouter } from "react-router-dom";

function App() {
  return(
    <div className="App">
    <header className="App-header">
      <h1>Welcome to BioCross</h1>
    </header>

    <nav className="App-nav">
      <BrowserRouter >
      <Nav />
      </BrowserRouter >

      <a href="#home">Home</a>
      <a href="#about">Crossing</a>
      <a href="#services">Classrooms</a>
      <a href="#contact">Login</a>
    </nav>

    {/* <section className="App-hero">
      <h2>Your Hero Section</h2>
    </section> */}

    <section className="App-content">
      <h2>Main Content</h2>
      <p>
        This is a simple, responsive homepage layout built with React.js. Resize the browser window
        to see how the layout adapts to different screen sizes.
      </p>
    </section>

    <footer className="App-footer">
      <p>© 2024 Biocross</p>
    </footer>
  </div>
  );
}
export default App