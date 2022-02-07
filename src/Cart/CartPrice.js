export   function calcSubPrice(hotel) {
    return hotel.count * hotel.item.price;
  }
export   function calcTotalPrice(hotels) {
    let totalPrice = 0;
    hotels.forEach((elem) => {
      totalPrice += elem.subPrice;
    });
    return totalPrice;
  }
  
 export  function getCountProductInCart() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    return cart ? cart.hotels.length : 0;
  }
  