import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CheckoutShowcase from "@/pages/CheckoutShowcase";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<CheckoutShowcase />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
