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
import AdminMenu from './AdminMenu'


const ProductUpdate = () => {

    const params = useParams()

    const { data: productData, refetch } = useGetProductByIdQuery(params._id)
    // console.log(productData)

    const [image, setImage] = useState(productData?.image || "")
    const [name, setName] = useState(productData?.name || "")
    const [description, setDescription] = useState(productData?.description || "")
    const [price, setPrice] = useState(productData?.price || "")
    const [quantity, setQuantity] = useState(productData?.quantity || "")
    const [category, setCategory] = useState(productData?.category)
    const [brand, setBrand] = useState(productData?.brand || "")
    const [stock, setStock] = useState(productData?.constInStock || "")

    const navigate = useNavigate()

    const { data: categories = [] } = useFetchCategoriesQuery()
    const [uploadProductImage] = useUploadProductImageMutation()
    const [uploadProduct] = useUpdateProductMutation()
    const [deleteProduct] = useDeleteProductMutation()

    useEffect(() => {
        if (productData && productData._id) {
            setName(productData.name);
            setDescription(productData.description);
            setPrice(productData.price);
            setCategory(productData.category);
            setQuantity(productData.quantity);
            setBrand(productData.brand);
            setImage(productData.image);
            setStock(productData.constInStock);
        }
    }, [productData])


    const uploadFileHandler = async (e) => {
        const formData = new FormData()
        formData.append('image', e.target.files[0])

        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success("Item uploaded successfully")
            setImage(res.image)
            refetch();

        } catch (error) {
            toast.error("Item not added")
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()

        try {
            const formData = new FormData()
            formData.append('image', image)
            formData.append('name', name)
            formData.append('description', description)
            formData.append('price', price)
            formData.append('category', category)
            formData.append('quantity', quantity)
            formData.append('brand', brand)
            formData.append('constInStock', stock)

            const { data } = await uploadProduct({ productId: params._id, formData })

            if (data.error) {
                toast.error(data.error)
            } else {
                toast.success(`Product successfully updated`)
                navigate('/admin/allproductslist')
                refetch();
            }

        } catch (error) {
            console.error(error)
            toast.error("Product update failed")
        }
    }


    const handleDelete = async () => {
        try {
            let ans = window.confirm('Are you sure you want to delete this product?')
            if (!ans) return;

            const { data } = await deleteProduct(params._id)
            toast.success(`${data.name} deleted successfully`)
            navigate('/admin/allproductslist')
            refetch();

        } catch (error) {
            console.error(error)
            toast.error("Product delete failed")
        }
    }


    return (
        <div className='container xl:mx-[9rem] sm:mx-[0]'>
            <div className="flex flex-col md:flex-row ">
                <AdminMenu />

                <div className='md:w-3/4 p-3'>
                    <div className='h-12 text-2xl mb-5 mt-11'>Update Product</div>

                    {image && (
                        <div className="text-center">
                            <img src={image} alt="product" className='block mx-auto max-h-[200px]' />
                        </div>
                    )}

                    {/* image */}
                    <div className="mb-3">
                        <label className='border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11'>
                            {image ? image.name : "Upload Image"}

                            <input type="file" name="image" accept='image/*'
                                onChange={uploadFileHandler}
                                className={!image ? "hidden" : 'text-white'} />
                        </label>
                    </div>

                    {/* all details about product */}
                    <div className='p-3'>
                        {/* for name and price */}
                        <div className="flex flex-wrap">
                            <div className="one">
                                <label htmlFor="name">Name</label><br />
                                <input type="text" className='p-2 mb-3 w-[20rem] border rounded-lg bg-[#101011] text-white' value={name} onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className="two ml-10">
                                <label htmlFor="name block">Price</label><br />
                                <input type="number" className='p-2 mb-3 w-[20rem] border rounded-lg bg-[#101011] text-white' value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>
                        </div>


                        {/* brand and quantity of product */}
                        <div className="flex flex-wrap">
                            <div className="one">
                                <label htmlFor="name block">Quantity</label><br />
                                <input type="number" className='p-2 mb-3 w-[20rem] border rounded-lg bg-[#101011] text-white' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                            </div>

                            <div className="two ml-10">
                                <label htmlFor="name block">Brand</label><br />
                                <input type="text" className='p-2 mb-3 w-[20rem] border rounded-lg bg-[#101011] text-white' value={brand} onChange={(e) => setBrand(e.target.value)} />
                            </div>
                        </div>

                        {/* description */}
                        <label htmlFor="" className='my-5'>Description</label>
                        <textarea type='text' className='p-2 mb-3 bg-[#101011] border rounded-lg w-[100%] text-white' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

                        {/* categroy and stock count */}
                        <div className="flex justify-between">
                            {/* for stock count */}
                            <div>
                                <label htmlFor="name block">Count in Stock</label><br />
                                <input type="text" className='p-2 mb-3 w-[25rem] border rounded-lg bg-[#101011] text-white' value={stock} onChange={(e) => setStock(e.target.value)} />
                            </div>

                            {/* category */}
                            <div>
                                <label htmlFor="">Category</label><br />
                                <select placeholder='Choose Category' className='p-2 mb-3 w-[25rem] border rounded-lg bg-[#101011] text-white' onChange={(e) => setCategory(e.target.value)}>
                                    {categories?.map((c) => (
                                        <option key={c._id} value={c._id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={handleUpdate}
                                className='py-2 px-10 mt-5 rounded-lg text-base font-bold bg-green-600'>Update</button>

                            <button
                                onClick={handleDelete}
                                className='py-2 px-10 mt-5 rounded-lg text-base font-bold m-6 bg-pink-600'>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductUpdate