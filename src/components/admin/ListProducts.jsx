import { useState, useEffect } from "react";
import ModalConfirm from "./ModalConfirm";
import PropTypes from 'prop-types';

const ListProducts = (props) => {
    const [selectedProduct, setSelectedProduct] = useState('');
    const [products, setProducts] = useState([]);
    const [showModalConfirm, setShowModalConfirm] = useState(false);

    useEffect(() => {
        // Llamar al token almacenado
        const token = localStorage.getItem('token');
    
        // Solicitud a la API para traer los productos
        fetch('http://localhost:8080/products', {
            headers: {
            'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(data => {
            // Filtramos los productos según el tipo
            const fetchProducts = data.filter(product => product.type === props.type);
            setProducts(fetchProducts);
        })
        .catch(error => {
            console.error('API error:', error);
        });
    }, [products]);

    // Al dar click en botón delete se abre modal y desde allí se le elimina producto
    const handleDelete = (product) => {
        setSelectedProduct(product);
        setShowModalConfirm(true)
    }

    // Al dar click en botón editar se abre formulario para editar producto
    const handleEdit = (product) => {
        props.setSelectedProductEdit(product);
        props.setShowFormEditProduct(true)
    }


    return (
       <>
        {/* Si ShowModalConfirm es true se muestra si no, no */}
        {showModalConfirm && <ModalConfirm type = {'products'} selectedItem={selectedProduct} setShowModalConfirm={setShowModalConfirm} />}
         <table className="table-employees">
            <thead>
                <tr>
                    <th colSpan="3" className = "title-tables-admin">{props.type[0].toUpperCase()+props.type.substring(1)}</th>
                </tr> 
            </thead>   
            <tbody>   
            {products.map((product) => (
                <tr key={product.id} className="employees-row">
                    <td className='celd-email'>{product.name}</td>
                    <td className='celd-edit'><button className="btns-tables-edit" onClick={() => handleEdit(product)}>Edit</button></td>
                    <td className='celd-delete'><button className="btns-tables-delete" onClick={() => handleDelete(product)}>Delete</button></td>            
                </tr>   
                )) }       
            </tbody>                   
        </table>
       </>
    );
};

export default ListProducts;


ListProducts.propTypes = {
    type: PropTypes.string,
    setSelectedProductEdit: PropTypes.func,
    setShowFormEditProduct: PropTypes.func,
};