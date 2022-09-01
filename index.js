//////////////create code/////////////



let baseUrl;

if (window.location.href.indexOf("https") === -1) {
    baseUrl = "http://localhost:3000";

} else {
    baseUrl = "https://ali-express-server.herokuapp.com";
}


function createProduct() {

    let productName = document.querySelector("#productName").value;
    let productPrice = document.querySelector("#productPrice").value;
    let currencyCode = document.querySelector("#currencyCode").value;
    let numberOfSale = document.querySelector("#numberOfSale").value;
    let rating = document.querySelector("#rating").value;
    let isFreeShipping = document.querySelector("#isFreeShipping").value;
    let shopName = document.querySelector("#shopName").value;


    axios.post('${baseUrl}/product', {
        productName,
        productPrice,
        currencyCode,
        numberOfSale,
        rating,
        isFreeShipping,
        shopName,
    })
        .then(function (response) {
            console.log(response.data);
            document.querySelector("#message").innerHTML = response.data.message;
        })
        .catch(function (error) {
            console.log(error.response.data);
            document.querySelector("#message").innerHTML = error.response.data.message;
        });
}







//////////// product code//////////

async function deletedProduct(_id) {

    try {
        const response = await axios.delete(`http://localhost:3000/products/${_id}`);
        console.log(response.data.data);
    } catch (error) {
        console.log(error);
    }
}

async function getAllProducts() {



    try {
        const response = await axios.get('http://localhost:3000/products');
        console.log(response.data.data);

        let productsList = document.querySelector("#productsList")



        response.data.data.map(eachProduct => {
            console.log("eachProduct", eachProduct);
            productsList.innerHTML +=
                `<div>
                <img src="./img/Airpord.jpg_.webp" alt="">

                    <p> ${eachProduct.productName} </p>
                    <p>
                <span> ${eachProduct.currencyCode} </span>
                 <span> ${eachProduct.productPrice} </span>
                 </p>
                    <p> ${eachProduct.numberOfSale || 0} Sold</p>
                    <p> ${(eachProduct.isFreeShipping) ? "Free Shipping" : "No free shipping"} </p>
                    <p>${eachProduct.shopName}</p>
                    <button onclick="${deletedProduct(eachProduct._id)}">Delete Product</button>

            </div>`
        })

    } catch (error) {
        console.error(error);
    }

}
getAllProducts();