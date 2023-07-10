import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
// import $ from 'jquery/dist/jquery.min';

Cropper.setDefaults({
	dragMode: 'none',
	viewMode: 1,
	preview: '',
	responsive: true,
	restore: true,
	checkCrossOrigin: false,
	modal: true,
	guides: true,
	center: false,
	highlight: true,
	background: true,
	autoCrop: true,
	// autoCropArea: 1,
	// data: {left: 0, top: 0, width: 100, height: 100},
	// data: null,
	// image start
	movable: true,
	rotatable: false,
	scalable: false,
	zoomable: false,
	zoomOnTouch: false,
	zoomOnWheel: false,
	wheelZoomRatio: false,
	// image stop
	// crop box start
	cropBoxMovable: true,
	cropBoxResizable: false,
	toggleDragModeOnDblclick: false,
	minContainerWidth: 0,
	minContainerHeight: 0,
	// crop box stop
	minCanvasWidth: 0,
	minCanvasHeight: 0,
	minCropBoxWidth: 0,
	minCropBoxHeight: 0,
});
// eslint-disable-next-line no-undef
const image = document.getElementById('target');

const rotate90 = document.getElementById('rotate-0');
// parametry i ustawienia startowe
// pobieramy wielkość w pikselach oryginału
// eslint-disable-next-line no-undef
const imageOrgWidth = document.getElementById('org_w');
// eslint-disable-next-line no-undef
const imageOrgHeight = document.getElementById('org_h');

// wyliczamy maksymalne wymiary wydruku
const maxPrintWidth = parseInt(imageOrgWidth.value / 12, 10); // w cm
// eslint-disable-next-line radix
const maxPrintHeight = parseInt(imageOrgHeight.value / 12, 10); // w cm

// przypisujemy do zmiennych inputy szerokość i wysokość
const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');

// wyświetlamy maksymalne wartosci wydruku na stronie w inputach
widthInput.value = 100;
heightInput.value = 100;

if ((imageOrgWidth.value / imageOrgHeight.value) >= 1) {
	const widthThumb = 458;
	const heightThumb = (imageOrgWidth.value / imageOrgHeight.value) / 458;
} else {
	const heightThumb = 458;
	const widthThumb = (imageOrgWidth.value / imageOrgHeight.value) * 458;
}


// zmienna Ratio przechowuje proporcje szekokość / wysokość  wprowadzonych na stronie przez clienta
// let Ratio = widthInput.value / heightInput.value;

// prod
// let COLOR = 16;
// let GRAY = 17;
// let SEPIA = 18;
// let MIRROR = 19;

// dev
const COLOR = 11;
const GRAY = 12;
const SEPIA = 13;
const MIRROR = 14;

const effect = COLOR;

function size2crop() {
	const wRatio = widthInput.value / maxPrintWidth;
	const hRatio = heightInput.value / maxPrintHeight;
	let widthKadr = widthThumb.value;
	let heightKadr = heightThumb.value;
	if (wRatio > hRatio) {
		heightKadr = (heightInput.value * widthThumb.value) / widthInput.value;
	} else {
		widthKadr = (widthInput.value * heightThumb.value) / heightInput.value;
	}
	widthKadr = parseInt(widthKadr, 10);
	heightKadr = parseInt(heightKadr, 10);

	// eslint-disable-next-line no-use-before-define
	cropper.setData({
		left: 0,
		top: 0,
		width: widthKadr,
		height: heightKadr,
	});
}

function area() {
	// eslint-disable-next-line no-mixed-operators
	return widthInput.value * heightInput.value / 10000;
}

function cena() {
	const areaPrint = area();
	const tapeta = document.getElementById('product');
	const cena = document.getElementById('cena');
	const cenaRegular = document.getElementById('cenaregular');
	const cenaDisplay = document.getElementById('cena_display');
	const cenaDisplayRegular = document.getElementById('cena_display_regular');
	const url = `/price?dana1=${areaPrint}&dana2=${tapeta.value}&dana3=${effect}`;
	const showPrice = (json) => {
		cena.value = json.cena;
		cenaDisplay.textContent = json.cena + ',00 zł';
		cenaRegular.value = json.cenaRegular;
		cenaDisplayRegular.textContent = json.cenaRegular + ',00 zł';
	};

	fetch(url)
		.then((result) => {
			if (result.status !== 200) {
				throw Error('to nie jest odpowiedz 200');
			} else {
				return result.json();
			}
		})
		.then(json => showPrice(json))
		.catch(err => console.log(err));
}



// tworzymy instancje kadru
const cropper = new Cropper(image, {
	aspectRatio: null,
	ready(event) {
		size2crop();
	},
});

size2crop();
cena();
widthInput.focus();

widthInput.addEventListener('input', () => {
	// sprawdzić czy nie przekraczamy maxPrintWidth
	widthInput.value > maxPrintWidth ? widthInput.value = maxPrintWidth : null;
	size2crop();
	cena();
});

heightInput.addEventListener('input', () => {
	// sprawdzić czy nie przekraczamy maxPrintHeight
	heightInput.value > maxPrintHeight ? heightInput.value = maxPrintHeight : null;
	size2crop();
	cena();
});

const product = document.getElementById('product');
product.addEventListener('change', () => {
	cena();
});

const effectPrint = document.getElementById('effect');
effectPrint.value = COLOR;

// miniaturki dostają klasy efektów albo przeniesc do html?
const color = document.getElementById(COLOR);
const gray = document.getElementById(GRAY);
gray.classList.add('image-gray');
const sepia = document.getElementById(SEPIA);
sepia.classList.add('image-sepia');
const mirror = document.getElementById(MIRROR);
mirror.classList.add('image-mirror');

mirror.addEventListener('click', function () {
	effectPrint.value = mirror.attributes.item(0).value;
	const obraz = document.querySelectorAll('.cropper-view-box').item(0).childNodes.item(0);
	if (this.style.getPropertyValue('transform') !== 'scaleX(-1)') {
		this.style.transform = 'scaleX(-1)';
	} else {
		this.style.transform = 'scaleX(1)';
	}
	obraz.style.removeProperty('transform');
	obraz.classList.toggle('image-mirror');
	effectPrint.value = MIRROR;
});


sepia.addEventListener('click', () => {
	effectPrint.value = sepia.attributes.item(0).value;
	const obraz = document.querySelectorAll('.cropper-view-box').item(0).childNodes.item(0);
	obraz.classList.remove('image-gray');
	obraz.classList.add('image-sepia');
	effectPrint.value = SEPIA;
});


gray.addEventListener('click', () => {
	effectPrint.value = gray.attributes.item(0).value;
	const obraz = document.querySelectorAll('.cropper-view-box').item(0).childNodes.item(0);
	obraz.classList.remove('image-sepia');
	obraz.classList.add('image-gray');
	effectPrint.value = GRAY;
});

color.addEventListener('click', () => {
	effectPrint.value = color.attributes.item(0).value;
	const obraz = document.querySelectorAll('.cropper-view-box').item(0).childNodes.item(0);
	obraz.classList.remove('image-gray');
	obraz.classList.remove('image-sepia');
	effectPrint.value = COLOR;
});

const order = document.getElementById('zamawiam');
order.addEventListener('click', (e) => {
	e.preventDefault();

	const data = cropper.getData();
	const left = document.getElementById('Sx1');
	const top = document.getElementById('Sy1');
	const Sx2 = document.getElementById('Sx2');
	const Sy2 = document.getElementById('Sy2');
	let widthPrint = document.getElementById('widthPrint');
	let heightPrint = document.getElementById('heightPrint');

	widthPrint = data.width;
	heightPrint = data.height;

	Sx2.value = data.x + data.width;
	Sy2.value = data.y + data.height;

	left.value = data.x;
	top.value = data.y;
	const form = document.getElementById('coords');
	form.submit();
});

widthInput.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		e.preventDefault();
	}
});

heightInput.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		e.preventDefault();
	}
});

widthInput.addEventListener('click', () => {
	size2crop();
});

heightInput.addEventListener('click', () => {
	size2crop();
});

// rotate90.addEventListener('click', () => {
//   console.log('kręci się');
//   cropper.rotate(-90);
// });
