const appEl = document.querySelector('.container');
const containerEl = document.querySelector('.delivery-list');
const totalDistance = 0;

const titleEl = document.createElement('h1');
titleEl.textContent = 'Delivery Orders';

class Delivery {
    constructor(name, street, distance, status = 'in progress') {
        this.name = name;
        this.street = street;
        this.distance = distance;
        this.status = status;
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
}

const totalDistanceWrap = document.createElement('div');
const TotalDistanceEl = document.createElement('span');
totalDistanceWrap.classList.add('delivery-distance__wrap');
TotalDistanceEl.classList.add('delivery-distance__info');
TotalDistanceEl.textContent = `Total distance: ${totalDistance} km`;

const deliveryArr = [
    new Delivery('Dauren', 'Nursultan Nazarbayev st. 41', 4),
    new Delivery('Asylhan', 'Gogol st. 12/1', 7),
    new Delivery('Violetta', 'Kirova st. 24a', 13)
];

deliveryArr.forEach(client => {
    client.createCard(containerEl);
})

totalDistanceWrap.append(TotalDistanceEl);
appEl.append(totalDistanceWrap);
