import axios from "axios";
const exampleUserRegister = {
  name: "john doe",
  email: "doe@example.com",
  password: "password",
  password_confirmation: "password",
};

const exampleUserLogin = {
  email: "doe@example.com",
  password: "password",
};

/**
 * @typedef {Object} AuthError
 * @property {string} message
 * @property {number} status
 */

/**
 * @typedef {Object} RegisterPayload
 * @property {string} name
 * @property {string} email
 * @property {string} password
 * @property {string} password_confirmation
 */

/**
 * @typedef {Object} LoginPayload
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} RegisterResult
 * @property {boolean} success
 * @property {AuthError | null} error
 */

/**
 * @typedef {Object} LoginResult
 * @property {string | null} data
 * @property {AuthError | null} error
 */

/**
 * @param {RegisterPayload} [data=exampleUserRegister]
 * @returns {Promise<RegisterResult>}
 */
export async function register(data = exampleUserRegister) {
  try {
    const res = await axios.post("/api/auth/register", data);
    console.info("register : \n", res.data);
    return { success: true, error: null };
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error(e);

      return {
        success: false,
        error: {
          message: e.response?.data?.message ?? e.message ?? "Request failed",
          status: e.response?.status ?? e.status ?? 500,
        },
      };
    } else {
      return {
        success: false,
        error: { message: "Network error", status: 500 },
      };
    }
  }
}

/**
 * @param {LoginPayload} [data=exampleUserLogin]
 * @returns {Promise<LoginResult>}
 */
export async function login(data = exampleUserLogin) {
  try {
    const res = await axios.post("/api/auth/login", data);
    const token = res.data?.data?.token;
    if (!token) {
      return {
        data: null,
        error: { message: "Missing auth token in response", status: 500 },
      };
    }

    console.info("login : \n", res.data);
    return { data: token, error: null };
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error(e);

      return {
        data: null,
        error: {
          message: e.response?.data?.message ?? e.message ?? "Request failed",
          status: e.response?.status ?? e.status ?? 500,
        },
      };
    } else {
      return { data: null, error: { message: "Network error", status: 500 } };
    }
  }
}
/*
 * @param {string} token
 * @returns {Promise<{data: Object|null, error: AuthError|null}>}
 * **/
export async function getUserProfile(token) {
  try {
    const res = await axios.get("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const user = res.data?.data;
    if (!user) {
      return {
        data: user,
        error: { message: "Missing user data in response", status: 500 },
      };
    }
    return { data: user, error: null };
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return {
        data: null,
        error: {
          message: e.response?.data?.message ?? e.message ?? "Request failed",
          status: e.response?.status ?? e.status ?? 500,
        },
      };
    } else {
      return { data: null, error: { message: "Network error", status: 500 } };
    }
  }
}
export async function getInvoices(token, status ) {
  try {
    const res = await axios.get("/api/invoices", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: 
        status? { status } : {},
      
    });

    return {
      data: res.data.data,
      error: null,
    };
  } catch (e) {
    return {
      data: null,
      error: {
        message: e.response?.data?.message || "Request failed",
        status: e.response?.status || 500,
      },
    };
  }
}
export  async function getInvoiceById(token,id) {
  try{
    const res=await axios.get(`/api/invoices/${id}`,{

      headers:{
        Authorization: `Bearer ${token}`,
      }
    })
    return {data:res.data.data.invoice, error:null}
  }
  catch(e){
    return{
      data:null,
      error:{message:e.message,status:500}
    }
  }
  
}
export async function addPayement(token,id,data) {

  try{
      const res=await axios.post(`/api/${id}/payments`,
        data,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
          
        }
      )
return{data:res.data.data, error:null}

  }
  catch(e){
    return{
      data:null,
      error:{message:e.message, status:500}
    }
  }
  
}


export default { register, login, getUserProfile,getInvoices,getInvoiceById,addPayement };
