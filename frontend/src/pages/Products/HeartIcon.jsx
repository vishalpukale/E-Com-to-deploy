import React, { useEffect } from 'react'
import { addToFavorites, removeFromFavorites, setFavorites } from '../../redux/features/favorites/FavoriteSlice'
import { addFavoriteToLocalStorage, getFavoritesFromLocalStorage, removeFavoriteFromLocalStorage } from '../../Utils/localStorage'
import { useDispatch, useSelector } from 'react-redux'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

const HeartIcon = ({ product }) => {
    const dispatch = useDispatch()
    const favorites = useSelector(state => state.favorites) || []
    const isFavorite = favorites.some((p) => p._id === product._id)

    useEffect(() => {
        const favoritesFromLocalStorage = getFavoritesFromLocalStorage()
        dispatch(setFavorites(favoritesFromLocalStorage))
    }, [])

    const toggleFavorites = () => {
        if(isFavorite) {
            dispatch(removeFromFavorites(product))
            //remove the product from the localstorage as wll
            removeFavoriteFromLocalStorage(product._id)
        }
        else {
            dispatch(addToFavorites(product))
            //add the product to the localstorage as wll
            addFavoriteToLocalStorage(product)
        }
    }

    return (
        <div onClick={toggleFavorites} className='absolute top-2 right-5 cursor-pointer'>
            {isFavorite ? (<FaHeart className='text-pink-500' />) : (
                <FaRegHeart className='text-white' />
            )}
        </div>
    )
}

export default HeartIcon