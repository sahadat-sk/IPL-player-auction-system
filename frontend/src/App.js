import "./App.css";
import Navbar from "./headers/navBar.js";
import Footer from "./footers/footer.js";
import Landingpage from "./landingPage/landingPage.js";

function App() {
    return (
        <>
            <Navbar></Navbar>
            <main>
                <Landingpage></Landingpage>
            </main>
                <Footer></Footer>
        </>
    );
}

export default App;
