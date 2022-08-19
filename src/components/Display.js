import React, { useEffect, useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2';

const Display = () => {

    const [item, setItem] = useState([]);
    const [price, setPrice] = useState(0);
    var total = 0;

    const fetchApi = async () => {

        const response = await fetch("https://assessment.api.vweb.app/products");
        setItem(await response.json());

    }

    useEffect(() => {
        fetchApi();
    }, [setItem]);

    const handleDelete = (id) => {
        const update = item.filter((curitem, ind) => {
            return ind !== id

        })
        setItem(update);
    }

    const clearAll = () => {
        setItem([])
        setPrice(0);
    }

    const handleTotal = (amount) => {
        setPrice(price + amount)
        


    }


    return (
        <>

            <div className="main-container">

                <Scrollbars>
                    <div className="section">
                        {
                            item.map((curItem) => {
                                const { product_id, selling_price, name, stock } = curItem

                                return (

                                    <>

                                        <div className="container">


                                            <div className="name_sec" >
                                                <h1>{name}</h1>
                                            </div>

                                            <div className="stock_sec">
                                                <h2>Stock : {stock}</h2>
                                            </div>
                                            <div className="price_sec">
                                                <h2>Price : {selling_price}</h2>
                                            </div>

                                            <div className="cart_buttons">
                                                <div className="add-item">
                                                    <button className="btn" onClick={() => handleTotal( selling_price)}>Add to cart</button>
                                                </div>
                                                <div className="remove-item">
                                                    <button className="btn-delete" onClick={() => handleDelete(product_id)}>Delete</button>
                                                </div>
                                            </div>

                                        </div>


                                    </>
                                )
                            })
                        };
                    </div>

                </Scrollbars>
            </div>

            <div className="bottom">

                <div className="cart_total" >

                    <p>Cart Total Price:<span className="cart_price">{price}</span></p>
                </div>
                <div className="buttons">

                    <button className="btn1" onClick={clearAll}>Clear Cart</button>
                </div>
            </div>

        </>
    )
}

export default Display
