import React, { useEffect, useState } from 'react'
import {
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetProductByIdQuery,
    useUploadProductImageMutation,
} from '../../redux/api/productApiSlice'
import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router'


const ProductUpdate = () => {

    const params = useParams

    const {data: productData} = useGetProductByIdQuery(params._id)

    const [image, setImage] = useState(productData?.image || "")
    const [name, setName] = useState(productData?.name || "")
    const [description, setDescription] = useState(productData?.description || "")
    const [price, setPrice] = useState(productData?.price || "")
    const [quantity, setQuantity] = useState(productData?.quantity || "")
    const [category, setCategory] = useState(productData?.category || "")
    const [brand, setBrand] = useState(productData?.brand || "")
    const [stock, setStock] = useState(productData?.constInStock || "")

    const navigate = useNavigate()

    const {data: categories = []} = useFetchCategoriesQuery()
    const [uploadProductImage] = useUploadProductImageMutation()
    const [uploadProduct] = useUpdateProductMutation()
    const [deleteProduct] = useDeleteProductMutation()

    useEffect(()=>{
        if(productData && productData._id){
            setName(productData.name);
            setDescription(productData.description);
            setPrice(productData.price);
            setCategory(productData.category);
            setQuantity(productData.quantity);
            setBrand(productData.brand);
            setImage(productData.image);
            setStock(productData.stock);
        }
    }, [productData])


    return (
        <div>ProductUpdate</div>
    )
}

export default ProductUpdate