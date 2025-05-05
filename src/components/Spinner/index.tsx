import { Colors } from "../../utils";
import "./index.css"; // Đảm bảo bạn đã tạo file CSS

const Spinner = ({
  color = Colors.title,
  size = 24,
}: {
  color?: string;
  size?: number;
}) => (
  <div
    className="spinner-container"
    style={{
      borderTopColor: color,
      width: size,
      height: size, // Đảm bảo chiều cao
      borderWidth: 4, // Đảm bảo có border để thấy spinner
      borderStyle: "solid",
      borderRadius: "50%",
      borderTop: `4px solid ${color}`,
      borderRight: `4px solid ${color}`,
      borderBottom: "4px solid transparent",
      borderLeft: "4px solid transparent",
      animation: "spin 1s linear infinite",
    }}
  >
    <div className="spinner"></div>
  </div>
);

export default Spinner;
