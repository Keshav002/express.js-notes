const App = () => {

    const [products, setProducts] = React.useState([]);
    const [form, setForm] = React.useState({
        name: "", price: ""
    });

    React.useEffect(() => {

        fetchProducts();
    }, [])

    function fetchProducts() {
        fetch('api/products')
            .then((res) => res.json())
            .then(data => {
                setProducts(data);
            })
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(!form.name || !form.price){
            return;
        }
        fetch('/api/products',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }).then(res => res.json())
        .then(data => {
            fetchProducts(); // We are calling the fetchProducts for updating the list items 
            setForm({name: " ", price: " "});           
        })
    }


    function updateForm(event, field) {
        setForm({
            ...form,
            [field]: event.target.value
        });
    }

    const deleteProduct = (productId) => {
        fetch(`/api/products/${productId}`, {
            method: 'DELETE'  //PUT or PATCH for updation functionality
        }).then((res) => res.json())
        .then((data) => {
            fetchProducts();
            console.log(data);
        });
    }
    return (
        <>

            <div className="card">
                <div className="card-header">
                    Add a product
                </div>
                <div className="card-body">
                    <form onClick={handleSubmit}>
                        <input type="text" value={form.name} onChange={() => updateForm(event, 'name')} placeholder="Product name..." className="form-control mt-3" />
                        <input type="text" onChange={() => updateForm(event, 'price')} value={form.price} placeholder="Product price..." className="form-control mt-3" />
                        <button type="submit" className="btn btn-primary mt-3">Submit</button>
                    </form>

                </div>
            </div>
            <ul className="list-group mt-4">
                {

                    products.map((product) => {
                        return (
                            <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{product.name} </strong>
                                    ${product.price}
                                </div>
                                <button className="btn" onClick={() => deleteProduct(product.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                    </svg>
                                </button>

                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('app'));