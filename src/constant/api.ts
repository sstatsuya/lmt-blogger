
// export const DOMAIN = 'https://unreal-bach-hoa-xanh-sever.vercel.app'
const LOCAL_HOST = 'localhost';
// const LOCAL_HOST = '192.168.110.147';
// const LOCAL_HOST = '172.20.10.7';



export const AUTHEN_DOMAIN = `https://authen-nodejs.vercel.app`;
export const DOMAIN = `https://unreal-bach-hoa-xanh-sever.vercel.app`;
export const LMT_DOMAIN = `https://lmt-server.vercel.app`;
// export const AUTHEN_DOMAIN = `http://${LOCAL_HOST}:3000`;
// export const DOMAIN = `http://${LOCAL_HOST}:3001`;
// export const LMT_DOMAIN = `http://${LOCAL_HOST}:3002`;

// export const AUTHEN_DOMAIN = `http://${LOCAL_HOST}:3000`;
// export const DOMAIN = `http://${LOCAL_HOST}:3001`;
// export const LMT_DOMAIN = `http://${LOCAL_HOST}:3002`;

// ===== Category =====
export const GET_ALL_CATEGORY = `${DOMAIN}/category/all`;
export const ADD_CATEGORY = `${DOMAIN}/category/add`;
export const DELETE_CATEGORY = `${DOMAIN}/category/delete`;
export const UPDATE_CATEGORY = `${DOMAIN}/category/update`;

// ===== Product =====
export const GET_ALL_PRODUCT = `${DOMAIN}/product/all`;
export const ADD_PRODUCT = `${DOMAIN}/product/add`;
export const UPDATE_PRODUCT = `${DOMAIN}/product/update`;
export const DELETE_PRODUCT = `${DOMAIN}/product/delete`;

// ===== User =====
export const REGISTER = `${AUTHEN_DOMAIN}/authen/account/register`;
export const LOGIN = `${AUTHEN_DOMAIN}/authen/account/login`;
export const LOGOUT = `${AUTHEN_DOMAIN}/authen/account/logout`;
export const GET_USER_INFO = `${AUTHEN_DOMAIN}/authen/account/getUserInfo`;
export const UPDATE_PROFILE = `${AUTHEN_DOMAIN}/user/update-profile`;
export const SEND_OTP = `${AUTHEN_DOMAIN}/authen/account/send-otp`;
export const CONFIRM_OTP = `${AUTHEN_DOMAIN}/authen/account/confirm-otp`;
export const CREATE_NEW_PASSWORD = `${AUTHEN_DOMAIN}/authen/account/create-new-password`;

// ===== Cart =====
export const GET_CART_BY_USER = `${DOMAIN}/cart/cart-by-user`;

// ===== Voucher =====
export const GET_USER_VOUCHER = `${DOMAIN}/voucher/get-by-user`;

// ===== Alert =====
export const GET_USER_ALERT = `${LMT_DOMAIN}/department-store`;

// ===== Media =====
export const UPLOAD_IMAGE = `${LMT_DOMAIN}/upload/market-online/image`;
