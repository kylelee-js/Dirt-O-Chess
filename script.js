// 롤토체스 바닐라 자바스크립트 제작기
// 우정잉님의 클립에 영감을 얻어 토이프로젝트 시작
// 자바스크립트에 대한 공부와 꾸준한 개발을 위해 프로젝트에 임함
// 꼼꼼하게 설계하지 않아 추후에 대규모의 리펙토링이 필요
// 
// 11. 14. 2019 - 리기훈


// 골드와 마나
// Default Dataset
var gold = 100;
const mana = 100;


// 챔피언 객체 생성 클래스
// template :  { _name : '', _class : '', _species : '', ...}
class Champion
{
	constructor(name, chamClass, species, price = 3, rank = "common", hp, atk, atk_speed)
	{
		this.name = name;
		this.price = price;
		this.rank = rank;
		this.chamClass = chamClass;
		this.hp = hp;		
		// this.mana-generation = m_g;
		this.species = species;		
		this.atk = atk;
		this.atk_speed = atk_speed; 
	}

	upgrade(){
		this.hp = this.hp*3;
		this.atk = this.atk*3;
	}

	get upgrade_resell(){
		return this.price*2.5;
	}

	set upgraded_price(price){
		this.price = price*2.5;
	}
}


// 각 챔피언 객체 생성 
// 이거는 어떻게 데이터화 시킬까?
// Firebase로 연동하기
var Garen = new Champion('가렌', '기사', '귀족', 1, 'common', 1000, 5, 1);
var Ahri = new Champion('아리', '메이지', '야생', 1, 'common', 700, 7, 1);
var Kassadin = new Champion('카사딘', '메이지', '공허', 1, 'common', 1000, 5, 1);
var Varus = new Champion('바루스', '정찰대','악마', 1, 'common', 1000, 5, 1);
var Warwick = new Champion('워윅', '싸움꾼', '야생', 1, 'common', 1000, 5, 1);
var Darius = new Champion('다리우스', '기사', '제국', 'common', 1000, 5, 1);
var Nidalee = new Champion('니달리', '싸움꾼', '야생', 1, 'common', 1000, 5, 1);
var Fiora = new Champion('피오라', '기사', '귀족', 1, 'common', 1000, 5, 1);
var RekSai = new Champion('렉사이', '싸움꾼', '공허', 1, 'common', 1000, 5, 1);
var Vayne = new Champion('베인', '정찰대', '귀족', 1, 'common', 1000, 5, 1);
var Evelynn = new Champion('이블린', '암살자', '악마', 1, 'common', 1000, 5, 1);
var KhaZix = new Champion('카직스', '암살자', '공허', 1, 'common', 1000, 5, 1);

arr_cham = [Garen, Ahri, Kassadin, Varus, Warwick, Darius, Nidalee, Fiora, RekSai, Vayne, Evelynn, KhaZix]


const createBench = () => {
	const bench = document.querySelector("#Bench");
	for (let i = 0; i < 5; i++) {
		let btn = document.createElement("button");
		btn.className = "Bench";
		btn.innerText = "챔피온";
		bench.appendChild(btn);
	}
}

const createChamQueue = () => {
	const queue = document.querySelector("#ChamQueue");
	for (let i = 0; i < 10; i++) {
		let btn = document.createElement("button");
		btn.className = "ChamQueue";
		btn.innerText = "";
		btn.draggable="true";
		btn.addEventListener("dragstart", drag);
		queue.appendChild(btn);
	}
}

const setBenchlist = () => {
	document.querySelectorAll(".Bench").forEach(elem => {
		let randomItem = getRandomItem(arr_cham);
		elem.price = randomItem.price;
		elem.innerText = `${randomItem.name} \n ${randomItem.chamClass} \n ${randomItem.species}`;
		elem.addEventListener("click", purchaseChampion);
	})
}

//리롤 버튼
const reroll = () => {	
	if (gold >= 2){
		gold -= 2;
		setBenchlist();
	}
	else {
		alert("not enough gold!");
	}
	showGold();
}


//경험치 구매
const expUp = () => {	
	if (gold >= 4){
		gold -= 4;
		console.log("clicked!");
  		let EXP = document.getElementById('Exp_Num');
		let exp_num = parseInt(EXP.innerText) + 4;
		console.log(exp_num);
 		EXP.innerText = String(exp_num);
	}
	else{
		alert("not enough gold!");
	}
	showGold();
}

// 골드 변화 표시
const showGold = () => {
	let Gold = document.querySelector("#gold");
	Gold.innerText = gold;
}

//랜덤 챔피언 불러오기
const getRandomItem = (arry) => arry[Math.floor(Math.random() * arry.length)];

// 챔피언 구매 및 버튼 삭제 액션
const purchaseChampion = (event) => {
	//add_bench(event);	
	let btp = event.currentTarget;
	gold -= btp.price;  //여기에 각 챔피언의 가격
	
	let chamQueue = document.getElementsByClassName("ChamQueue");
	
	if(chamQueue[9].innerText != ""){
		alert("not enough bench space!");
		return false;
	}
	for(let i = 0; i < chamQueue.length; i++){		
		if(chamQueue[i].innerText == ""){
			chamQueue[i].innerText = btp.innerText;
			break;
			console.log("break");
		}		
	}
			
	btp.innerText = " ";
	
	showGold();
	upgradeChampion();
}

// 구매할 때 동시에 발생하기에 구매 함수에 넣어버림
// 챔피언 3개 모일 시 업그레이드 액션
// param으로 클래스 이름을 넣어볼까? 어디든 쓰일 수 있는 함수로 - 즉 순수함수?
const upgradeChampion = () => {
	let counts = {};
	let TextArray = [];
	let chamQueue = document.getElementsByClassName("ChamQueue");	

	for (let i = 0; i < chamQueue.length; i++){
		TextArray[i] = chamQueue[i].innerText;		
	}

	// count 구문
	TextArray.forEach(function(x){ counts[x] = (counts[x] || 0) + 1; });
	console.log(counts);
	let asd = Object.keys(counts);
	let isthree = function (value){
		if(value == ""){
			return false;
		}
		return counts[value] == 3;
	}

	// 합성 부분
	if (asd.some(isthree)){
		let ddd = [];
		asd.forEach(function(x){ if(counts[x] == 3){ ddd.push(x); } });
		console.log(ddd[0]);
		
		for(let o = 0; chamQueue.length; o++){
			if( chamQueue[o].innerText == ddd[0] ){
				chamQueue[o].innerText = ddd[0] + "\n" +"Upgraded";
				break;
			}
		}
		setTimeout( function(){
			for(let x = 0; chamQueue.length; x++){
				if (chamQueue[x].innerText == ddd[0]){	
					chamQueue[x].innerText = "";
				}
			}
		}			
		, 100);
		// 적절한 밀리세컨드 설정으로 자연스럽게
		console.log("oh yeah!");
	}
}

// On Working
// 전장으로 내보내는 함수 
const call_of_the_duty = (event) => {
	// 해당 이벤트는 드래그 앤 드롭으로도 구현이 가능해야함
	let asdasd = event.currentTarget;
}

// 시작시 초기화할 것들
const onLoad = () => {
	let user = prompt("please tell your name here");
	document.getElementById("welcome").innerText = user;
	showGold();
	createBench();
	createChamQueue();
	setBenchlist();
	draw();
	// show_Garen();
}


// 드래그 드롭 코드
// https://m.mkexdev.net/58 => 이 페이지 설명으로 이해 완료! 드래그 시 객체에 값을 저장 후 드롭할 때 값을 불러서 해당 태그에 넣어줌
// 이때 해당 엘리먼트의 attr까지 들어가면 안되므로 preventDeafault를 해주는 것 (예시 : 버튼 태그에 아이디나 클래스가 달라질 수 있음)
const allowDrop = (event) => {
	event.preventDefault();
}
const drag = (event) => {
	event.dataTransfer.setData("text", event.target.id);
}

const drop = (event) => {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
	event.target.appendChild(document.getElementById(data));

	// 클래스이름을 다르게 해서 업그레이ㄷ,?
	upgradeChampion();
}



// 여기는 아예 새로 작성하기
// 화면에 그림 생성
var cvs = document.querySelector('canvas');
// let canvas = document.getElementById("field");
const draw = () => {
	let ctx = cvs.getContext("2d");
	let fire = document.getElementById("asdasdd");
	ctx.drawImage(fire, 10, 10);
	// ctx.fillRect(100, 100, 100, 100);
}

