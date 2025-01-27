import React, { useState } from 'react'
import {
    useCreateProductMutation,
    useUploadProductImageMutation,
} from '../../redux/api/productApiSlice'

import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

const ProductList = () => {

    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [quantity, setQuantity] = useState('')
    const [brand, setBrand] = useState('')
    const [stock, setStock] = useState(0)        
    const [imageUrl, setImageUrl] = useState(null)
    const navigate = useNavigate()

    const [uploadProductImage] = useUploadProductImageMutation()
    const [createProduct] = useCreateProductMutation()
    const { data: categories } = useFetchCategoriesQuery()

    const uploadFileHandler = async (e) => {
        const formData = new FormData()
        formData.append('image', e.target.files[0])

        try {
            const res = await uploadProductImage(formData).unwrap()
            toast.success(res.message)
            setImage(res.image)    
            setImageUrl(res.image)
        
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    }

    // const handleSubmit = async () => {

    // }


    return (
        <div className='container xl:mx-[9rem] sm:mx-[0]'>
            <div className="flex flex-col md:flex-row ">
                {/* <AdminMenu /> */}

                <div className='md:w-3/4 p-3'>
                    <div className='h-12'>Create Product</div>

                    {imageUrl && (
                        <div className="text-center">
                            <img src={imageUrl} alt="product" className='block mx-auto max-h-[200px]' />
                        </div>
                    )}

                    {/* image */}
                    <div className="mb-3">
                        <label className='border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11'>
                            {image ? image.name : "Upload Image"}

                            <input type="file" name="image" accept='image/*' onChange={uploadFileHandler} className={!image ? "hidden" : 'text-white'} />
                        </label>
                    </div>

                    {/* all details about product */}
                    <div className='p-3'>
                        {/* for name and price */}
                        <div className="flex flex-wrap">
                            <div className="one">
                                <label htmlFor="name">Name</label><br />
                                <input type="text" className='p-2 mb-3 w-[20rem] border rounded-lg bg-[#101011] text-white' value={name} onChange={(e)=>setName(e.target.value)} />
                            </div>

                            <div className="two ml-10">
                                <label htmlFor="name block">Price</label><br />
                                <input type="number" className='p-2 mb-3 w-[20rem] border rounded-lg bg-[#101011] text-white' value={price} onChange={(e)=>setPrice(e.target.value)} />
                            </div>
                        </div>


                        {/* brand and quantity of product */}
                        <div className="flex flex-wrap">
                            <div className="one">
                                <label htmlFor="name block">Quantity</label><br />
                                <input type="number" className='p-2 mb-3 w-[20rem] border rounded-lg bg-[#101011] text-white' value={quantity} onChange={(e)=>setQuantity(e.target.value)} />
                            </div>

                            <div className="two ml-10">
                                <label htmlFor="name block">Brand</label><br />
                                <input type="text" className='p-2 mb-3 w-[20rem] border rounded-lg bg-[#101011] text-white' value={brand} onChange={(e)=>setBrand(e.target.value)} />
                            </div>
                        </div>

                        {/* description */}
                        <label htmlFor="" className='my-5'>Description</label>
                        <textarea type='text'className='p-2 mb-3 bg-[#101011] border rounded-lg w-[100%] text-white' value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>

                        {/* categroy and stock count */}
                        <div className="flex justify-between">
                            {/* for stock count */}
                            <div>
                                <label htmlFor="name block">Count in Stock</label><br />
                                <input type="text" className='p-2 mb-3 w-[25rem] border rounded-lg bg-[#101011] text-white' value={stock} onChange={(e)=>setStock(e.target.value)} />
                            </div>

                            {/* category */}
                            <div>
                                <label htmlFor="">Category</label><br />
                                <select placeholder='Choose Category' className='p-2 mb-3 w-[25rem] border rounded-lg bg-[#101011] text-white' onChange={(e)=>setCategory(e.target.value)}>
                                    {categories?.map((c)=>(
                                        <option key={c._id} value={c._id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        
                        <button className='py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600'>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductList