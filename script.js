//https://randomuser.me/api
const main = document.getElementById('main');
const addUsersbtn = document.getElementById('add_user');
const doubleMoneybtn = document.getElementById('Double_money');
const showMillionaresbtn = document.getElementById('show_millionares');
const sortbtn = document.getElementById('sort');
const calculateWealthbtn = document.getElementById('calculate_wealth');


let dataArr = [];

// let dataArr = [ name:`${result.first} ${result.last}`, money: Math.floor(Math.random() * 1000000)];

getRandomUser();
getRandomUser();
getRandomUser();


//fetch API
 async function getRandomUser(){
	const fetchData = await fetch('https://randomuser.me/api');
	const data = await fetchData.json();
	const result = data.results[0].name;

	const newData = {
		name:`${result.first} ${result.last}`,
		money: Math.floor(Math.random() * 1000000)
	}

	fetchResult(newData);

}


//INSERT FETCHED DATA FROM API INTO THE EMPTY ARRAY
function fetchResult(obj){
	dataArr.push(obj);

	updateDom();
}

//updateDom
function updateDom(providedData = dataArr){
	main.innerHTML = '<h2><strong>Name</strong>Wealth</h2>';
	providedData.forEach((item) =>{
		const element = document.createElement('div');
		element.classList.add('person');
		element.innerHTML = `<strong>${item.name}</strong>${moneyFormat(item.money)}`;

		main.appendChild(element);
	})
}

//double the money using map array method
function doublemoney(){
		dataArr = dataArr.map((names)=>{
			return { ...names, money: names.money * 2 }


		});

		updateDom();

};


//show millionares by filter method
function showMillionares(){
	dataArr = dataArr.filter((item)=>{
		// return {...item, money: item.money > 1000000};
		return item.money > 1000000;
	})
	updateDom();
}

//sort method
function sortByRiches(){
	dataArr =dataArr.sort((a, b)=>{
		return b.money - a.money;
	});
	updateDom();
};


//calculate total wealth
function calculateWealth(){
	const wealth = dataArr.reduce((acc, item)=>{
		return (acc+=item.money);
	}, 0);

	const total = document.createElement('div');
		total.innerHTML =`<h3>Total: <strong>${moneyFormat(wealth)}</strong></h3>`;
		main.appendChild(total);

}



//putting figures in money format
function moneyFormat(number){
	return '$'+number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//event
addUsersbtn.addEventListener('click', getRandomUser);
doubleMoneybtn.addEventListener('click', doublemoney);
showMillionaresbtn.addEventListener('click', showMillionares);
sortbtn.addEventListener('click', sortByRiches);
calculateWealthbtn.addEventListener('click', calculateWealth);







