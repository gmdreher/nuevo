import React, { useEffect, useState } from 'react';
import ProductCard from '../productCard/ProductCard.js';
import './catalogue.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../actions/productActions.js';
import { useHistory } from 'react-router-dom';
import { searchProduct } from '../../actions/productActions.js'

export default function Catalogue() {
    const history = useHistory();
    const products = useSelector((store) => store.product.products);

    const [pagina, setPagina] = useState(1);
    const [productosPaginados, setProductosPaginados] = useState([]);
    const [paginasDisponibles, setPaginasDisponibles] = useState("");


    const dispatch = useDispatch();

    useEffect(() => {

        if (history.location.search.length === 0) dispatch(getProducts())
        if (history.location.search.length > 0) dispatch(searchProduct(history.location.search.slice(8)))
    }, [history.location.search.length > 0])

    useEffect(() => {
        setProductosPaginados(products.slice(pagina * 8 - 8, pagina * 8))

    }, [pagina, products])

    return (
        <div className="catalogue">
            <h2 className="titleH2">Nuestro Catálogo</h2>

            <div className="contentCards">
                {productosPaginados && productosPaginados.map((infoProducto) => {
                    return <ProductCard key={infoProducto.id} data={infoProducto} />
                })}
            </div>
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item" onClick={() => setPagina(pagina - 1)}>
                        <a class="page-link" aria-label="Previous" >
                            <span aria-hidden="true"  >&laquo;</span>
                        </a>
                    </li>
                    {
                        productosPaginados == 0 ? <h5>Volver</h5> :
                            <li class="page-item" onClick={() => setPagina(pagina + 1)}>
                                <a class="page-link" aria-label="Next">
                                    <span aria-hidden="true" >&raquo;</span>
                                </a>
                            </li>
                    }
                </ul>
            </nav>
        </div>
    )

}





// export default function Catalogue() {
//     const history = useHistory()

//     const dispatch = useDispatch();
//     const products = useSelector((store) => store.product.products);

//     useEffect(() => {

//         if (history.location.search.length === 0) dispatch(getProducts())
//         if (history.location.search.length > 0) dispatch(searchProduct(history.location.search.slice(8)))

//     }, [history.location.search.length > 0])

//     return (
//         <div className={styles.catalogue}>
//             <h2>Nuestro Catálogo</h2>
//             <div className={styles.contentcards}>
//                 {products && products.map((infoProducto) => {

//                     return <ProductCard key={infoProducto.id} data={infoProducto} />
//                 })}
//             </div>
//         </div>
//     )

// }


