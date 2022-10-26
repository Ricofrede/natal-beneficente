import {
    Routes,
    Route
} from "react-router-dom";

import {
    MainPage
} from './pages'

import ScrollToTop from "./utils/ScrollToTop";

export default function Router() {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/:id" element={<MainPage />} />
                <Route path="/" element={<MainPage />} />
            </Routes>
        </>
    )
}
