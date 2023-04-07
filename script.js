const api = 'https://api.unsplash.com/';
const key = 'V1G024qwJvQCyPExh77FW-trJmhzunzL_4zr-1_M5SM';

const field = document.querySelector('input');
const imgcont = document.querySelector('#images');
const crntpg = document.querySelector('#crntpg');
const prv = document.querySelector('#prv');
const nxt = document.querySelector('#nxt');

let pg = 1;
let maxpg;

const searchPhoto = (q, p) => {
	imgcont.innerHTML = '';
	fetch(`${api}/search/photos?query=${q}&per_page=30&page=${p}`, {
		headers: {
			'Authorization': `Client-ID ${key}` 
		}
	})
	.then(res => res.json())
	.then(data => {
		maxpg = data.total_pages;
		crntpg.innerHTML = `Page: ${pg} (${maxpg} total)`;
		console.log(data);
		const imgs = data.results;

		for(let i in imgs){

			const imgd = document.createElement('div');
			imgd.classList.add('imgd');
			const img = document.createElement('img');
			const downlnk = document.createElement('a');
			const imginf = document.createElement('div');
			imginf.classList.add('imginf');

			img.src = imgs[i].urls.small;
			img.alt = imgs[i].alt_description;
			img.title = imgs[i].alt_description;

			downlnk.href = imgs[i].links.download;
			downlnk.innerHTML = '<img src="dwn.svg"></img>';
			downlnk.target = '_blank';

			imginf.innerHTML = `<p>${imgs[i].width}x${imgs[i].height} | ❤️ ${imgs[i].likes} likes</p>`

			imgd.append(img, downlnk, imginf);
			imgcont.appendChild(imgd);
		}
	});
}

const getLatestPhoto = () => {
	imgcont.innerHTML = '';
	fetch(`${api}/photos?per_page=30`, {
		headers: {
			'Authorization': `Client-ID ${key}` 
		}
	})
	.then(res => res.json())
	.then(data => {
		crntpg.innerHTML = `Pagination only supported when photo searched`;
		maxpg = data.total_pages;
		console.log(data);
		const imgs = data;

		for(let i in imgs){

			const imgd = document.createElement('div');
			imgd.classList.add('imgd');
			const img = document.createElement('img');
			const downlnk = document.createElement('a');
			const imginf = document.createElement('div');
			imginf.classList.add('imginf');

			img.src = imgs[i].urls.small;
			img.alt = imgs[i].alt_description;
			img.title = imgs[i].alt_description;

			downlnk.href = imgs[i].links.download;
			downlnk.innerHTML = '<img src="dwn.svg"></img>';
			downlnk.target = '_blank';

			imginf.innerHTML = `<p>${imgs[i].width}x${imgs[i].height} | ❤️ ${imgs[i].likes} likes</p>`

			imgd.append(img, downlnk, imginf);
			imgcont.appendChild(imgd);
		}
	});
}

getLatestPhoto();

field.addEventListener('keypress', (e) => {
	if(e.key == 'Enter'){
		searchPhoto(field.value, '1');
	}
});

prv.addEventListener('click', () => {
	if(pg > 1){
		pg--;
		searchPhoto(field.value, pg.toString());
	}
});

nxt.addEventListener('click', () => {
	if(pg < maxpg){
		pg++;
		searchPhoto(field.value, pg.toString());
	}
});