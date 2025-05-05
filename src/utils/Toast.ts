import { toast } from "react-toastify"; // Import toast và ToastContainer
import { Colors } from "./styles";

export const show = ({
  text,
  duration = 2000,
}: {
  text: string;
  duration?: number;
}) => {
  toast.success(text, {
    position: "top-right",
    autoClose: duration,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    style: {
      borderColor: Colors.title, // Màu nền tùy chỉnh,
      padding: 10,
      minHeight: 0,
      backgroundColor: "#0b0736",
      color: "white",
      fontSize: 14,
    },
    icon: false,
  });
};
