import React from 'react';
import axios from 'axios';

export function fetchCategories(setCategories) {
    const link = "http://localhost:5278/api/categories";

    axios.get(link)
        .then((response) => {
            setCategories(response.data);
        })
        .catch((error) => {
            console.error('Error fetching categories:', error);
        });
}

export function fetchItems(setItems) {
    const link = "http://localhost:5278/api/items";

    axios.get(link)
        .then((response) => {
            setItems(response.data);
        })
        .catch((error) => {
            console.error('Error fetching items:', error);
        });
}

export async function searchItems(category, search, setItems) {
    const link = "http://localhost:5278/api/search";
    const params = {};

    params.name = ""
    params.category = ""
    if (category) params.category = category;
    if (search) params.name = search;

    console.log(params);

    try {
        const response = await axios.post(link, params);
        setItems(response.data);
    } catch (error) {
        console.error('Error searching items:', error);
    }
}

export function addToCart(itemId) {
    let data = localStorage.getItem("items_in_cart");

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

export function deleteFromCart(itemId) {
    let data = localStorage.getItem("items_in_cart");

    if (data == null) return;
    data = JSON.parse(data);
    if (!data.includes(itemId)) return;
    data.splice(data.indexOf(itemId), 1);

    localStorage.setItem("items_in_cart", JSON.stringify(data));
    window.location.reload();
}

function Items() {
    const [categories, setCategories] = React.useState([]);
    const [items, setItems] = React.useState([]);
    const [category, setCategory] = React.useState('');
    const [search, setSearch] = React.useState('');

    React.useEffect(() => {
        fetchCategories(setCategories);
        fetchItems(setItems);
    }, []);

    const handleSearch = async () => { await searchItems(category, search, setItems); };
    const handleAddToCart = (itemId) => () => { addToCart(itemId); };
    const handleDeleteFromCart = (itemId) => () => { deleteFromCart(itemId); };

    return (
        <div className="flex flex-row" style={{ height: "calc(100vh - 50.67px)" }}>
            <div className="m-4 p-4 bg-white shadow-md min-w-[250px] flex gap-4 rounded-2 flex-col">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search"
                    className="p-2 rounded-2 bg-black/20 text-white hover:bg-blue/60"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-2 rounded-2 bg-black/20 text-white hover:bg-blue/60"
                >
                    <option value="">Select Category</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <button
                    className="p-2 rounded-2 bg-black/20 text-white hover:bg-blue/60 active:bg-blue"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
            <div className="flex flew-col flex-wrap gap-4 p-4 overflow-y-auto">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="p-4 bg-white shadow-md rounded-2 flex flex-col justify-between gap-4 w-min min-w-[200px] max-w-[400px] h-auto"
                    >
                        <div className="flex flex-col gap-2">
                            <img
                                src="/Assets/item.png"
                                alt="Item"
                                className="w-100 h-100 object-cover rounded-2"
                            />
                            <h2>{item.name}</h2>
                            <p>Description: {item.description}</p>
                            <p>Price: {item.price}</p>
                            <p>Categories:</p>
                            <div className="flex flex-row gap-1 flex-wrap">
                                {item.categories.map((name, idx) => (
                                    <span key={idx} className="p-1 rounded-2 bg-green/80">
                                        {name}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-row gap-2 justify-between items-center">
                            <a
                                href={`/item/${item.id}`}
                                className="text-black text-center decorations-none p-2 rounded-2 bg-gray/20 hover:bg-blue/60 active:bg-blue w-full"
                            >
                                View
                            </a>
                            {localStorage.getItem("items_in_cart") == null ||
                            !JSON.parse(localStorage.getItem("items_in_cart")).includes(item.id) ? (
                                <button
                                    className="p-2 rounded-2 bg-green/60 hover:bg-blue/60 active:bg-blue w-full"
                                    onClick={handleAddToCart(item.id)}
                                >
                                    Add to Cart
                                </button>
                            ) : (
                                <button
                                    className="p-2 rounded-2 bg-red/60 hover:bg-blue/60 active:bg-blue w-full"
                                    onClick={handleDeleteFromCart(item.id)}
                                >
                                    Delete from Cart
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Items;