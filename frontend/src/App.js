import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CheckoutShowcase from "@/pages/CheckoutShowcase";
import ProposalPage from "@/pages/ProposalPage";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<CheckoutShowcase />} />
                    <Route path="/proposta" element={<ProposalPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
