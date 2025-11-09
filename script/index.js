const appEl = document.querySelector('.container');
const containerEl = document.querySelector('.delivery-list');
let totalDistance = 0;

const titleEl = document.createElement('h1');
titleEl.textContent = 'Delivery Orders';

class Delivery {
    static totalDistance = 0;

    constructor(name, street, distance, status = 'in progress') {
        this.name = name;
        this.street = street;
        this.distance = distance;
        this.status = status;

        Delivery.totalDistance += distance;
    }

    createCard(container) {
        const wrapEl = document.createElement('div');
        const titleNameEl = document.createElement('span');
        const nameEl = document.createElement('span');
        const titleAddressEl = document.createElement('span');
        const addressEl = document.createElement('span');
        const titleDistanceEl = document.createElement('span');
        const distanceEl = document.createElement('span');
        const editBtnEl = document.createElement('button');

        wrapEl.classList.add('delivery-card');
        titleNameEl.classList.add('delivery-card__el', 'delivery-card__title');
        nameEl.classList.add('delivery-card__el', 'delivery-card__info');
        titleAddressEl.classList.add('delivery-card__el', 'delivery-card__title');
        addressEl.classList.add('delivery-card__el', 'delivery-card__info');
        titleDistanceEl.classList.add('delivery-card__el', 'delivery-card__title');
        distanceEl.classList.add('delivery-card__el', 'delivery-card__info');
        editBtnEl.classList.add('delivery-card__edit');

        titleNameEl.textContent = 'Name';
        titleAddressEl.textContent = 'Address';
        titleDistanceEl.textContent = 'Distance';

        nameEl.textContent = this.name;
        addressEl.textContent = this.street;
        distanceEl.textContent = `${String(this.distance)} km`;
        editBtnEl.textContent = 'Edit';

        container.append(wrapEl);
        wrapEl.append(titleNameEl, nameEl, titleAddressEl, addressEl, titleDistanceEl, distanceEl, editBtnEl);
    }

    get getTotalDistance() {
        return Delivery.totalDistance;
    }
}

function createModalEl() {
    if (document.querySelector('.delivery-modal__overlay')) {
        return;
    }

    const modalOverlay = document.createElement('div');
    const modalContainer = document.createElement('div');
    const formEl = document.createElement('form');
    const listContainerEl = document.createElement('ul');

    // const inputNameEl = createInput('Name', 'text', `Client's name`);
    // const inputStreetEl = createInput('Street', 'text', `Client's street`);
    // const inputDistanceEl = createInput('Distance', 'number', `Distance to client`);

    const inputsList = [createInput('Name', 'text', `Client's name`),
    createInput('Street', 'text', `Client's street`),
    createInput('Distance', 'number', `Distance to client`)];

    const inputStatusEl = document.createElement('select');

    const optionInProgressEl = document.createElement('option');
    const optionCanceledEl = document.createElement('option');
    const optionDeliveredEl = document.createElement('option');

    optionInProgressEl.classList.add('delivery-modal__option');
    optionCanceledEl.classList.add('delivery-modal__option');
    optionDeliveredEl.classList.add('delivery-modal__option');

    optionInProgressEl.textContent = 'In progress';
    optionCanceledEl.textContent = 'Canceled';
    optionDeliveredEl.textContent = 'Delivered';

    inputStatusEl.append(optionInProgressEl, optionDeliveredEl, optionCanceledEl);
    inputsList.forEach(input => {
        const liEl = document.createElement('li');
        liEl.append(input);
        listContainerEl.append(liEl);
    });
    formEl.append(listContainerEl);
    modalContainer.append(formEl);
    modalOverlay.append(modalContainer);

    return [
        modalOverlay,
        modalContainer,
        listContainerEl
    ]
}

function createInput(placeholder, type, name) {
    const inputEl = document.createElement('input');
    inputEl.placeholder = placeholder;
    inputEl.name = name;
    inputEl.type = type;
    inputEl.classList.add('delivery-modal__input');

    return inputEl;
}

const totalDistanceWrap = document.createElement('div');
const TotalDistanceEl = document.createElement('span');
totalDistanceWrap.classList.add('delivery-distance__wrap');
TotalDistanceEl.classList.add('delivery-distance__info');
const deliveryArr = [
    new Delivery('Dauren', 'Nursultan Nazarbayev st. 41', 4),
    new Delivery('Asylhan', 'Gogol st. 12/1', 7),
    new Delivery('Violetta', 'Kirova st. 24a', 13)
];

deliveryArr.forEach(client => {
    client.createCard(containerEl);
    totalDistance = client.getTotalDistance;
})

TotalDistanceEl.textContent = `Total distance: ${totalDistance} km`;

totalDistanceWrap.append(TotalDistanceEl);
appEl.append(totalDistanceWrap);
