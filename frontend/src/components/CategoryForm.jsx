import React from 'react'

const CategoryForm = ({value, setValue, handleSubmit, buttonText='Submit', handleDelete}) => {
  return (
    <div className='p-3'>
        <form onSubmit={handleSubmit} className='space-y-3'>
            <input type="text" className='py-3 text-black px-4 border rounded-lg w-full' placeholder='Write Category Name' value={value} onChange={e => setValue(e.target.value)} />

            <div className="flex justify-between">
                <button className="py-2 px-4 bg-pink-500 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-pink-550 focus:ring-opacity-50">{buttonText}</button>

                {handleDelete && (
                    <button onClick={handleDelete} className='bg-red-500 py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-red-550 focus:ring-opacity-50'>Delete</button>
                )}
            </div>
        </form>
    </div>
  )
}

export default CategoryForm