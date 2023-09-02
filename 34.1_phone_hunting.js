// loading phones/data form api
const loadPhone = async (searchText=13, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    // console.log(data);
    const phones = data.data;
    displayPhones(phones, isShowAll);
}


// displaying phones/data into web page
const displayPhones = (phones, isShowAll) => {

    // console.log(phones);
    // step - 1 get the section where you want to add phone card
    const phoneContainer = document.getElementById('phone-container');
    // clear the phone container before loading phones by default
    phoneContainer.textContent = '';

    // display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }

    // console.log('is show All ', isShowAll);

    // display only first 12 phones
    if(!isShowAll){
        phones = phones.slice(0,12);
    }

    // console.log(phones);
    phones.forEach(phone => {
        // console.log(phone);
        // step - 2  create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-200 p-4 shadow-xl`;
        // step - 3 set innerHTML
        phoneCard.innerHTML = `
            <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${phone.slug}'); show_details_modal.showModal()" class="btn btn-primary">Show Details</button>
            </div>
            </div>
        `;
        // step - 4 appending phone card to phone container
        phoneContainer.appendChild(phoneCard);
    })

    // hide the spinner
    toggleLoadingSpinner(false);
}


// eventHandler to search button
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll)
}


// const handleSearch2 = () => {
//     toggleLoadingSpinner(true);
//     const searchField = document.getElementById('search-field2');
//     const searchText = searchField.value;
//     loadPhone(searchText)
// }


const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

// handleShowAll()
const handleShowAll = () => {
    handleSearch(true);
}


const handleShowDetails = async (id) => {
    console.log('ekhane click porse', id);

    // new fetch data from api
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    // console.log(data);
    const phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('show_details_phone_name');
    phoneName.innerText = phone.name;
    const showDetailsContainer = document.getElementById('show_details_container');
    showDetailsContainer.innerHTML = `
        <img src="${phone.image}"/>
        <p><span>Storage : </span>${phone?.mainFeatures?.storage}</p>
        <p><span>Display Size : </span>${phone?.mainFeatures?.displaySize}</p>
        <p><span>Chipset : </span>${phone?.mainFeatures?.chipSet}</p>
        <p><span>Memory : </span>${phone?.mainFeatures?.memory}</p>
        <p><span>Slug : </span>${phone?.slug}</p>
        <p><span>Release Date : </span>${phone?.releaseDate}</p>
        <p><span>Brand : </span>${phone?.brand}</p>
        <p><span>GPS : </span>${phone?.others?.GPS || 'No GPS'}</p>  /* Using Optional chaining */
        <p><span>GPS : </span>${phone?.others?.GPS ? phone.others.GPS : 'No GPS'}</p>  /* Using ternary operator */
    `

    // show the modal
    show_details_modal.showModal();
}

loadPhone();