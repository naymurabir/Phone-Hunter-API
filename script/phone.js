// Load Phones from API
const loadPhonesData = async (searchText, isShowAll) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await response.json()
    const phones = data.data
    // console.log(phones);
    displayPhonesData(phones, isShowAll)
}
loadPhonesData()


// Display Phones from API
const displayPhonesData = (phones, isShowAll) => {
    const cardsContainer = document.getElementById('cards-container')

    // Clear the search field before new cards added
    cardsContainer.textContent = ''


    const showAllButton = document.getElementById('showAll-button')
    if (phones.length > 12 && !isShowAll) {
        showAllButton.classList.remove('hidden')
    } else {
        showAllButton.classList.add('hidden')
    }

    // Display The first twelve Phones:
    if (!isShowAll) {
        phones = phones.slice(0, 12)
    }

    phones.forEach(phone => {
        // console.log(phone);
        const cardDiv = document.createElement('div')
        cardDiv.classList = (`card bg-base-100 shadow-xl mt-5 py-10 bg-green-100`)
        cardDiv.innerHTML = `
        
        <figure><img src="${phone.image} " alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title"> ${phone.phone_name} </h2>
            <p>Visit us and buy the best phones.</p>
            <div class="card-actions justify-center mt-3">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `
        cardsContainer.appendChild(cardDiv)
    });

    handleLoadingSpinner(false)
}

// Handle Search Button
const handleSearchButton = (isShowAll) => {
    handleLoadingSpinner(true)
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value
    loadPhonesData(searchText, isShowAll)
}

// Handle Loading Spinner
const handleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner')
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    } else {
        loadingSpinner.classList.add('hidden')
    }
}

// Handle Show All button:
const handleShowAll = async () => {
    handleSearchButton(true)
}


// Handle Show Details Button
const handleShowDetails = async (id) => {
    // console.log('show details button clicked', id);
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await response.json()
    // console.log(data);
    const phone = data.data
    handlePhoneDetails(phone)

}

// Handle phone Details for Modal
const handlePhoneDetails = (phone) => {
    show_details_modal.showModal()
    console.log(phone);

    const phoneName = document.getElementById('phone-name')
    phoneName.innerText = phone.name

    const showDetailsContainer = document.getElementById('show-details-container')
    showDetailsContainer.innerHTML = `
        <img src = "${phone.image} " alt="" />
        <h3 > <span class="font-bold"> Storage: </span>  ${phone?.mainFeatures?.storage} </h3>
        <h3> <span class="font-bold">Display Size: </span> ${phone?.mainFeatures?.displaySize
        } </h3>
        <h3> <span class="font-bold">ChipSet: </span> ${phone?.mainFeatures?.chipSet
        } </h3>
        <h3> <span class="font-bold">Memory: </span> ${phone?.mainFeatures?.memory
        } </h3>
        <h3> <span class="font-bold">ID: </span> ${phone?.slug
        } </h3>
        <h3> <span class="font-bold">Release Date: </span> ${phone?.releaseDate

        } </h3>
        <h3> <span class="font-bold"> Brand: </span> ${phone?.brand} <h3>
        <h3> <span class="font-bold"> GPS: </span> ${phone?.others?.GPS} <h3>

    `
}
