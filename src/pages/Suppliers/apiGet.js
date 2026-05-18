import axios from "axios";

export default async function getSuppliers(){
    try{
    const token = localStorage.getItem("token")
    if(!token) throw new Error("no token found")
    const res = await axios.get("/api/suppliers" , {headers:{Authorization:`Bearer ${token}`}})
    const data = res.data?.data
    if(!data) return []
    return data    
}
catch(e){
    console.error(e)
    return []
}
}