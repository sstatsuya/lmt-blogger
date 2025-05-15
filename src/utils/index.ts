//@ts-ignore
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // Import CSS của NProgress

export const generateRandomId = () => {
  return "heading-" + Math.random().toString(36).substr(2, 9); // tạo id ngẫu nhiên
};

export const addRandomIdsToHeadings = (html: string) => {
  // Chuyển đổi HTML thành DOM object
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // Tìm tất cả các h1, h2, h3 trong DOM
  const headings = doc.querySelectorAll("h1, h2, h3");

  headings.forEach((heading) => {
    // Kiểm tra xem phần tử đã có id chưa
    if (!heading.id) {
      // Nếu chưa có id, thêm id ngẫu nhiên
      heading.id = generateRandomId();
    }
  });

  // Trả về HTML đã được cập nhật
  return doc.body.innerHTML;
};

import * as Toast from "./Toast";
export { Toast };
export * from "./styles";

// Hàm bắt đầu thanh progress
export const startPageProgress = (): void => {
  NProgress.start();
};

// Hàm dừng thanh progress
export const stopPageProgress = (): void => {
  NProgress.done();
};

export const configurePageProgress = (): void => {
  NProgress.configure({ showSpinner: false });
};
