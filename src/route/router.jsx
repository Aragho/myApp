import Layout from "../layout/Layout";
import SignUp from "../auth/SignUp";
import Login from "../auth/login";
import ProductDetailsPage from "../pages/ProductDetailsPage"
import HomePage from "../pages/Homepage/HomePage"
import AllCategory from "../pages/AllCategory";
import DetailsPage from "../pages/DetailsPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import OrderConfirmationPage from "../pages/OrderConfirmationPage";
import Logout from "../auth/Logout";
// import ReviewForm from "../pages/ReviewForm"
// import ProductPage from "../pages/ProductPage";

const ROUTES = [

    {
        path: "/",
        element:<Layout/>,
        children:[
            {
                path: "/signup",
                element:<SignUp/>
            },
                {
                 path: "/",
                 element:<Login/>
            },
            {
                 path: "/logout",
                 element:<Logout/>
            },
           
             {
                path: "/login",
                 element:<Login/>
            },

             {
                 path: "/productDetails",
                 element:<ProductDetailsPage/>
            },
            {
                path:"/category",
                element:<AllCategory/>
            },
            
            // {
            //     path: "/",
            //     element:<Login/>
            // },
           
            // {
            //     path: "/login",
            //     element:<Login/>
            // },
            // // {
            // //     path: "/commerce",
            // //     element:<Layout/>
            // // },
             {
                 path:"/home",
                 element:<HomePage/>
             },
             {
                 path:"/details",
                 element:<DetailsPage/>
            },
            // // {
            // //     path:"/review",
            // //     element:<ReviewForm/>
            // // },
             {
                 path:"/cart",
                 element:<CartPage/>
            },
             {
                 path:"/checkout",
                 element:<CheckoutPage/>
            },
             {
                 path:"/confirm",
                 element:<OrderConfirmationPage/>
            },
            // // {
            // //     path:"/productreview",
            // //     element:<ProductPage/>
            // // }
            
           
            
        
        ]
    },
]
export default ROUTES;