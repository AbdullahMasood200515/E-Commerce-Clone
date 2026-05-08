import { useState } from "react";
import { useProducts } from "../context/ProductContext";
import Navbar from "../components/ui/Navbar/Navbar";
import Inputs from "../components/ui/Inputs/Inputs";
import Buttons from "../components/ui/Buttons/Buttons";
import Forms from "../components/ui/Forms/Forms";
import Pagination from "../components/ui/Pagination/Pagination";
import "../components/style/AdminPanel.css";

function AdminPanel() {
    const { products, addProduct, updateProduct, deleteProduct } = useProducts();
    const [isEditing, setIsEditing] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Pagination Logic
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        image: "",
        new_price: "",
        old_price: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        const formattedProduct = {
            ...formData,
            new_price: parseFloat(formData.new_price),
            old_price: parseFloat(formData.old_price)
        };

        if (isEditing) {
            updateProduct(isEditing, formattedProduct);
            setIsEditing(null);
            alert("Product updated successfully!");
        } else {
            addProduct(formattedProduct);
            alert("Product added successfully!");
        }

        setFormData({
            name: "",
            category: "",
            image: "",
            new_price: "",
            old_price: ""
        });
    };

    const handleEdit = (product) => {
        setIsEditing(product.id);
        setFormData({
            name: product.name,
            category: product.category,
            image: product.image,
            new_price: product.new_price.toString(),
            old_price: product.old_price.toString()
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCancel = () => {
        setIsEditing(null);
        setFormData({
            name: "",
            category: "",
            image: "",
            new_price: "",
            old_price: ""
        });
    };

    return (
        <div className="admin-page">
            <Navbar />
            <div className="admin-container">
                <div className="admin-sidebar">
                    <div className="admin-card">
                        <h3>{isEditing ? "Edit Product" : "Add New Product"}</h3>
                        <Forms onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Product Name</label>
                                <Inputs 
                                    name="name" 
                                    placeholder="Enter product name" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select 
                                    name="category" 
                                    value={formData.category} 
                                    onChange={handleChange} 
                                    className="input-field"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="women">Women</option>
                                    <option value="men">Men</option>
                                    <option value="kid">Kid</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Image URL</label>
                                <Inputs 
                                    name="image" 
                                    placeholder="Paste image URL" 
                                    value={formData.image} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="price-group">
                                <div className="form-group">
                                    <label>New Price</label>
                                    <Inputs 
                                        name="new_price" 
                                        type="number" 
                                        placeholder="0.00" 
                                        value={formData.new_price} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Old Price</label>
                                    <Inputs 
                                        name="old_price" 
                                        type="number" 
                                        placeholder="0.00" 
                                        value={formData.old_price} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="admin-form-actions">
                                <Buttons text={isEditing ? "Update Product" : "Add Product"} type="submit" />
                                {isEditing && (
                                    <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
                                )}
                            </div>
                        </Forms>
                    </div>
                </div>

                <div className="admin-main">
                    <div className="admin-card">
                        <div className="admin-list-header">
                            <h3>Manage Products ({products.length})</h3>
                        </div>
                        <div className="products-table-container">
                            <table className="products-table">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentProducts.map((product) => (
                                        <tr key={product.id}>
                                            <td data-label="Image">
                                                <img src={product.image} alt={product.name} className="admin-prod-img" />
                                            </td>
                                            <td data-label="Name"><p className="admin-prod-name">{product.name}</p></td>
                                            <td data-label="Category"><span className={`cat-badge ${product.category}`}>{product.category}</span></td>
                                            <td data-label="Price">
                                                <div className="admin-prod-price">
                                                    <span className="new">${product.new_price}</span>
                                                    <span className="old">${product.old_price}</span>
                                                </div>
                                            </td>
                                            <td data-label="Actions">
                                                <div className="admin-actions">
                                                    <button className="edit-btn" onClick={() => handleEdit(product)}>Edit</button>
                                                    <button className="delete-btn" onClick={() => deleteProduct(product.id)}>Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination 
                            currentPage={currentPage} 
                            totalPages={totalPages} 
                            onPageChange={setCurrentPage} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;
