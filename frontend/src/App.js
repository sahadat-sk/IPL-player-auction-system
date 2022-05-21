import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./headers/navBar.js";
import Footer from "./footers/footer.js";
import Landingpage from "./landingPage/landingPage.js";
import LoginPage from "./pages/loginPage.js";
import SignupPage from "./pages/signupPage.js";
import MainPage from "./pages/mainPage";

function App() {
    return (
        <Router>
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Landingpage />} exact />
                    <Route path="/signup" element={<LoginPage />} />
                    <Route path="/login" element={<SignupPage />} />
                    <Route path="/mainpage" element={<MainPage/>} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
