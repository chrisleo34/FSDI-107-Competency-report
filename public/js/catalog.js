/*
var items=[{
    //first item
    code:'1tvs',
    title:'TV 60" Samsung',
    price:'$2,000',
    description:' This is a long description for a TV',
    category:'Electronics',
    image:'https://image-us.samsung.com/SamsungUS/home/televisions-and-home-theater/tvs/full-hd/pd/un32n5300afxza/gallery/DT-UN32N5300AFXZA-heroimage-050118.jpg?$product-details-jpg$'
},
  {  //second item
    code:'1phone10',
    title: 'Iphone X',
    price:'$1500',
    description: 'This is a long description for a iPhone',
    catagory:'Sound',
    image:'https://cdn.alzashop.com/ImgW.ashx?fd=f3&cd=SPICc55'
          
  },        
  
  {
      //third item
      
      code:'2spk',
      title:'Alexa Home Speakers',
      price: '$1000',
      description:'This is a long description for Speakers',
      category:'Sound',
      image:'https://media.kohlsimg.com/is/image/kohls/3540402_Charcoal?wid=600&hei=600&op_sharpen=1'
    }
    ];
*/



$(document).ready(function () {

    var quantitiy = 0;
    $('.quantity-right-plus').click(function (e) {

        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        var quantity = parseInt($('#quantity').val());

        // If is not undefined

        $('#quantity').val(quantity + 1);


        // Increment

    });

    $('.quantity-left-minus').click(function (e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        var quantity = parseInt($('#quantity').val());

        // If is not undefined

        // Increment
        if (quantity > 0) {
            $('#quantity').val(quantity - 1);
        }
    });

});

var items = [];
var serverURL = "http://localhost:8080/API/";

function fetchCatalog() {
    // get the items from the server

    $.ajax({
        url: serverURL + "items",
        type: "GET",
        success: function (res) {
            console.log("It works!", res);
            for (var i = 0; i < res.length; i++) {
                if (res[i].user == "Christian") {
                    items.push(res[i]);
                }
            }

            displayCatalog();
        },

        error: function (details) {
            console.log("Error", details);
        }
    });


}


function displayCatalog() {
    for (var i = 0; i < items.length; i++) {

        var product = items[i];

        drawItem(product);

    }
}

function drawItem(product) {

    var layout = `
    <div class="item" id="${product.code}">
        <img src="${product.image}">
        <h4> ${product.title} </h4>
        <h6 class="itemPrice"> ${product.price}</h6>
        <p> ${product.description} </p>
        <button class="btn btn-secondary" > Add to Cart </button>
    </div>
    `;

    $('#catalog').append(layout);
}

function search() {

    var searchText = $("#txt-search").val();
    $("#catalog").html("");
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item.title.toLowerCase().includes(searchText)) {
            drawItem(item);
        }
    }
}

function init() {
    console.log('catalog page');
    fetchCatalog();


    $("#btn-search").click(search);
}

window.onload = init;