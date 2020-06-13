let socket;
socket = io.connect('http://localhost:3000');

const words = [
	{'name': 'Ankle', 'status': 'blue'},
	{'name': 'Pencil', 'status': 'red'},
	{'name': 'Broom', 'status': 'neutral'},
	{'name': 'Plow', 'status': 'blue'},
	{'name': 'Winter', 'status': 'bomb'},
	{'name': 'Avocado', 'status': 'blue'},
	{'name': 'Observatory', 'status': 'neutral'},
	{'name': 'School', 'status': 'blue'},
	{'name': 'Pepper', 'status': 'red'},
	{'name': 'Quarantine', 'status': 'blue'},
	{'name': 'Dominoes', 'status': 'red'},
	{'name': 'Zoo', 'status': 'neutral'},
	{'name': 'Lyrics', 'status': 'red'},
	{'name': 'Belt', 'status': 'neutral'},
	{'name': 'Invitation', 'status': 'blue'},
	{'name': 'Riddle', 'status': 'neutral'},
	{'name': 'Mailbox', 'status': 'red'},
	{'name': 'Telephone', 'status': 'neutral'},
	{'name': 'Jelly', 'status': 'blue'},
	{'name': 'College', 'status': 'red'},
	{'name': 'Monster', 'status': 'blue'},
	{'name': 'Hopscotch', 'status': 'neutral'},
	{'name': 'Olympian', 'status': 'red'},
	{'name': 'Killer', 'status': 'blue'},
	{'name': 'Handwriting', 'status': 'red'},
];


const container = document.getElementById('game');
const gone = document.getElementById('gone');
words.forEach((word) => {
	gone.insertAdjacentHTML('beforeend', `<div id='cell' class='cell active' data-word='${word.name}' onclick='triggerClickCell()'>${word.name}</div>  `);
});
const cells = document.querySelectorAll('.cell');
//cells.forEach((cell, index) =>{
//	cell.innerHTML = words[index]['name'];
//});

let redPoints = 8;
let bluePoints = 9;

function showColour(data){
	console.log(data)

 	//event.target.classList.add(findName.status);


	const clickedWord = data.word;
	console.log(clickedWord);
	let clickedCell = document.querySelector(`[data-word='${clickedWord}']`);
	const findName = words.find(element => element.name == clickedCell.innerHTML);
	console.log(clickedCell);

	if(clickedCell.classList.contains('active')) {

		if (findName.status == 'red') {
			redOut = document.getElementById('reds');
			redPoints --;
			console.log('red:' + redPoints);
			redOut.innerHTML = redPoints;
			clickedCell.classList.add('red');
		};

		if (findName.status == 'blue') {
			blueOut = document.getElementById('blues');
			bluePoints --;
			console.log('blue:' + bluePoints);		
			blueOut.innerHTML = bluePoints;
			clickedCell.classList.add('blue');
		};
		if (findName.status == 'neutral') {
			clickedCell.classList.add('neutral');
		};
		clickedCell.classList.remove('active');
	

		if (findName.status == 'bomb') {
				const gone = document.getElementById('gone');
				console.log(gone);
				gone.style.display = 'none';
				const rerun = document.getElementById('rerun');
				rerun.insertAdjacentHTML('beforeend', `<button onclick="socket.emit('rerun');">Rerun</button>`);
		};
	};
}
socket.on('reload', () => {window.location.reload()});

const triggerClickCell = () => {

	const clickedWord = event.target.innerText;
	console.log(clickedWord);

	let data = {
		word: clickedWord
	}
	socket.emit('trigger-click-cell', data)
}

socket.on('click-cell', showColour);

function spyMaster(){
	console.log('Imma Spy');
	const findSpy = words.forEach((element,index) =>{

		if(element.status == 'red'){
			cells[index].classList.toggle('spyRed');
		};

		if(element.status == 'blue'){
			cells[index].classList.toggle('spyBlue');
		};

		if(element.status == 'neutral'){
			cells[index].classList.toggle('spyNone');
		};

		if(element.status == 'bomb'){
			cells[index].classList.toggle('spyBomb');
		};
	})
	
}