import React from "react";
import '../styles/Home.css'
import { Link } from "react-router-dom";

const Home = () => {

    return (
        <main>
            <div id="main-section">
                <section id="header-n-intro">
                    <h1 id="header">Hi Cinephile!</h1>
                    <p id="intro">
                    Welcome to our cinematic universe, where every frame tells a story, every scene sparks imagination, and every character becomes an unforgettable journey. Dive into the magic of storytelling as our movie website invites you on an extraordinary adventure through the realms of film.
                    </p>
                </section>
                <section id="options">
                    <Link to={'/categories/movies-coming'}><article className="option" id="option1"></article></Link>
                    <Link to={'/categories/movies-in-theaters'}><article className="option" id="option2"></article></Link>
                    <Link to={'/categories/top-rated-india'}><article className="option" id="option3"></article></Link>
                    <Link to={'/categories/top-rated-movies'}><article className="option" id="option4"></article></Link>                                         
                </section>
            </div>
        </main>
    )
}

export default Home;