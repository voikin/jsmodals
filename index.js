let fruits = [
	{
		id: 1,
		title: 'яблоки',
		price: 20,
		img: 'https://m.dom-eda.com/uploads/images/catalog/item/86df51de21/c25c94fe96_1000.jpg',
	},
	{
		id: 2,
		title: 'апельсины',
		price: 40,
		img: 'https://foodcity.ru/storage/products/October2018/6XZSr6ddCl6cxfo0UchP.jpg',
	},
	{
		id: 3,
		title: 'груши',
		price: 600,
		img: 'https://www.khanroks.ru/upload/resize_cache/iblock/dd8/500_500_1/63170.jpg',
	},
	{
		id: 4,
		title: 'банан',
		price: 12,
		img: 'https://yastatic.net/avatars/get-grocery-goods/2998515/468edfb5-bdd1-48b6-bfc8-ef8364f6beb4/464x464-origin',
	},
	{
		id: 5,
		title: 'драгонфрут',
		price: 103,
		img: 'https://img.b2b.trade/28d7f208-c180-40fd-9d95-a13150328997/-/smart_resize/500x500/-/quality/lightest/-/format/webp/',
	},
	{
		id: 6,
		title: 'ананас',
		price: 666,
		img: 'https://s.myspar.ru/upload/img/10/1008/100839022.jpg?1583142564',
	},
	{
		id: 7,
		title: 'манго',
		price: 77,
		img: 'https://imgproxy.sbermarket.ru/imgproxy/size-500-500/aHR0cHM6Ly9zYmVybWFya2V0LnJ1L3N0YXRpY3Mvc3ByZWUvcHJvZHVjdHMvMTEzNTIxL29yaWdpbmFsLzEyMTY5OS5qcGc_MTU4NzQwMTYxNg.jpg',
	},
]

const toHTML = (fruit) => {
	return `
        <div class = "card" style="width: 18rem; height: 25rem">
            <img class="card-img-top" src="${fruit.img}" alt="${fruit.title}">
            <div class="card-body" style="padding-bottom: 2rem">
                <h5 class="card-title">${fruit.title}</h5>
                <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Узнать цену</a>
                <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
            </div>
        </div>
    `
}

const render = (fruits) => {
	const cards = document.querySelector('#fruits')
	cards.innerHTML = ''
	fruits = fruits.map(toHTML)
	fruits.forEach((frt) => {
		cards.innerHTML += frt
	})
}

render(fruits)

const priceModal = $.modal({
	title: 'Цена на товар',
	closable: true,
	width: '400px',
	footerButtons: [
		{
			text: 'Закрыть',
			type: 'primary',
			handler() {
				priceModal.close()
			},
		},
	],
})

document.addEventListener('click', (event) => {
	event.preventDefault()
	const btn = event.target.dataset.btn
	const id = +event.target.dataset.id
	const fruit = fruits.find((frt) => frt.id === id)

	if (btn === 'price') {
		const content = `
            <p>Цена на ${fruit.title}: <strong>${fruit.price} ед.</strong></p>
        `
		priceModal.setContent(content)
		priceModal.open()
	} else if (btn === 'remove') {
		$.confirm({
			title: 'Вы уверены?',
			content: `<p>Вы удаляете <strong>${fruit.title}</strong></p>`,
		})
			.then(() => {
				fruits = fruits.filter((frt) => frt.id !== fruit.id)
				render(fruits)
			})
			.catch(() => console.log('cancel'))
	}
})
