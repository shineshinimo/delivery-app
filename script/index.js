const appEl = document.querySelector('.container');
const containerEl = document.querySelector('.delivery-list');

class Delivery {
    static totalDistance = 0;

    constructor(name, street, distance, status = 'in progress') {
        this._name = name;
        this._street = street;
        this._distance = +distance;
        this._status = status;

        if (this._status === 'in progress') {
            Delivery.totalDistance += this._distance;
        }
    }

    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
        if (this.nameEl) this.nameEl.textContent = value;
    }

    get street() {
        return this._street;
    }
    set street(value) {
        this._street = value;
        if (this.addressEl) this.addressEl.textContent = value;
    }

    get distance() {
        return this._distance;
    }
    set distance(value) {
        const newDistance = +value;

        if (this._status === 'in progress') {
            Delivery.totalDistance -= this._distance;
            Delivery.totalDistance += newDistance;
        }

        this._distance = newDistance;

        if (this.distanceEl) {
            this.distanceEl.textContent = `${this._distance} km`;
        }
    }

    get status() {
        return this._status;
    }
    set status(value) {
        const oldStatus = this._status;
        const newStatus = value.toLowerCase();
        this._status = newStatus;

        if (oldStatus === 'in progress' && newStatus !== 'in progress') {
            Delivery.totalDistance -= this._distance;
        } else if (oldStatus !== 'in progress' && newStatus === 'in progress') {
            Delivery.totalDistance += this._distance;
        }

        if (this.wrapEl) {
            this.wrapEl.classList.remove('canceled', 'delivered');
            if (newStatus === 'canceled') {
                this.wrapEl.classList.add('canceled');
            } else if (newStatus === 'delivered') {
                this.wrapEl.classList.add('delivered');
            }
        }

        updateTotalDistance();
    }

    createCard(container) {
        this.wrapEl = document.createElement('div');
        this.titleNameEl = document.createElement('span');
        this.nameEl = document.createElement('span');
        this.titleAddressEl = document.createElement('span');
        this.addressEl = document.createElement('span');
        this.titleDistanceEl = document.createElement('span');
        this.distanceEl = document.createElement('span');
        this.editBtnEl = document.createElement('button');

        this.wrapEl.classList.add('delivery-card');
        this.titleNameEl.classList.add('delivery-card__el', 'delivery-card__title');
        this.nameEl.classList.add('delivery-card__el', 'delivery-card__info');
        this.titleAddressEl.classList.add('delivery-card__el', 'delivery-card__title');
        this.addressEl.classList.add('delivery-card__el', 'delivery-card__info');
        this.titleDistanceEl.classList.add('delivery-card__el', 'delivery-card__title');
        this.distanceEl.classList.add('delivery-card__el', 'delivery-card__info');
        this.editBtnEl.classList.add('delivery-card__edit');

        this.titleNameEl.textContent = 'Name';
        this.titleAddressEl.textContent = 'Address';
        this.titleDistanceEl.textContent = 'Distance';
        this.nameEl.textContent = this._name;
        this.addressEl.textContent = this._street;
        this.distanceEl.textContent = `${this._distance} km`;
        this.editBtnEl.textContent = 'Edit';

        this.status = this._status;

        this.editBtnEl.addEventListener('click', () => this.openEditModal());

        this.wrapEl.append(
            this.titleNameEl,
            this.nameEl,
            this.titleAddressEl,
            this.addressEl,
            this.titleDistanceEl,
            this.distanceEl,
            this.editBtnEl
        );
        container.append(this.wrapEl);
    }

    createModalEl() {
        const modalOverlay = document.createElement('div');
        const modalContainer = document.createElement('div');
        const formEl = document.createElement('form');
        const listContainerEl = document.createElement('ul');

        modalOverlay.classList.add('delivery-modal__overlay');
        modalContainer.classList.add('delivery-modal__container');
        formEl.classList.add('delivery-form');
        listContainerEl.classList.add('delivery-form__list');

        const inputsList = [
            createInput('Name', 'text', `Client's name`),
            createInput('Street', 'text', `Client's street`),
            createInput('Distance', 'number', `Distance to client`),
        ];

        const inputStatusEl = document.createElement('select');
        inputStatusEl.classList.add('delivery-modal__select');
        ['In progress', 'Delivered', 'Canceled'].forEach(status => {
            const optionEl = document.createElement('option');
            optionEl.textContent = status;
            optionEl.value = status;
            inputStatusEl.append(optionEl);
        });

        const closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.textContent = '⨯';
        closeBtn.classList.add('delivery-modal__close');

        const saveBtn = document.createElement('button');
        saveBtn.type = 'submit';
        saveBtn.textContent = 'Save';
        saveBtn.classList.add('delivery-form__btn');

        inputsList.forEach(input => {
            const liEl = document.createElement('li');
            liEl.classList.add('delivery-form__item');
            liEl.append(input);
            listContainerEl.append(liEl);
        });

        formEl.append(listContainerEl, inputStatusEl, saveBtn);
        modalContainer.append(formEl, closeBtn);
        modalOverlay.append(modalContainer);
        appEl.append(modalOverlay);

        return [modalOverlay, modalContainer, saveBtn, closeBtn];
    }

    openEditModal() {
        const [overlay, modal, saveBtn, closeBtn] = this.createModalEl();
        const inputs = modal.querySelectorAll('input');
        const selectEl = modal.querySelector('select');

        inputs[0].value = this._name;
        inputs[1].value = this._street;
        inputs[2].value = this._distance;
        selectEl.value = this._status;

        overlay.classList.add('modal-open');

        overlay.addEventListener('click', e => {
            if (e.target === overlay) this.closeEditModal(overlay);
        });
        closeBtn.addEventListener('click', () => this.closeEditModal(overlay));

        saveBtn.addEventListener('click', e => {
            e.preventDefault();
            this.saveEditChanges(inputs, selectEl, overlay);
        });
    }

    closeEditModal(overlay) {
        overlay.remove();
    }

    saveEditChanges(inputs, selectEl, overlay) {
        this.name = inputs[0].value;
        this.street = inputs[1].value;
        this.distance = inputs[2].value;
        this.status = selectEl.value;

        updateTotalDistance();
        overlay.remove();
    }
}

function createInput(placeholder, type, name) {
    const inputEl = document.createElement('input');
    inputEl.placeholder = placeholder;
    inputEl.name = name;
    inputEl.type = type;
    inputEl.classList.add('delivery-form__input');
    return inputEl;
}

function renderDeliveries(deliveries, container) {
    container.innerHTML = '';
    deliveries.forEach(delivery => delivery.createCard(container));
    updateTotalDistance();
}

function updateTotalDistance() {
    TotalDistanceEl.textContent = `Total distance: ${Delivery.totalDistance} km`;
}

const totalDistanceWrap = document.createElement('div');
const TotalDistanceEl = document.createElement('span');
totalDistanceWrap.classList.add('delivery-distance__wrap');
TotalDistanceEl.classList.add('delivery-distance__info');

const deliveryArr = [
    new Delivery('Dauren', 'Nursultan Nazarbayev st. 41', 4),
    new Delivery('Asylhan', 'Gogol st. 12/1', 7),
    new Delivery('Violetta', 'Kirova st. 24a', 13),
];

renderDeliveries(deliveryArr, containerEl, TotalDistanceEl);
totalDistanceWrap.append(TotalDistanceEl);
appEl.append(totalDistanceWrap);
