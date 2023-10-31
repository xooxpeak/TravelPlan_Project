<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html>
<html lang="en" data-bs-theme="auto">
<html>
<head>
	<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<title>여담: 일정 만들기</title>
	
	<!-- kakao Map API -->
    <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=${client_id}&libraries=services"></script>

	
	<!-- 부트스트랩 코드 넣기 -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"	integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js" integrity="sha512-uto9mlQzrs59VwILcLiRYeLKPPbS/bT71da/OEBYEwcdNUk8jYIy+D176RYoop1Da+f9mvkYrmj5MCLZWEtQuA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css" integrity="sha512-aOG0c6nPNzGk+5zjwyJaoRUgCdOrfSDhmMID2u4+OIslr0GjpLKo7Xm0Ao3xmpM4T8AmIouRkqwj1nrdVsLKEQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
	
	<!-- 참조  css, js 코드 -->
	<link rel="stylesheet" href="<c:url value='/css/travelForm.css'/>">
	
	<%@ page import="java.util.Date"%>
	<%@ page import="java.text.SimpleDateFormat"%>
	<%
		Date nowTime = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String region = request.getParameter("region");
	%>
	
	<!-- 부트스트랩 script(상단용) -->
	<link rel="canonical" href="https://getbootstrap.kr/docs/5.3/examples/sidebars/">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@3">
	
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
</head>
<body>
<!-- 비행기 아이콘 -->
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
  <symbol id="plain" viewBox="0 0 16 16"> <!-- 비행기 아이콘 -->
    <image class="bi" src="https://cdn-icons-png.flaticon.com/512/7893/7893979.png" style="width: 30; height: 24;"/>
  </symbol>
</svg>
<!-- header - tramvelForm -->
<div class="travel-title">
	<div class="row">
		<div class="div_title col-9">
			<label class="title">여행 제목 : </label>
			<input class="text" name="travelTitle" id="travelTitle">
			<div class="calendar">
				<label class="calendar_sdate">여행 시작일 : </label>
				<input class="input-date" type="date" name="SDate" id="SDate" value="" min="<%= sdf.format(nowTime) %>">
				<p class="wave">~</p>
				<label class="calendar_edate">여행 종료일 : </label>
				<input class="input-date" type="date" id="EDate" value="EDate" min="<%= sdf.format(nowTime) %>">
			</div>
		</div>
		<div class="div_title col-2">
			<jsp:include page="travel/region.jsp" flush="false" />
		</div>
		<div class="div_title col-1">
			<button class="travel-title_submit" onclick="save()">저장</button>
			<button class="travel-title_close" onclick="if(confirm('그만 만드시겠어요?')) history.back(); else alert('닫기 취소')">닫기</button>
		</div>
	</div>
</div>
<!-- header - tramvelForm 끝 -->
	
	
	
<!-- content -->
<div id='wrapper'>
	<main class="d-flex flex-nowrap">
<!-- DAYS box -->
	<div class="d-flex flex-column flex-shrink-0 bg-body-tertiary" style="width: 120px;">
		<div class="plan-daysbox nav nav-pills nav-flush flex-column mb-auto text-center">
			<div class="plan-daysboxtitle">일정</div>
			<!-- 사용자 입력을 받은 만큼 반복문 사용  (days) -->
			<div class="select-job-items1 nav-item">
				<div style="text-align: -webkit-center;">
					<table id="myTable" class="table">
						<thead>
						</thead>
						<tbody id="tbody"></tbody>
					</table>
				</div>
			</div>
	
			<input type="hidden" id="day_hidden" value="0">
	
		</div>
	</div>
<!-- DAYS box 끝 -->

		<div class="b-example-divider b-example-vr"></div>

<!-- 세부 일정 -->
		<div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary" style="width: 280px;">
	
		  <!-- 타이틀 -->
		  <div class="d-flex align-items-center flex-shrink-0 p-4 border-bottom justify-content-center">
		    <span class="fs-5 fw-semibold">세부 일정</span>
		  </div>
		
		  <!-- 세부 일정 : c:foreach 사용하기 -->
		  <div class="list-group list-group-flush border-bottom scrollarea">
		
		    <a href="#" class="list-group-item list-group-item-action py-3 lh-sm" aria-current="true">
		      <div class="d-flex w-100 align-items-center justify-content-between">
		        <strong class="mb-1">List group item heading</strong>
		        <small class="text-body-secondary">Mon</small>
		      </div>
		      <div class="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>
		    </a>
		
		    <a href="#" class="list-group-item list-group-item-action py-3 lh-sm">
		      <div class="d-flex w-100 align-items-center justify-content-between">
		        <strong class="mb-1">List group item heading</strong>
		        <small class="text-body-secondary">Tues</small>
		      </div>
		      <div class="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>
		    </a>
		
		  </div>
		</div>

<!-- 세부 일정 끝 -->
		<div class="b-example-divider b-example-vr"></div>

<!-- 검색 -->
    	<div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary" style="width: 300px;">

	      <!-- 타이틀 -->
	      <div class="d-flex align-items-center flex-shrink-0 p-4 border-bottom justify-content-center">
	        <span class="fs-5 fw-semibold">검색</span>
	      </div>
		  
	      <!-- 검색창-kakao -->
		  <div id="menu_wrap">
		      <div class="d-flex align-items-center flex-shrink-0 p-1 border-bottom justify-content-center row">
		        <div class="row">
		          <button class="col m-1 small btn btn-light">숙박</button>
		          <button class="col m-1 small btn btn-light">음식</button>
		          <button class="col m-1 small btn btn-light">관광</button>
		        </div>
		        <div class="row">
		          <form onsubmit="searchPlaces(); return false;">
			          <input type="text" id="keyword" class="col-7 m-1" value="서울 맛집" style="font-size: small;" placeholder="검색어를 입력하세요.">
			          <button type="submit" id="searchBtn" class="col-3 m-1 btn btn-light border-dark">검색</button>
		          </form>
		        </div>
		      </div>
	      
	      <!-- 검색결과-kakao -->
			  <div>
			  	<div class="list-group list-group-flush border-bottom scrollarea" id="placesList"></div>
		        <div id="pagination"></div>
			  </div>
		  
		  </div>
		  
	    </div>
<!-- 검색 끝 -->
		<div class="b-example-divider b-example-vr"></div>
		
<!-- 지도 -->
	<div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary" style="width: 54%;">
		<!-- 지도API -->
		<div id="map" style="width:100%;height:100%;"></div>
		<script src="js/kakaoMap.js"></script>
    </div>
<!-- 지도 끝 -->


  </main>
</div>
<!-- content 끝 -->

	<!-- 부트스트랩 script (최하단에 위치) -->
	<script	src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>

	<!-- Custom JS -->
	<script src="js/travelForm.js"></script> <!-- DAY? 만들기 -->
</body>
</html>