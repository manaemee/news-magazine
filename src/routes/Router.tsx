
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Category from "./Category";
import Home from "./Home";
import Detail from "./Detail";

function Router(){
    return(
    <BrowserRouter>
        <Routes>
            <Route path={`${process.env.PUBLIC_URL}/`}  element={<Home/>}></Route>
            <Route path={`${process.env.PUBLIC_URL}/:category`} element={<Category/>}></Route>
            <Route path={`${process.env.PUBLIC_URL}/:category/:index`} element={<Detail/>}></Route>
        </Routes>
    </BrowserRouter>
        );

}
export default Router;