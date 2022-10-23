import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

import {
    HomePage,
    MainPage
} from './pages'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/:id" element={<MainPage />} />
                <Route path="/" element={<HomePage />} />
            </Routes>
        </BrowserRouter >
    )
}
