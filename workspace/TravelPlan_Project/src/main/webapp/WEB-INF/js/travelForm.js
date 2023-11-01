$.datepicker.setDefaults({
	dateFormat : 'yy-mm-dd',
	prevText : '이전 달',
	nextText : '다음 달',
	monthNames : [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월',
			'11월', '12월' ],
	monthNamesShort : [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월',
			'10월', '11월', '12월' ],
	dayNames : [ '일', '월', '화', '수', '목', '금', '토' ],
	dayNamesShort : [ '일', '월', '화', '수', '목', '금', '토' ],
	dayNamesMin : [ '일', '월', '화', '수', '목', '금', '토' ],
	showMonthAfterYear : true,
	yearSuffix : '년'
});

$(function() {

	//$("#regDate1").datepicker({minDate: 0});
	//$("#regDate2").datepicker({minDate: 0});

});

function call() {
	//			alert("call", document.getElementById("SDate").value);
	var sdd = document.getElementById("SDate").value;
	var edd = document.getElementById("EDate").value;
	console.log("sdd:", sdd);
	console.log("edd:", edd);
	var ar1 = sdd.split('-');
	var ar2 = edd.split('-');
	var da1 = new Date(ar1[0], ar1[1], ar1[2]);
	var da2 = new Date(ar2[0], ar2[1], ar2[2]);
	var dif = da2 - da1;
	var cDay = 24 * 60 * 60 * 1000;
	var days = parseInt(dif / cDay);
//	alert("days:" + days);
	//	if(sdd && edd){
	//		document.getElementById('days').value = days;  
	//	}
	if (days <= 0) {
		alert("여행 종료일이 시작일보다 이전입니다."), location.reload();
	}
}//end call

// ------------------------- 저장버튼 ------------------------- //
function save() {
	// 아이디(타이틀)이 공백이라면 오류 출력
	if($('#travelTitle').val()==''){
		alert("여행 제목을 채워주세요 :)");
		$('#travelTitle').focus();
	}
	if($('#SDate').val() == '') {
		alert("여행 시작일을 입력해주세요.");
		$('#SDate').focus();
	}
	if($('#EDate').val() == '') {
		alert("여행  종료일을 입력해주세요.");
		$('#EDate').focus();
	}
	else{
		// 저장버튼 -> 상세일정 데이터 넘어감
		list = [];
		for(var i=0; i<$('.scheduleList').children().length; i++) {
//			console.log($('.currentBtn_hidden').eq(i).val());
//			console.log($('.stitle').eq(i).text());
//			console.log($('.time_text').eq(i).val());
//			console.log($('.saddr1').eq(i).text());
			list.push({"day_num":$('.currentBtn_hidden').eq(i).val().substr(6,1),
					   "item":$('.stitle').eq(i).text(),
					   "time_text":$('.time_text').eq(i).val(),
					   "item_add":$('.saddr1').eq(i).text()})
		}
		console.log(JSON.stringify(list));
		
		$.ajax({
	        // 요청코드
	        type:"get",
	        url:"saveScheduleData",
	        data:{
	        	scheduleList:JSON.stringify(list)
	        },

	        // 응답코드
	        success:function(data, satatus, xhr) { 
	        	console.log("성공");
	        },
	        error:function(xhr, status, error) {
	            console.log("에러발생");
	        }
	    });
//        $('#savePlan').submit();
	}
	
	
	
	
}
// -------------------------------------------------------- //

// 일 수 만큼 버튼 생성
function rowAdd() {
	trCnt = $('#myTable tr').length + 1;
	if (trCnt < 10) {
		////////////////////////////////////////////////////////////////////
		var innerHtml = '<tr><td style="text-align:center;">';
		innerHtml += '<button class="bttn list-bttn" id="daybtn' + trCnt + '" ';
		innerHtml += 'value="daybtn'
				+ trCnt
//				+ '"  onclick="javascript: writeDay(value); addPlan(value); day_filter(value);">DAY'
				+ '"  onclick="javascript: day_filter(value);">DAY'
				+ trCnt + '</button></td></tr>';
		console.log("innerHtml>>>>>>>>>>>", innerHtml);
		////////////////////////////////////////////////////////////////////
		$('#myTable > tbody:last').append(innerHtml);
	} else {
		alert("최대 9일까지만 생성 가능합니다.");
		return false;
	}
}//end rowAdd


/*//////////////////////// 보류 ///////////////////////////
function addPlan(value) {
	//		     	console.log(value);
	document.getElementById("day_hidden").value = value;

	let ex = document.getElementById('li1');
	let ex1 = document.getElementById('text');
	let memo = document.getElementsByClassName('memo');

	if (ex == null) {
		return false;
	}
	console.log(ex);
	console.log(ex.innerText); // li 태그 안 관광지 이름 받아오기

	let t = document.getElementById('memo1');

	console.log(t.value);
}//end addPlan
///////////////////////////////////////////////////////*/


// 일 수 계산해서 day 생성
var SDate;
var EDate;
var curTime = 24 * 60 * 60 * 1000;
var diff;
var day;
$("#SDate").on("change", function() {
//  		alert("hello1");
	var currentSDate = $(this).val();
	if (currentSDate == SDate) {
		return;
	}
	SDate = new Date(currentSDate);

	diff = EDate - SDate;
	day = (parseInt(diff / curTime));
	for (var i = 1; i <= day; i++) {
		rowAdd();
	}

});

$("#EDate").on("change", function() {
	// 				alert("hello2");
	var currentEDate = $(this).val();
	if (currentEDate == EDate) {
		return;
	}
	EDate = new Date(currentEDate);

	diff = EDate - SDate;
	day = (parseInt(diff / curTime))+1;
	for (var i = 1; i <= day; i++) {
		rowAdd();
	}
	call(); // call 호출해야 동작됨.
});

/*///////////////// schedule.js에서 구현 ///////////////////
function day_filter(value) { 
	var value, target, item, i;

	value = value;
	item = document.getElementsByClassName("li");

	//	 		console.log(value);
	//	 		console.log(item);

	for (i = 0; i < item.length; i++) {
		target = item[i].value;
		console.log(item[i]);
		console.log(target);

		if (target == value) {
			item[i].style.display = "block";
		} else {
			item[i].style.display = "none";
		}

	}

}
///////////////////////////////////////////////////////*/

// 날짜 초기화
function dayDelete() {
	var trCnt = $('#myTable tr').length;
	if (trCnt > 0) {
		$('#myTable > tbody:last > tr ').remove();
	} else {
		return false;
	}
}

// 숙박 버튼
function hotelBtnclick() {
	var query = window.location.search;
	var param = new URLSearchParams(query);
	var region = param.get('region'); // 파라미터값
	
	$.ajax({
        // 요청코드
        type:"get", // hotelBtn으로 doget방식으로 url넘겨줌
        url:"searchBtn", // 버튼 눌렀을 때 이동할 곳 정하기
        data:{ // hotelBtn 으로 넘겨줄 값
        	region:region,
        	contentTypeid:32
        },

        // 응답코드
        success:function(data, satatus, xhr) { 
        	displayPlaces_btn(data)
        },
        error:function(xhr, status, error) {
            console.log("에러발생");
        }
    });
}

// 음식 버튼
function foodBtnclick() {
	var query = window.location.search;
	var param = new URLSearchParams(query);
	var region = param.get('region'); // 파라미터값
	
	$.ajax({
		// 요청코드
		type:"get", // hotelBtn으로 doget방식으로 url넘겨줌
		url:"searchBtn", // 버튼 눌렀을 때 이동할 곳 정하기
		data:{ // hotelBtn 으로 넘겨줄 값
			region:region,
			contentTypeid:39
		},
		
		// 응답코드
		success:function(data, satatus, xhr) { 
			displayPlaces_btn(data)
		},
		error:function(xhr, status, error) {
			console.log("에러발생");
		}
	});
}

// 관광 버튼
function sightseeingBtnclick() {
	var query = window.location.search;
	var param = new URLSearchParams(query);
	var region = param.get('region'); // 파라미터값
	
	$.ajax({
		// 요청코드
		type:"get", // hotelBtn으로 doget방식으로 url넘겨줌
		url:"searchBtn2", // 버튼 눌렀을 때 이동할 곳 정하기
		data:{ // hotelBtn 으로 넘겨줄 값
			region:region,
			contentTypeid1:12,
			contentTypeid2:14,
			contentTypeid3:15,
			contentTypeid4:28,
			contentTypeid5:38,
		},
		
		// 응답코드
		success:function(data, satatus, xhr) { 
			displayPlaces_btn(data)
		},
		error:function(xhr, status, error) {
			console.log("에러발생");
		}
	});
}

//검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces_btn(value, pagination) {

    var listEl = document.getElementById('placesList'), 
    menuEl = document.getElementById('menu_wrap'),
    fragment = document.createDocumentFragment(), 
    bounds = new kakao.maps.LatLngBounds(), 
    listStr = '';
    
    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();
    
    for ( var i=0; i<value.length; i++ ) {

        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(value[i].mapy, value[i].mapx),
            marker = addMarker(placePosition, i), 
            itemEl = getSearchList(i, value[i]); // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        (function(marker, title) {
            kakao.maps.event.addListener(marker, 'mouseover', function() {
                displayInfowindow(marker, title);
            });

            kakao.maps.event.addListener(marker, 'mouseout', function() {
                infowindow.close();
            });

            itemEl.onmouseover =  function () {
                displayInfowindow(marker, title);
            };

            itemEl.onmouseout =  function () {
                infowindow.close();
            };
        })(marker, value[i].title);

        fragment.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
}

// 검색결과 항목을 Element로 반환하는 함수입니다
function getSearchList(index, value) {
	var el = document.createElement('div'),
    itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                '<div class="info">' +
                '  <div class="d-flex w-100 align-items-center justify-content-between">' + 
                '    <strong class="mb-1" id="place_name' + (index+1) + '">' + value.title + '</strong>' +
                '  </div>' +
        		'    <div class="col-10 mb-1 small" id="address_name' + (index+1) + '">' + value.addr1 + '</div>' +
//                '  <div class="tel col-10 mb-1 small">' + places.phone  + '</div>' +
                '<button class="addBtn btn btn-primary" data-idx="' + (index+1) + '" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">추가</button></div>';

    el.innerHTML = itemStr;
    el.className = 'item list-group-item py-3 lh-sm';

    return el;
}
