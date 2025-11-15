"use client";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
// import { Bounce, ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
      {/* <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />{" "} */}
    </Provider>
  );
};

export default Providers;
