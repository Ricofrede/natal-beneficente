import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

import {
    MainPage
} from './pages'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/:id" element={<MainPage />} />
                <Route path="/" element={<MainPage />} />
            </Routes>
        </BrowserRouter >
    )
}
