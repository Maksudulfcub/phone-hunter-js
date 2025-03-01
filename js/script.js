const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    const showAllButton = document.getElementById('showAll-button');
    if (phones.length > 12 && !isShowAll) {
        showAllButton.classList.remove('hidden')
    }
    else {
        showAllButton.classList.add('hidden')
    }

    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 shadow-xl`;
        phoneCard.innerHTML = `
        <figure>
        <img src="${phone.image}" alt="Shoes" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>${phone.slug}</p>
             <div class="card-actions justify-center">
                <button onClick = "handleShowDetails('${phone.slug}');my_modal_5.showModal()" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    toggleLoadingSpinner(false)
}

const handleShowDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
    console.log(phone);
    const modalContainer = document.getElementById('modal-container');
    const phoneDetailsContainer = document.getElementById('show-details-container');
    phoneDetailsContainer.innerHTML = `
    <img src="${phone.image}" alt="">
    <h3 class="font-bold text-3xl">${phone.name}</h3>
    <p>Storage : ${phone.mainFeatures.storage} </p>
    <p>Display Size : ${phone.mainFeatures.displaySize} </p>
    <p>Chipset : ${phone.mainFeatures.chipSet} </p>
    <p>Memory : ${phone.mainFeatures.memory} </p>
    <p>Release Date : ${phone.releaseDate} </p>
    <p>Brand : ${phone.brand} </p>
    `;
    modalContainer.appendChild(phoneDetailsContainer);
}

const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

const handleShowAll = () => {
    handleSearch(true)
}

// loadPhone();