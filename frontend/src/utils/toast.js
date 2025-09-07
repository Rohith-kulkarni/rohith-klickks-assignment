import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (message, type = "success") => {
  if (type === "success") {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });
  } else {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });
  }
};
