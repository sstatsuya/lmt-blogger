
// export const DOMAIN = 'https://unreal-bach-hoa-xanh-sever.vercel.app'
// const LOCAL_HOST = '192.168.110.147';
// const LOCAL_HOST = '172.20.10.7';



export const AUTHEN_DOMAIN = `https://authen-nodejs.vercel.app`;
export const DOMAIN = `https://lmt-blog-server.vercel.app`;
// export const AUTHEN_DOMAIN = `http://${LOCAL_HOST}:3000`;
// export const DOMAIN = `http://${LOCAL_HOST}:3001`;
// export const LMT_DOMAIN = `http://${LOCAL_HOST}:3002`;

// export const AUTHEN_DOMAIN = `http://${LOCAL_HOST}:3000`;
// export const DOMAIN = `http://${LOCAL_HOST}:3001`;
// export const LMT_DOMAIN = `http://${LOCAL_HOST}:3002`;



// ===== User =====
export const REGISTER = `${AUTHEN_DOMAIN}/authen/account/register`;
export const LOGIN = `${AUTHEN_DOMAIN}/authen/account/login`;
export const LOGOUT = `${AUTHEN_DOMAIN}/authen/account/logout`;
export const GET_USER_INFO = `${AUTHEN_DOMAIN}/authen/account/getUserInfo`;
export const UPDATE_PROFILE = `${AUTHEN_DOMAIN}/user/update-profile`;
export const SEND_OTP = `${AUTHEN_DOMAIN}/authen/account/send-otp`;
export const CONFIRM_OTP = `${AUTHEN_DOMAIN}/authen/account/confirm-otp`;
export const CREATE_NEW_PASSWORD = `${AUTHEN_DOMAIN}/authen/account/create-new-password`;

// ===== Post =====
export const GET_ALL_POST = `${DOMAIN}/post/posts`;
export const CREATE_POST = `${DOMAIN}/post/create-post`;
export const GET_POST_BY_ID = `${DOMAIN}/post/view`;