// loading functions
const showLoading = () => {
  document.getElementById("loading").classList.remove("hidden");
};
const hideLoading = () => {
  document.getElementById("loading").classList.add("hidden");
};
// tree catagory display part
const loadCatagory=async()=>{
    const url=`https://openapi.programming-hero.com/api/categories`
    const res=await fetch(url)
    const info=await res.json()
    displayCatagory(info.categories)
}
const displayCatagory=(categories)=>{
    const catagorydiv=document.getElementById("catagory-container")
    catagorydiv.innerHTML=""
    for(let single of categories){
        const btndiv=document.createElement("div")
        btndiv.innerHTML=`
        <button id="catagory-btn-${single.id}"
              class="w-full btn  hover:bg-[#15803d] hover:text-white cursor-pointer catagorybtn" onclick="loadcontent(${single.id})"
            >
              ${single.category_name}
            </button>
        `
        catagorydiv.append(btndiv)
    }
}
const removeactive=()=>{
    const catagorybbtn=document.querySelectorAll(".catagorybtn")
    for(let btn of catagorybbtn){
        btn.classList.remove("active")
    }
}
//main content off click display
const loadplants=async()=>{
  showLoading()
     const url=`https://openapi.programming-hero.com/api/plants`
    const res=await fetch(url)
    const info=await res.json()
    hideLoading()
    displayallplants(info.plants)
}
const displayallplants=(plant)=>{
     const maincontentcontainer=document.getElementById("main-content-container")
    maincontentcontainer.innerHTML=""
    for(let each of plant){
        const main_area=document.createElement("div")
        main_area.innerHTML=`
         <div class="h-[380px] w-[340px] p-4 rounded-xl shadow-xl" >
            <div class="h-[150px] w-[310px]" >
            <img class="h-full w-full object-cover object-center rounded-2xl" src="${each.image}" alt="">
            </div>
            <h1  onclick="loadplantdetails(${each.id})" class="font-bold text-2xl my-2">${each.name}</h1>
            <p class="font-normal text-xs">
              ${each.description}
            </p>
            <div class="flex justify-between items-center my-2">
              <button
                class="btn btn-soft btn-accent bg-[#dcfce7] text-[#15803d]"
              >
                ${each.category}
              </button>
              <h1 class="font-bold">${each.price}</h1>
            </div>
            <button  onclick="add_to_cart('${each.name}',${each.price})" class="btn w-full rounded-2xl bg-[#15803d] text-white">
              Add to Cart
            </button>
          </div>
        `
        maincontentcontainer.append(main_area)

    }
}
//details section
const  loadplantdetails= async(id)=>{
  showLoading()
       const url=`https://openapi.programming-hero.com/api/plant/${id}`
    const res=await fetch(url)
    const pldl=await res.json()
    hideLoading()
displayplantdetails(pldl.plants)
}
const displayplantdetails=(info)=>{
  const detailscontainer=document.getElementById("details-container")
  detailscontainer.innerHTML=`
     <div class="h-[450px] w-[450px] p-4 rounded-xl shadow-xl" >
          <h1 class="font-bold text-2xl my-2">${info.name}</h1>
            <div class="h-[250px] w-[410px]">
            <img class="h-full w-full object-cover object-center rounded-2xl" src="${info.image}" alt="">
            </div>
            <h1 class="font-bold">Catagory: ${info.category}</h1>
             <h1 class="font-bold">Price : ${info.price}</h1>
            <p class="font-normal text-xs">
               Discription: ${info.description}
            </p>
          </div>
  `
  document.getElementById("my_modal").showModal()
}
// main content onclick display
const loadcontent=async(id)=>{
     const url=`https://openapi.programming-hero.com/api/category/${id}`
    const res=await fetch(url)
    const info=await res.json()
    const catagorybtn=document.getElementById(`catagory-btn-${id}`)
    removeactive()
    catagorybtn.classList.add("active")
    displaycontent(info.plants)
   
}
const displaycontent=(content)=>{
    const maincontentcontainer=document.getElementById("main-content-container")
    maincontentcontainer.innerHTML=""
    for(let each of content){
        const main_area=document.createElement("div")
        main_area.innerHTML=`
         <div class="h-[380px] w-[340px] p-4 rounded-xl shadow-xl">
            <div class="h-[150px] w-[310px]" >
            <img class="h-full w-full object-cover object-center rounded-2xl" src="${each.image}" alt="">
            </div>
            <h1  onclick="loadplantdetails(${each.id})" class="font-bold text-2xl my-2">${each.name}</h1>
            <p class="font-normal text-xs">
              ${each.description}
            </p>
            <div class="flex justify-between items-center my-2">
              <button
                class="btn btn-soft btn-accent bg-[#dcfce7] text-[#15803d]"
              >
                ${each.category}
              </button>
              <h1 class="font-bold">${each.price}</h1>
            </div>
            <button onclick="add_to_cart('${each.name}',${each.price})"  class="btn w-full rounded-2xl bg-[#15803d] text-white">
              Add To Cart
            </button>
          </div>
        `
        maincontentcontainer.append(main_area)

    }
}
let totalPrice = 0

// Store cart items
let cart = {}

const add_to_cart = (name, price) => {
  const pp = parseInt(price)
  const cartItems = document.getElementById("cart-items")

  // Check if item already exists in cart
  if (cart[name]) {
    cart[name].quantity += 1
    cart[name].element.querySelector(".item-qty").innerText = `${price} × ${cart[name].quantity}`
  } else {
    // create new item entry
    const item = document.createElement("div")
    item.classList.add("h-[60px]", "w-[210px]", "bg-[#f0fdf4]", "my-3", "p-2", "mx-auto", "rounded-xl")

    item.innerHTML = `
      <h1 class="text-xl">${name}</h1>
      <div class="flex justify-between font-thin">
        <h1 class="item-qty">${price} × 1</h1>
        <i class="fa-solid fa-xmark cursor-pointer text-red-500"></i>
      </div>
    `
    // add remove functionality
    const removeBtn = item.querySelector("i")
    removeBtn.addEventListener("click", () => {
      totalPrice -= cart[name].quantity * pp
      document.getElementById("total-price").innerText = totalPrice

      delete cart[name]
      cartItems.removeChild(item)
    })
    cart[name] = { quantity: 1, element: item }
    cartItems.append(item)

  }

  totalPrice += pp
  document.getElementById("total-price").innerText = totalPrice
  alert(`${name} has been added to the cart`);
}
loadplants()
loadCatagory()