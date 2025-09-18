import axios from "../utils/axios";

export const registerUser = async(formData) => {
    const res = await axios.post("/user/create",formData)
    return res;
}

export const addProductWithImage = async(product,image) => {
    const formData = new FormData()
    formData.append("name",product.name)
    formData.append("amount",product.price)
    formData.append("description",product.description)

    if(image){
        formData.append("image",image)
    }
    const res = await axios.post('/product/add',formData,{
        headers:{

        }
    })
    return res
}

export const getUser = async() => {
    const res = await axios.get("/user/list")
    console.log(res)
    return res.data
}

export const getProduct = async() => {
    const res = await axios.get("/product/list")
    return res.data
}

