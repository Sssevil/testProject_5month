import './App.css'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProduct, nextProduct, prevProduct } from './store/productSlice'

const App = () => {
    const { product, currentProduct, loading, error } = useSelector(
        (state) => state.product,
    )
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProduct(currentProduct))
    }, [currentProduct])

    const buttonNext = () => {
        dispatch(nextProduct())
        console.log(currentProduct)
    }

    const buttonPrev = () => {
        dispatch(prevProduct())
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className='App'>
            <div className="product">
                <div className="product_info">
                    <h2>{product.title}</h2>
                    <div>${product.price}</div>
                </div>
                <img src={product.thumbnail} alt={product.title} />
                <div className="product_buttons">
                    <button
                        onClick={buttonPrev}
                        disabled={currentProduct === 1}
                    >
                        prev
                    </button>
                    <button onClick={buttonNext}>next</button>
                </div>
            </div>
        </div>
    )
}

export default App
