const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data
    // console.log(phones);2
    displayPhone(phones);
};
const displayPhone= phones => {
    //step-2:-jekhane bosabo seta set korbo
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent='';

     // display show all button if there are more than 12 phones
     const showAllContainers = document.getElementById('show-all-container');
     if(phones.length>12){
         showAllContainers.classList.remove('hidden');
     }else{
         showAllContainers.classList.add('hidden');
     }

    // filter phones searching
    phones=phones.slice(0,12);
   

    // console.log(phones);
    phones.forEach(phone => {


        // console.log(phone);
 vc 

        //step-2:- create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = 'card card-compact  bg-gray-100 p-4 shadow-xl';
        //step-3:- set inner html
        phoneCard.innerHTML =`
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
         <div class="card-body">
           <h2 class="card-title">${phone.phone_name}</h2>
           <p>If a dog chews shoes whose shoes does he choose?</p>
           <div class="card-actions justify-center">
             <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">show details</button>
           </div>
         </div>
        `
        // step-4:-append child
        phoneContainer.appendChild(phoneCard);
    });
    toggleLoadSpinner(false);
}

const handleShowDetails= async(id) => {
    // console.log('showDetails called:-',id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    // console.log(data);
   
    const phone=data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails=(phone)=>{
    console.log(phone);
    
      const showDetailsContainer=document.getElementById('phone-details-container');
      showDetailsContainer.innerHTML=`
      <img src="${phone.image}" alt="">
      <h2>${phone.name}</h2>
      <p>${phone.slug}</p>
      <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
      <p><span>Display Size :</span>${phone?.mainFeatures?.displaySize}</p>
      <p><span>Chipset :</span>${phone?.mainFeatures?.chipSet}</p>
      <p><span> Memory :</span>${phone?.mainFeatures?.memory}</p>
      <p><span>Release data :</span>${phone?.releaseDate}</p>
      <p><span>Brand :</span>${phone?.brand}</p>
      `;

    // show modal
    showDetailsModal.showModal()
}

// handle search button
const handleSearch=() => {
    toggleLoadSpinner(true);
   const searchFiled=document.getElementById('search-filed');
   const searchText=searchFiled.value;
//    console.log(searchText);
   loadPhone(searchText);
}
const toggleLoadSpinner = (isLoading) => {
    const loader = document.getElementById('loading-spinner');
    if(isLoading){
        loader.classList.remove('hidden');
    }else{
        loader.classList.add('hidden');
    }
}
// loadPhone();


