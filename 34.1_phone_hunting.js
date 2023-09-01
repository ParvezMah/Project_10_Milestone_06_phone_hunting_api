// loading phones/data form api
const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    // console.log(data);
    const phones = data.data;
    displayPhones(phones);
}





// displaying phones/data into web page
const displayPhones = phones => {

    console.log(phones);
    // step - 1 get the section where you want to add phone card
    const phoneContainer = document.getElementById('phone-container');
    // clear the phone container before loading phones by default
    phoneContainer.textContent = '';

    // display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }


    // display only first 12 phones
    phones = phones.slice(0,12);

    // console.log(phones);
    phones.forEach(phone => {
        console.log(phone);
        // step - 2  create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-200 p-4 shadow-xl`;
        // step - 3 set innerHTML
        phoneCard.innerHTML = `
            <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
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
const handleSearch = () =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText)
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
// loadPhone();