import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useFetchCategoriesQuery,
} from '../../redux/api/categoryApiSlice'
import CategoryForm from '../../components/CategoryForm'
import Modal from '../../components/Modal'


const CategoryList = () => {

    const { data: categories, refetch } = useFetchCategoriesQuery()
    // console.log(categories)

    const [name, setName] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [updatingName, setUpdatingName] = useState('')
    const [modelVisible, setModelVisible] = useState(false)

    const [createCategory] = useCreateCategoryMutation()
    const [updateCategory] = useUpdateCategoryMutation()
    const [deleteCategory] = useDeleteCategoryMutation()

    useEffect(() => {
        refetch()
    }, [refetch])

    const handleCreateCategory = async (e) => {
        e.preventDefault()

        if (!name) {
            toast.error('Category name is required')
            return
        }

        try {

            const res = await createCategory({ name }).unwrap()
            if (res.error) {
                toast.error(res.error)
            } else {
                setName('')
                toast.success(`${res.name} is Created`)
            }
            refetch()

        } catch (error) {
            console.error(error)
            toast.error('Creating category failed, try again!')
        }
    }

    const handleUpdateCategory = async (e) => {
        e.preventDefault()

        if (!updatingName) {
            toast.error('Category name is required')
            return
        }

        try {
            const result = await updateCategory({
                categoryId: selectedCategory._id, updatedCategory: {
                    name: updatingName
                }
            }).unwrap()

            if (result.error) toast.error(result.error)
            else {
                toast.success(`${result.name} is updated successfully`)
                selectedCategory(null)
                setUpdatingName('')
                setModelVisible(false)
            }
            refetch()

        } catch (error) {
            console.error(error)
        }
    }

    const handleDeleteCategory = async () => {
        try {
            const result = await deleteCategory(selectedCategory._id).unwrap();

            if (result.error) toast.error(result.error)
            else {
                toast.success(`${result.name} is deleted successfully`)
                setSelectedCategory(null)
                setModelVisible(false)
            }
            refetch()

        } catch (error) {
            console.error(error)
            toast.error('Category deletion failed')
        }
    }



    return (
        <div className='ml-[10rem] flex flex-col md:flex-row'>

            {/* adminmenu */}
            <div className='md:w-3/4 p-3'>
                <div className="h-12 text-2xl">Manage Categories</div>

                <CategoryForm value={name} setValue={setName} handleSubmit={handleCreateCategory} />
                <br />
                <hr />

                <div className="flex flex-wrap">
                    {categories?.map((category) => (
                        <div key={category._id}>
                            <button style={{ border: '1px rgb(241, 60, 90) solid' }} className='border-pink-500  text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50' onClick={() => {
                                {
                                    setModelVisible(true);
                                    setSelectedCategory(category)
                                    setUpdatingName(category.name)
                                }
                            }}> {category.name} </button>
                        </div>
                    ))}
                </div>

                {/* visible when click on specific category */}
                <Modal isOpen={modelVisible} onClose={() => setModelVisible(false)}>
                    <CategoryForm value={updatingName} setValue={value => setUpdatingName(value)} handleSubmit={handleUpdateCategory} buttonText='Update' handleDelete={handleDeleteCategory} />
                </Modal>

            </div>
        </div>
    )
}

export default CategoryList