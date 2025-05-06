import React from 'react';
import axios from 'axios';

function Cart() {
    const [items, setItems] = React.useState([]);
    const link = "http://localhost:5278/api/item/";

    React.useEffect(() => {
        const data = localStorage.getItem("items_in_cart");
        if (data) {
            const itemIds = JSON.parse(data);
            const fetchItems = async () => {
                try {
                    const responses = await Promise.all(itemIds.map(id => axios.get(link + id)));
                    const itemsData = responses.map(response => response.data);
                    setItems(itemsData);
                } catch (error) {
                    console.error('Error fetching items:', error);
                }
            };
            fetchItems();
        }
    }, [link]);

    const deleteFromCart = (itemId) => {
        const data = localStorage.getItem("items_in_cart");
        if (!data) return;
        const parsedData = JSON.parse(data);
        if (!parsedData.includes(itemId)) return;

        const updatedData = parsedData.filter(id => id !== itemId);
        localStorage.setItem("items_in_cart", JSON.stringify(updatedData));

        window.location.reload();
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <ul className="space-y-4">
                    {items.map((item, index) => (
                        <li key={index} className="flex justify-between items-center border-b pb-2 gap-2">
                            <div className="flex flex-row justify-between w-full">
                                <span>{item.id}: {item.name}</span>
                                <span>${item.price}</span>  
                            </div>
                            <button
                                className="bg-red-500 text-white px-2 py-1 rounde w-min rounded"
                                onClick={() => deleteFromCart(item.id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Cart;