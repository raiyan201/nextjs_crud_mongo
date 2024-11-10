import axios from "axios"

export  async function currentUser(){
    const result =await axios.get('/api/current')
    .then((response)=>response.data)
    console.log('curretUser_userServices',result)
    return result
}
