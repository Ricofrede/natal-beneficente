import {
    Routes,
    Route
} from "react-router-dom";

import {
    MainPage
} from './pages'

export default function Router() {
    return (
        <Routes>
            <Route path="/:id" element={<MainPage />} />
            <Route path="/" element={<MainPage />} />
        </Routes>
    )
}
