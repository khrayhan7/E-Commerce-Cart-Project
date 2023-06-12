let cardBox = document.querySelector(".box");
let snippetsCss = document.querySelector(".wholeSnippets");
let totalSec = document.querySelector(".totalCount");
let badgeTop = document.querySelector(".badge");


const productInfo =[
    {
        id : 0,
        imgSrc : 'images/shoe-1.jpg',
       name:      'shoe-1',
       price :     '30',
        instock : 5,
       
    },
    {
        id : 1,
        imgSrc : 'images/shoe-2.jpg',
        name:      'shoe-2',
        price :     '31',
       instock : 15,
        
    },
    {
        id : 2,
        imgSrc : 'images/shoe-3.jpg',
        name:      'shoe-3',
        price :     '32',
        instock : 10,
        
    },
    {
        id : 3,
        imgSrc : 'images/shoe-4.jpg',
        name:      'shoe-4',
        price :     '33',
        instock : 23,
        
    },
    {
        id : 4,
        imgSrc : 'images/shoe-5.jpg',
        name:      'shoe-5',
        price :     '34',
       instock : 30,
        
    },
    {
        id : 5,
        imgSrc : 'images/Sunglass-1.jpg',
        name:      'Sunglass-1',
        price :     '20',
        instock : 26,
        
    },
    {
        id : 6,
        imgSrc : 'images/Sunglass-3.jpg',
        name:      'Sunglass-3',
        price :     '18',
        instock : 29,
        
    },
    {
        id : 7,
        imgSrc : 'images/sunglass-4.jpg',
        name:      'Sunglass-4',
        price :     '22',
        instock : 7,
        
    },
    {
        id : 8,
        imgSrc : 'images/Sunglass-5.jpg',
        name:      'Sunglass-5',
        price :     '15',
       instock : 21,
        
    },
    {
        id : 9,
        imgSrc : 'images/sunglass-6.jpg',
        name:      'Sunglass-6',
        price :     '24',
        instock : 32,
        
    },
    {
        id : 10,
        imgSrc : 'images/Watch-1.png',
        name:      'Watch-1',
        price :     '32',
       instock : 12,
       
    },
    {
        id : 11,
        imgSrc : 'images/watch-2.jpg',
        name:      'Watch-2',
        price :     '30',
        instock : 9,
        
    },
    {
        id : 12,
        imgSrc : 'images/Watch-3.jpg',
        name:      'Watch-3',
        price :     '27',
        instock : 21,
        
    },
    {
        id : 13,
        imgSrc : 'images/Watch-4.jpg',
        name:      'Watch-4',
        price :     '35',
        instock : 17,
        
    },
    {
        id : 14,
        imgSrc : 'images/Watch-5.png',
        name:      'Watch-5',
        price :     '38',
        instock : 10,
        
    },


];

function renderProductCart(){
    productInfo.forEach((product)=>{
    cardBox.innerHTML += `
    <div class="card" style="width: 13rem; ">
    <img src="${product.imgSrc}" alt="" style="width:280px; height:200px">
    <p>${product.name}</p>
    <p><small>$</small>${product.price}</p>
      <button  onclick="ButnClicked(${product.id})" id="butn" class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#demo">Add to Cart
          </button>

          </div> 
    `;
    });
  
}
renderProductCart();

let myCart = JSON.parse(localStorage.getItem("CART")) || [];
updateTheCart();

function ButnClicked(id){
    console.log(id);
  if(myCart.some((item)=> item.id === id)){
    
    increamentNum("plus", id);

   }else{
     const item = productInfo.find((product) => product.id === id);
      myCart.push({
         ...item,
         quantityNumbers : 1,
        
        
      });
    
   
 }
 updateTheCart();
}


function updateTheCart(){
    renderCartItems();
    renderTotal();

 localStorage.setItem("CART",JSON.stringify(myCart));
}

function renderCartItems(){
      snippetsCss.innerHTML = "";
      

    myCart.forEach((item)=>{
    snippetsCss.innerHTML += `
    
    <div style="width: 100%;" class="Snippets">
    <div  style="width: 33.33%;" class="img-pro"><img style="width: 100px; height: 100px;" src="${item.imgSrc}" alt="${item.name}" >
    </div>
    <div style="float: left; margin-left: 27.33%; " class="Pro-Name">
    <h5 >${item.name}</h5>
   </div>

   <div style="float: left; margin-left: 55.33% ;" class="part-3">
   <div class="row" >
   <table>
   <tr>
    
      
    <td onclick="increamentNum('plus',${item.id})" style="box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px; height: 80px;border: 1px solid rgba(0, 0, 0, 0.15);" class="column">+</td>
    <td  class="column">${item.quantityNumbers}</td>
    <td onclick="increamentNum('minus',${item.id})" style="box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px; height: 80px;border: 1px solid rgba(0, 0, 0, 0.15);" class="column">-</td>
   </tr>
   </table>
   </div>
  </div>

  <div style=" float: left;margin-left: 80.33%;" class="price">
    <h5><small>$</small>${item.price}</h5>
  </div>

  <div onclick="trashRemItem(${item.id})" id="trashrem" style=" float: left;margin-left: 95.33%; font-size: 28px; color: red;" class="fa fa-trash" aria-hidden="true"></div>

   </div>


    `;
    });

}

function increamentNum(action,id){
   myCart = myCart.map((item)=> {
        let quantityNumbers = item.quantityNumbers;

        if (item.id === id) {
            if (action === 'minus' && quantityNumbers > 1) {
                quantityNumbers--;
            }
            else if(action === 'plus' && quantityNumbers < item.instock){
                quantityNumbers++;
            }
            
        }

    return {
        ...item ,
        quantityNumbers,
    };
    });
    updateTheCart();
}

function trashRemItem(id){
    
    myCart = myCart.filter((item)=> item.id !== id);
    
    
    updateTheCart();
}

function renderTotal(){
    let totalPrice = 0,
    totalItems = 0;

  myCart.forEach((item)=>{
    totalPrice += item.price * item.quantityNumbers;
    totalItems += item.quantityNumbers;
  });
 
  totalSec.innerHTML = `
  
  <div class="final-sec">
    <div style="font-size: 23px;font-weight: bold;" class="sub-Total">Items : ${totalItems} <br>
    Total : <small>$</small>${totalPrice}</div>
   
  
  `;

  badgeTop.innerHTML = totalItems;


}






