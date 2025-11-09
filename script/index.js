const appEl = document.querySelector('.container');
const containerEl = document.querySelector('.delivery-list');
let totalDistance = 0;

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

        switch (this.status.toLowerCase()) {
            case 'canceled':
                wrapEl.classList.add('canceled');
                break;
            case 'delivered':
                wrapEl.classList.add('delivered');
                break;
            default:
                if (wrapEl.classList.contains('canceled') || wrapEl.classList.contains('delivered')) {
                    wrapEl.classList.remove('delivered');
                    wrapEl.classList.remove('canceled');
                }
        }

        container.append(wrapEl);
        wrapEl.append(titleNameEl, nameEl, titleAddressEl, addressEl, titleDistanceEl, distanceEl, editBtnEl);

        editBtnEl.addEventListener('click', () => {
            this.openEditModal();
        });
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
            createInput('Distance', 'number', `Distance to client`)
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

        inputs[0].value = this.name;
        inputs[1].value = this.street;
        inputs[2].value = this.distance;

        overlay.classList.add('modal-open');

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.closeEditModal(overlay);
        });

        closeBtn.addEventListener('click', () => this.closeEditModal(overlay));

        saveBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.saveEditChanges(inputs, overlay);
        });
    }

    closeEditModal(overlay) {
        overlay.remove();
    }

    saveEditChanges(inputs, overlay) {
        Delivery.totalDistance -= this.distance;

        const selectEl = document.querySelector('select');

        this.name = inputs[0].value;
        this.street = inputs[1].value;
        this.distance = +inputs[2].value;
        this.status = selectEl.value;

        Delivery.totalDistance += this.distance;

        renderDeliveries(deliveryArr, containerEl, TotalDistanceEl);
        overlay.remove();
    }

    get getTotalDistance() {
        return Delivery.totalDistance;
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

function renderDeliveries(deliveries, container, distEl) {
    container.innerHTML = '';
    deliveries.forEach(delivery => delivery.createCard(container));
    distEl.textContent = `Total distance: ${Delivery.totalDistance} km`;
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

renderDeliveries(deliveryArr, containerEl, TotalDistanceEl);

totalDistanceWrap.append(TotalDistanceEl);
appEl.append(totalDistanceWrap);
