"use strict";
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

export default button_pressed;