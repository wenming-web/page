function goPage(pageSize, allList, pagingID) {//（每页显示条目,总条目,分页位置）
	
	var total = allList.length; //总数据长度
	var allPage = 0; //总页数(可分多少页)

	allPage = Math.ceil(parseInt(total / pageSize)); // 总共分几页

	var currentPage = 1; //当前页数

	vary(currentPage, pageSize, total, allList);

	var reduceStr = "";
	var tempStr = ""; //添加分页跳转按钮
	var addStr = "";

	if (currentPage > 1) { //分页减少按钮
		reduceStr += "<input type='button' id='homePage' value='首页'/><input type='button' id='lastPage' value='上一页'/>"
	} else {
		reduceStr += "<input type='button' id='homePage' value='首页'/><input type='button' id='lastPage' value='上一页'/>";
	}

	tempStr+="<div class='pageIndex'>";
	for (var pageIndex = 1; pageIndex < allPage + 1; pageIndex++) {
		tempStr += "<span>" + pageIndex + "</span>"; //分页页面按钮
	}
	tempStr+="</div>";

	if (currentPage < allPage) { //分页增加按钮
		addStr += "<input type='text' id='jump'/><input type='button' id='btn' value='确认'/><input type='button' id='nextPage' value='下一页'/><input type='button' id='tailPage' value='尾页'/>";
	} else {
		addStr += "<input type='text' id='jump'/><input type='button' id='btn' value='确认'/><input type='button' id='nextPage' value='下一页'/><input type='button' id='tailPage' value='尾页'/>";
	}

	pagingID.innerHTML = reduceStr + tempStr + addStr; //将分页按钮插入页面指定位置

	var pageIndex = document.querySelector(".pageIndex");
	pageIndex.style.cssText = "display: inline-block";
	//给当前页按钮添加点击样式
	var spans = pageIndex.getElementsByTagName("span");
	spans[0].className = "on";

	// 点击切换到点击页面
	for (var m = 0; m < spans.length; m++) {
		spans[m].addEventListener("click", function () {
			currentPage = parseInt(this.innerHTML);
			clickBtn(spans,currentPage);
			vary(currentPage, pageSize, total, allList);
		})
	}

	var switchBtn = pagingID.getElementsByTagName("input");
	//回到首页
	var homePage = document.getElementById("homePage");
	homePage.addEventListener("click",function(){
		currentPage = 1;
		clickBtn(spans,currentPage);
		vary(currentPage, pageSize, total, allList);
	})
	//上一页
	var lastPage = document.getElementById("lastPage");
	lastPage.addEventListener("click",function(){
		currentPage--;
		if(currentPage<1){
			currentPage = 1;
		}
		clickBtn(spans,currentPage);
		vary(currentPage, pageSize, total, allList);
	})

	//跳到指定页面
	var jump = document.getElementById("jump");
	var btn = document.getElementById("btn");
	jump.style.cssText = "width:40px;outline:none";
	btn.addEventListener("click",function(){
		if(!isNaN(parseInt(jump.value))){
			currentPage =  parseInt(jump.value);
			clickBtn(spans,currentPage)
			vary(currentPage, pageSize, total, allList);
		} 
	})

	//下一页
	var nextPage = document.getElementById("nextPage");
	nextPage.addEventListener("click",function(){
		currentPage++;
		if(currentPage>allPage){
			currentPage = allPage;
		}
		clickBtn(spans,currentPage);
		vary(currentPage, pageSize, total, allList);
	})

	// 尾页
	var tailPage = document.getElementById("tailPage");
	tailPage.addEventListener("click",function(){
		currentPage = allPage;
		clickBtn(spans,currentPage);
		vary(currentPage, pageSize, total, allList);
	})
}

function clickBtn(spans,currentPage){
	
	for (var x = 0; x < spans.length; x++) {
		spans[x].className = "";
	}
	spans[currentPage-1].className = "on";
}

function vary(currentPage, pageSize, total, allList) {
	var startRow = (currentPage - 1) * pageSize + 1; //每页第一条数据在总条目中对应位置
	var endRow = currentPage * pageSize; //每页最后一条数据在总条目中对应位置
	endRow = (endRow > total) ? total : endRow; //判断每页最后一条数据和总数据长度做对比，大于则为total，小于则为endRow

	for (var n = 1; n < (total + 1); n++) {
		if (n >= startRow && n <= endRow) {
			allList[n - 1].style.display = "block"; //显示当前页面条目
		} else {
			allList[n - 1].style.display = "none"; //隐藏其它页面条目
		}
	}
}
