import {Outlet} from "react-router-dom";
import Header from "./Header/Header.tsx";

const Layout = () => {
    return (<div className="flex flex-col overflow-hidden relative">

        {/*Header component */}
        <Header/>

        <div className="flex flex-col flex-1 overflow-auto">
            <div className="flex-1 flex-col min-h-0">
                <div className="p-4 mt-20">

                    {/*Router Outlet*/}
                    <Outlet/>

                </div>
            </div>
        </div>
    </div>)
}

export default Layout