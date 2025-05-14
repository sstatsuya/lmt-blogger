import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ConfirmModalProps {
  onClose: () => void;
  content: string;
}

const ConfirmModal = ({ onClose, content }: ConfirmModalProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false); // bắt đầu zoomOut
  };

  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => {
        onClose(); // đợi animation xong mới gọi onClose từ cha
      }, 300); // khớp với duration trong transition

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
        animate={
          isVisible ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }
        }
        transition={{ type: "spring", duration: 0.3 }}
        className="bg-primary rounded-xl p-6 shadow-lg w-[90%] max-w-md relative"
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl"
        >
          ×
        </button>
        <p className="text-white" >{content}</p>
      </motion.div>
    </div>
  );
};

export default ConfirmModal;
