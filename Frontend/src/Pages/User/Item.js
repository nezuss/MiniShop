import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function addToCart(itemId) {
    var data = localStorage.getItem("items_in_cart");

    if (data == null) {
        data = [itemId];
    } else {
        data = JSON.parse(data);
        if (data.includes(itemId)) return;
        data.push(itemId);
    }

    localStorage.setItem("items_in_cart", JSON.stringify(data));

    window.location.reload();
}

function deleteToCart(itemId) {
    var data = localStorage.getItem("items_in_cart");

    if (data == null) return;
    data = JSON.parse(data);
    if (!data.includes(itemId)) return;
    data.splice(data.indexOf(itemId), 1);

    localStorage.setItem("items_in_cart", JSON.stringify(data));

    window.location.reload();
}

function Item() {
    const { id } = useParams();
    const [item, setItem] = React.useState(null);

    const callAddToCart = (itemId) => () => { addToCart(itemId) };
    const callDeleteToCart = (itemId) => () => { deleteToCart(itemId) };

    React.useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(`http://localhost:5278/api/item/${id}`);
                setItem(response.data);
            } catch (error) {
                console.error('Error fetching item:', error);
            }
        };

        fetchItem();
    }, [id]);

    if (!item) {
        return <p>Item not found.</p>;
    }

    return (
        <div className="p-4 flex flex-col items-center justify-center">
            <div className="item-details flex flex-col gap-2 bg-white shadow-md p-4 rounded-2">
                <img src="/Assets/item.png" alt="Item" className="w-100 h-100 object-cover rounded-2" />
                <h1>{item.name}</h1>
                <p>{item.description}</p>
                <p>Price: {item.price}</p>
                <p>Category:
                    <span className="flex flex-row gap-1 flex-wrap">
                        {item.categories.map((name) => (
                            <span className="p-1 rounded-2 bg-green/80">
                                {name}
                            </span>
                        ))}
                    </span>
                </p>
                <div className="flex flex-row gap-2 justify-between items-center">
                    {localStorage.getItem("items_in_cart") == null || !JSON.parse(localStorage.getItem("items_in_cart")).includes(item.id) ? (
                        <button className="p-2 rounded-2 bg-green/60 hover:bg-blue/60 active:bg-blue w-full" onClick={callAddToCart(item.id)}>Add to Cart</button>
                    ) : (
                        <button className="p-2 rounded-2 bg-red/60 hover:bg-blue/60 active:bg-blue w-full" onClick={callDeleteToCart(item.id)}>Delete from Cart</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Item;