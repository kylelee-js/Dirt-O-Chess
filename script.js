// 롤토체스 바닐라 자바스크립트 제작기
// 우정잉님의 클립에 영감을 얻기 토이프로젝트오 시작
// 자바스크립트에 대한 공부와 꾸준한 개발을 위해 프로젝트에 임함
// 꼼꼼하게 설계하지 않아 추후에 대규모의 리펙토링이 필요
// 
// 11. 14. 2019 - 리기훈


// 골드와 마나
var gold = 100;
const mana = 100;


// 챔피언 객체 생성 클래스
// template :  { _name : '', _class : '', _species : '', ...}
class Champion
{
	constructor(name, class_, species, price, rank, hp, atk, atk_speed)
	{
		this.name = name;
		this.price = price;
		this.rank = rank;
		this.class_ = class_;
		this.hp = hp;		
		// this.mana-generation = m_g;
		this.species = species;		
		this.atk = atk;
		this.atk_speed = atk_speed; 
	}


	cham_upgrade()
	{
		this.hp = this.hp*3;
		this.atk = this.atk*3;
	}

	get upgrade_resell()
	{
		return this.price*2.5;
	}

	set upgraded_price(price)
	{
		this.price = price*2.5;
	}
}


// 각 챔피언 객체 생성 
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


//리롤 버튼
function reroll()
{	
	if (gold >= 2)
	{
		gold -= 2;

		var a = randomItem(arr_cham);
		var b = randomItem(arr_cham);
		var c = randomItem(arr_cham);
		var d = randomItem(arr_cham);
		var e = randomItem(arr_cham);		

		// 아래 코드 반복문으로 새로 코딩 하기! for(var i in )
		var doc0 = document.getElementsByClassName('buy_cham')[0].innerText = a.name + "\n" + a.class_ + "\n" + a.species;
		var doc1 = document.getElementsByClassName('buy_cham')[1].innerText = b.name + "\n" + b.class_ + "\n" + b.species;
		var doc2 = document.getElementsByClassName('buy_cham')[2].innerText = c.name + "\n" + c.class_ + "\n" + c.species;
		var doc3 = document.getElementsByClassName('buy_cham')[3].innerText = d.name + "\n" + d.class_ + "\n" + d.species;
		var doc4 = document.getElementsByClassName('buy_cham')[4].innerText = e.name + "\n" + e.class_ + "\n" + e.species;
		// 여기에 나중에 각 챔피언의 속성까지 표기
		//   + ' ' + randomItem(cham_list) + ' ' + randomItem(cham_list) + " " + randomItem(cham_list) + ' ' + randomItem(cham_list);

	}
	else
	{
		alert("not enough gold!");
	}
	show_gold();
}


//경험치 구매
function Exp_Up()
{	
	if (gold >= 4)
	{
		gold -= 4;
		console.log("clicked!");
  		var EXP = document.getElementById('Exp_Num');
		var exp_num = parseInt(EXP.innerText) + 4;
		console.log(exp_num);
 		EXP.innerText = String(exp_num);
	}
	else
	{
		alert("not enough gold!");
	}

	show_gold();
}

// 골드 변화 표시
function show_gold()
{
	var Gold = document.getElementById('gold');
	Gold.innerText = gold
	
}

//랜덤 챔피언 불러오기
function randomItem(a)
{
	return a[Math.floor(Math.random() * a.length)];
}

// 챔피언 구매 및 버튼 삭제 액션
function button_pressed(event)
{
	//add_bench(event);	
	var btp = event.currentTarget;
	gold -= 4;  //여기에 각 챔피언의 가격
	
	var bench_chair = document.getElementsByClassName("bench_list");
	
	if(bench_chair[9].innerText != "")
	{
		alert("not enough bench space!");
		return false;
	}
	for(var i = 0; i < bench_chair.length; i++)
	{		
		if(bench_chair[i].innerText == "")
		{
			bench_chair[i].innerText = btp.innerText;
			
			break;
			console.log("asd");
		}		
	}
			
	btp.innerText = " ";
	
	show_gold();
	Upgrade();
	// var bench[] = document.getElementsByClassName("bench_list");  여기에 벤치리스트 생성 큐 생성
}

// 구매할 때 동시에 발생하기에 구매 함수에 넣어버림
// 챔피언 3개 모일 시 업그레이드 액션
// param으로 클래스 이름을 넣어볼까? 어디든 쓰일 수 있는 함수로 - 즉 순수함수?
function Upgrade(){
	var counts = {};
	var TextArray = [];
	var bench_chair = document.getElementsByClassName("bench_list");	

	for (var i = 0; i < bench_chair.length; i++)
	{
		TextArray[i] = bench_chair[i].innerText;		
	}

	// count 구문
	TextArray.forEach(function(x){ counts[x] = (counts[x] || 0) + 1; });
	console.log(counts);
	var asd = Object.keys(counts);
	var isthree = function (value)
	{
		if(value == "")
		{
			return false;
		}
		return counts[value] == 3;
	}

	// 합성 부분
	if (asd.some(isthree))
	{
		var ddd = [];
		asd.forEach(function(x){ if(counts[x] == 3){ ddd.push(x); } });
		console.log(ddd[0]);
		
		for(var o = 0; bench_chair.length; o++)
		{
			if( bench_chair[o].innerText == ddd[0] )
			{
				bench_chair[o].innerText = ddd[0] + "\n" +"Upgraded";
				break;
			}
		}
		setTimeout( function(){
			for(var x = 0; bench_chair.length; x++)
			{
				if (bench_chair[x].innerText == ddd[0])
				{
					
					bench_chair[x].innerText = "";
					
				}
			}
		}			
		, 500);
		// 적절한 밀리세컨드 설정으로 자연스럽게
		
		console.log("oh yeag!");
	}
}

// 전장으로 내보내는 함수
function call_of_the_duty(event){

	// 해당 이벤트는 드래그 앤 드롭으로도 구현이 가능해야함
	var asdasd = event.currentTarget;
	
}

// 시작시 초기화할 것들
function when_load()
{
	var user = prompt("please tell your name here");
	document.getElementById("welcome").innerText = user;
	show_gold();
	reroll();

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
	Upgrade();
}



// 화면에 그림 생성
var cvs = document.querySelector('canvas');
// var canvas = document.getElementById("field");
function draw()
{
	var ctx = cvs.getContext("2d");
	var fire = document.getElementById("asdasdd");
	ctx.drawImage(fire, 10, 10);
	// ctx.fillRect(100, 100, 100, 100);
}

