import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import style from "../styles/Productos.module.css";
import "../styles/modal.css";
import gridStyle from "../styles/Grid.module.css";

function Productos() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productDel, setProductDel] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    descripcion: "",
    price: 0,
  });
  const [search, setSearch] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [productEdit, setProductEdit] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8090/productos", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (product) => {
    setProductEdit({ ...product });
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/productos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProducts(products.filter((products) => products.id !== id));
      setShowModal(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const openModal = (product) => {
    setProductDel(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setProductDel(null);
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setNewProduct({
      name: "",
      price: 0,
    });
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setProductEdit({});
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8090/productos/${productEdit.id}`,
        productEdit,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProducts(
        products.map((product) =>
          product.id === productEdit.id ? response.data : product
        )
      );
      closeEditModal();
    } catch (error) {
      console.error("error: ", error.response?.data || error.message);
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8090/productos",
        newProduct,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProducts([...products, response.data]);
      closeAddModal();
    } catch (error) {
      console.error(error.message);
    }
  };

  const filterProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className={style["productos-container"]}>
        <input
          type="text"
          placeholder="Buscar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control"
        />
        <button className={style["add-product-button"]} onClick={openAddModal}>
          Agregar Producto
        </button>
      </div>

      <div className={gridStyle["grid-container"]}>
        {filterProducts.map((product) => (
          <ProductsCard
            key={product.id}
            product={product}
            onEdit={() => handleEdit(product)}
            onDelete={() => openModal(product)}
          />
        ))}
      </div>

      {showModal && (
        <Modal onClose={closeModal}>
          <h5>Eliminar este registro?</h5>
          <h6>{productDel?.name}</h6>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={closeModal} className="btn btn-secondary">
              Cancelar
            </button>
            <button
              onClick={() => handleDelete(productDel.id)}
              className="btn btn-danger"
            >
              Eliminar
            </button>
          </div>
        </Modal>
      )}

      {showAddModal && (
        <Modal onClose={closeAddModal}>
          <h5>Agregar Producto</h5>
          <div className="mb-3">
            <label htmlFor="">Nombre:</label>
            <input
              type="text"
              className="form-control"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="">Precio:</label>
            <input
              type="number"
              className="form-control"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={closeAddModal} className="btn btn-secondary">
              Cancelar
            </button>
            <button onClick={handleAddProduct} className="btn btn-primary">
              Agregar
            </button>
          </div>
        </Modal>
      )}

      {showEditModal && (
        <Modal onClose={closeEditModal}>
          <h5>Editar Producto</h5>
          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              value={productEdit.name}
              onChange={(e) =>
                setProductEdit({ ...productEdit, name: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="number"
              value={productEdit.price}
              onChange={(e) =>
                setProductEdit({ ...productEdit, price: e.target.value })
              }
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={closeEditModal} className="btn btn-secondary">
              Cancelar
            </button>
            <button onClick={handleUpdate} className="btn btn-primary">
              Editar
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

function ProductsCard({ product, onEdit, onDelete }) {
  return (
    <>
      <div className={gridStyle["product-card"]}>
        <h5 className={gridStyle["product-card-header"]}>{product.name}</h5>
        <div className={gridStyle["product-card-body"]}>
          <h5 className="card-title">{product.descripcion}</h5>
          <p className="card-text">Precio: ${product.price}</p>
          <div className={gridStyle["product-card-footer"]}>
            <a
              href="#"
              className={gridStyle["product-btn"]}
              onClick={() => onEdit(product)}
            >
              Editar
            </a>
            <a
              href="#"
              className={`${gridStyle["product-btn"]} ${gridStyle["product-btn-danger"]}`}
              style={{ marginLeft: "10px" }}
              onClick={() => onDelete()}
            >
              Eliminar
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function Modal({ onClose, children }) {
  return (
    <>
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          {children}
        </div>
      </div>
    </>
  );
}

ProductsCard.propTypes = {
  product: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default Productos;
