import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CheckIsAdm() {
    const [isAdmin, setIsAdmin] = React.useState(false);
    const link = "http://localhost:5278/api/check-admin";

    axios.get(link, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then(response => {
            if (response.data) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        })
        .catch((error) => {
            console.error('Error during checking access:', error);
        });

    return isAdmin;
}

function Get() {
    const [items, setItems] = React.useState([]);
    const link = "http://localhost:5278/api/items";

    React.useEffect(() => {
        axios.get(link)
            .then((response) => {
                setItems(response.data);
            })
            .catch((error) => {
                console.error('Error fetching items:', error);
            });
    }, []);

    return items;
}

function addItem() {
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const categories_data = document.getElementById("categories").value;
    const price = parseFloat(document.getElementById("price").value);
    const categories = categories_data.split(",").map(category => category.trim());
    const link = "http://localhost:5278/api/add";

    axios.post(link, { name, description, price, categories }, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then((response) => {
            console.log('Item added successfully:', response.data);
        })
        .catch((error) => {
            console.error('Error during adding item:', error);
        });

    window.location.reload();
}

function editItem() {
    var title = document.getElementById("data-name");
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const categories_data = document.getElementById("categories").value;
    const price = parseFloat(document.getElementById("price").value);
    const categories = categories_data.split(",").map(category => category.trim());
    const link = `http://localhost:5278/api/update`;
    
    console.log({ id: parseInt(title.textContent.split(" - ")[1]), name, description, price, categories });

    axios.put(link, { id: parseInt(title.textContent.split(" - ")[1]), name, description, price, categories }, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then((response) => {
            console.log('Item edited successfully:', response.data);
        })
        .catch((error) => {
            console.error('Error during editing item:', error);
        });

    cancelEditItem();
    window.location.reload();
}

function requestEditItem(itemId) {
    var title = document.getElementById("data-name");
    var editItem = document.getElementById("data-editItem");
    var addItem = document.getElementById("data-addItem");
    title.innerHTML = `Edit item - ${itemId}`;
    editItem.classList.remove("hidden");
    editItem.classList.add("flex");
    addItem.classList.add("hidden");
}

function cancelEditItem() {
    var title = document.getElementById("data-name");
    var editItem = document.getElementById("data-editItem");
    var addItem = document.getElementById("data-addItem");
    title.innerHTML = "Add new";
    editItem.classList.add("hidden");
    editItem.classList.remove("flex");
    addItem.classList.remove("hidden");
}

function deleteItem(itemId) {
    const link = `http://localhost:5278/api/delete/${itemId}`;

    axios.delete(link, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then((response) => {
            console.log('Item deleted successfully:', response.data);
        })
        .catch((error) => {
            console.error('Error during deleting item:', error);
        });

    const data = localStorage.getItem("items_in_cart");
    if (data) {
        const itemIds = JSON.parse(data);
        const updatedItemIds = itemIds.filter(id => id !== itemId);
        localStorage.setItem("items_in_cart", JSON.stringify(updatedItemIds));
    }

    window.location.reload();
}

function Dashboard() {
    const navigate = useNavigate();
    var items = Get();

    React.useEffect(() => {
        setTimeout(() => {
            if (!localStorage.getItem('token')) {
                navigate('/login');
            } else if (!CheckIsAdm) {
                console.log("You are not an admin!");
                navigate('/');
            }
        }, 200);
    }, []);

    if (CheckIsAdm()) {
        return (
            <div className="flex flex-col gap-4 p-4">
                <div className="bg-white shadow-md p-4 text-white rounded-2 flex flex-col gap-2">
                    <h2 className="text-black" id="data-name">Add new</h2>
                    <div className="flex flex-col gap-2">
                        <input id="name" type="text" placeholder="Name" className="text-white p-2 bg-black/20 hover:bg-blue/60 rounded-2" required />
                        <input id="description" type="text" placeholder="Description" className="text-white p-2 bg-black/20 hover:bg-blue/60 rounded-2" required />
                        <input id="categories" type="text" placeholder="Categories" className="text-white p-2 bg-black/20 hover:bg-blue/60 rounded-2" required />
                        <input id="price" type="number" placeholder="Price" className="text-white p-2 bg-black/20 hover:bg-blue/60 rounded-2" required />
                    </div>
                    <button id="data-addItem" type="submit" className="p-2 bg-black/20 text-white hover:bg-blue/60 rounded-2" onClick={addItem}>Add</button>
                    <div id="data-editItem" className="flex-row gap-2 hidden">
                        <button type="submit" className="w-full p-2 bg-black/20 text-white hover:bg-blue/60 rounded-2" onClick={editItem}>Save</button>
                        <button type="submit" className="w-full p-2 bg-black/20 text-white hover:bg-blue/60 rounded-2" onClick={cancelEditItem}>Cancel</button>
                    </div>
                </div>
                <div className="flex flex-col gap-4 bg-white shadow-md p-4 rounded-2 overflow-auto">
                    <h2>Database</h2>
                    <table className="min-w-300 w-full text-left border-collapse border-black/20 rounded-2 overflow-hidden shadow-[0px_0px_0px_2px_rgba(0,0,0,0.2)]">
                        <thead>
                            <tr className="bg-black/20">
                                <th className="p-2">ID</th>
                                <th className="p-2">Name</th>
                                <th className="p-2">Description</th>
                                <th className="p-2">Categories</th>
                                <th className="p-2">Price</th>
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="children:b-b-2 children:b-gray-700/20 last:children:b-0">
                            {items.map((item, index) => (
                                <tr key={index} className="border-gray-700 children:b-r-2 children:b-black/20 last:children:b-0">
                                    <td className="p-2">{item.id}</td>
                                    <td className="p-2">{item.name}</td>
                                    <td className="p-2">{item.description}</td>
                                    <td className="p-2">
                                        <span className="flex flex-row gap-1 flex-wrap">
                                            {item.categories.map((name) => (
                                                <span className="p-1 rounded-2 bg-green/80">
                                                    {name}
                                                </span>
                                            ))}
                                        </span>
                                    </td>
                                    <td className="p-2">{item.price}</td>
                                    <td className="p-2 flex flex-row gap-2">
                                        <a href={`/item/${item.id}`} className="bg-gray/20 text-black p-1 rounded">View</a>
                                        <button onClick={() => requestEditItem(item.id)} className="bg-blue-500 text-white p-1 rounded">Edit</button>
                                        <button onClick={() => deleteItem(item.id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Dashboard;
