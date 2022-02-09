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
  
  // !!!!!!!!!!!!!
export   function calcSubPriceFov(favo) {
    return favo.count * favo.item.price;
  }
export   function calcTotalPriceFov(favor) {
    let totalPrice = 0;
    favor.forEach((elem) => {
      totalPrice += elem.subPrice;
    });
    return totalPrice;
  }
  
 export  function getCountProductInCartFov() {
    let favo = JSON.parse(localStorage.getItem("fav"));
    return favo ? favo.fav.length : 0;
  }
  