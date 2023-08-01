import React from "react";
import Header from "./components/Header/Header";
import AppRoutes from "./components/Routes/Routes";
import Footer from "./components/Footer/Footer";

import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
   return (
   <div className="app"> 
      <Header />
      
      <div className="container">
         <Sidebar />
         <AppRoutes />
      </div>

      <Footer />
   </div>
   )
}

export default App;