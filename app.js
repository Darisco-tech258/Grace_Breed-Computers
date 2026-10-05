const products=[
{id:1,brand:"HP",name:"HP ProBook 450 G10",cpu:"Core i5",ram:16,storage:512,price:650000},
{id:2,brand:"Dell",name:"Dell Latitude 5440",cpu:"Core i5",ram:16,storage:512,price:685000},
{id:3,brand:"Lenovo",name:"Lenovo ThinkPad E14",cpu:"Core i7",ram:16,storage:512,price:790000},
{id:4,brand:"ASUS",name:"ASUS VivoBook 15",cpu:"Core i3",ram:8,storage:256,price:475000},
{id:5,brand:"HP",name:"HP EliteBook 840 G10",cpu:"Core i7",ram:32,storage:1000,price:980000},
{id:6,brand:"Dell",name:"Dell Inspiron 14",cpu:"Core i3",ram:8,storage:256,price:520000},
{id:7,brand:"Lenovo",name:"Lenovo IdeaPad Slim 5",cpu:"Ryzen 7",ram:16,storage:512,price:720000},
{id:8,brand:"Apple",name:"MacBook Air",cpu:"Apple M3",ram:16,storage:512,price:1450000}
];
let cart=JSON.parse(localStorage.getItem("techstoreCart")||"[]");
const money=n=>"₦"+Number(n).toLocaleString("en-NG");
function renderProducts(){
 const brand=document.getElementById("brandFilter").value,cpu=document.getElementById("cpuFilter").value,ram=document.getElementById("ramFilter").value,storage=document.getElementById("storageFilter").value,q=document.getElementById("search").value.toLowerCase();
 const list=products.filter(p=>(!brand||p.brand===brand)&&(!cpu||p.cpu===cpu)&&(!ram||p.ram==ram)&&(!storage||p.storage==storage)&&(!q||(p.name+" "+p.brand+" "+p.cpu).toLowerCase().includes(q)));
 document.getElementById("resultCount").textContent=`${list.length} product${list.length!==1?"s":""}`;
 document.getElementById("products").innerHTML=list.map(p=>`<article class="product"><div class="product-img"><div class="device">${p.brand}</div></div><div class="product-body"><span class="tag">${p.brand}</span><h3>${p.name}</h3><div class="specs">${p.cpu} • ${p.ram}GB RAM • ${p.storage>=1000?(p.storage/1000)+"TB":p.storage+"GB"} SSD</div><div class="price">${money(p.price)}</div><button class="btn primary" onclick="addToCart(${p.id})">Add to cart</button></div></article>`).join("")||"<p>No products match your filters.</p>";
}
function addToCart(id){const p=products.find(x=>x.id===id);cart.push({...p,qty:1});save();toast("Product added to cart");}
function addCustom(e){e.preventDefault();const brand=cBrand.value,cpu=cCpu.value,ram=+cRam.value,storage=+cStorage.value;const base=brand==="Apple"?950000:520000;const cpuAdd={ "Core i3":0,"Core i5":70000,"Core i7":170000,"Core i9":300000,"Ryzen 5":60000,"Ryzen 7":130000,"Apple M2":300000,"Apple M3":500000}[cpu]||0;const price=base+cpuAdd+(ram-8)*12000+(storage-256)*500;cart.push({id:"custom-"+Date.now(),brand,name:`Custom ${brand} Computer`,cpu,ram,storage,price});save();toast("Custom configuration added to cart");}
function save(){localStorage.setItem("techstoreCart",JSON.stringify(cart));updateCount();}
function updateCount(){document.getElementById("cartCount").textContent=cart.reduce((a,x)=>a+(x.qty||1),0);}
function openCart(){document.getElementById("cartItems").innerHTML=cart.length?cart.map((p,i)=>`<div class="cart-item"><div><b>${p.name}</b><br><small>${p.cpu} • ${p.ram}GB • ${p.storage>=1000?(p.storage/1000)+"TB":p.storage+"GB"} SSD</small></div><div><b>${money(p.price)}</b><br><button class="remove" onclick="removeItem(${i})">Remove</button></div></div>`).join(""):"<p class='muted'>Your cart is empty.</p>";document.getElementById("cartTotal").textContent=money(total());document.getElementById("cartModal").classList.add("show");}
function removeItem(i){cart.splice(i,1);save();openCart();}
function total(){return cart.reduce((a,x)=>a+x.price*(x.qty||1),0)}
function closeCart(){document.getElementById("cartModal").classList.remove("show")}
function checkout(){if(!cart.length){toast("Add a product before checkout");return}closeCart();document.getElementById("checkoutTotal").textContent=money(total());document.getElementById("checkoutModal").classList.add("show")}
function closeCheckout(){document.getElementById("checkoutModal").classList.remove("show")}
function placeOrder(e){e.preventDefault();const order={reference:"TS-"+Date.now().toString().slice(-8),customer:{name:name.value,email:email.value,phone:phone.value,address:address.value,city:city.value,state:state.value},items:cart,total:total(),payment:payment.value,createdAt:new Date().toISOString()};localStorage.setItem("lastTechStoreOrder",JSON.stringify(order));document.getElementById("checkoutContent").innerHTML=`<div style="text-align:center;padding:25px 5px"><div style="font-size:45px">✓</div><h2>Order received</h2><p class="muted">Your order reference is <b>${order.reference}</b>.</p><p class="muted">In production, this step should open Paystack's secure payment window when “Pay online” is selected.</p><button class="btn primary full" onclick="finishOrder()">Return to store</button></div>`;}
function finishOrder(){cart=[];save();closeCheckout();location.hash="shop";toast("Order completed successfully");}
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2500)}
function updateCustomPrice(){const brand=cBrand.value,cpu=cCpu.value,ram=+cRam.value,storage=+cStorage.value;const base=brand==="Apple"?950000:520000;const add={"Core i3":0,"Core i5":70000,"Core i7":170000,"Core i9":300000,"Ryzen 5":60000,"Ryzen 7":130000,"Apple M2":300000,"Apple M3":500000}[cpu]||0;document.getElementById("customPrice").textContent=money(base+add+(ram-8)*12000+(storage-256)*500)}
["cBrand","cCpu","cRam","cStorage"].forEach(id=>document.getElementById(id).addEventListener("change",updateCustomPrice));
renderProducts();updateCount();updateCustomPrice();
