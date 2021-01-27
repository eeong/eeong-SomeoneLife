/*********** GLOBAL ************/
var subNow = 0;
var subLast = 3;
var ctgrPrds = []; //ctgr-wrapper

/*********** FUNCTION ************/
function columnMaker(data){
	var html ='';
	html += '		<div class="subs">';
	for(var i in data) {
		html += '			<div class="sub">';
		html += '				<div class="title">'+data[i].title+'</div>';
		for(var j in data[i].subs) {
			html += '			<div class="name por">'+data[i].subs[j].title;
			if(data[i].subs[j].icon != ''){
				html += '<div class="icon '+data[i].subs[j].color+'">'+data[i].subs[j].icon;
				html += '<i class="fas fa-caret-right"></i>';
				html += '</div>';
			}
			html +='</div>';
		}
		html += '			</div>';
	}
	html += '		</div>';
	return html;
}

function subAni() {
	$(".sub-slide.type1 .wrap").stop().animate({"left": -100 * subNow +"%"}, 500, function(){
		if(subNow == subLast) {
			subNow = 0;
			$(".sub-slide.type1 .wrap").css("left", 0);
		}
	});
}



/*********** CALLBACK ************/
function onEnter() {
	$(this).find(".sub-wrap").css("display", "flex");
}
function onLeave() {
	$(this).find(".sub-wrap").css("display", "none");
}
function onColorClick() {
	$(this).addClass("active").siblings().removeClass("active");
	var $imgCase = $(this).parent().prev().find(".img-case");
	$imgCase.stop().fadeOut(100);
	$imgCase.eq($(this).index()).stop().delay(100).fadeIn(100);
}


function onSubPrevClick() {
	if(subNow == 0) {
		subNow = subLast - 1;
		$(".sub-slide.type1 .wrap").css("left", -subLast * 100 +"%");
	}
	else subNow--;
	subAni();
}
function onSubNextClick() {
	if(subNow < subLast) subNow++;
	subAni();
}



/** Main Navi 생성 **********************/

function onNaviLoad(r) {
	var html = '';
	for(var i in r.navs) {
		html  = '<div class="navi '+r.navs[i].class+'">';
		html += '<div class="title">'+r.navs[i].title+' <i class="fa fa-angle-down"></i>';
		if(r.navs[i].icon != '') {
			html += '<div class="icon '+r.navs[i].color+'">'+r.navs[i].icon;
			html += '<i class="fas fa-caret-right"></i>';
			html += '</div>';
		} 
		html += '</div>';
		html += '<div class="sub-wrap">';
		if(r.navs[i].class.indexOf("IMAGE") > -1) {
			for(var j in r.navs[i].subs) {
				html += '<div class="sub">';
				html += '<div class="title">'+r.navs[i].subs[j].title+'</div>';
				html += '<div class="cont-img"><img src="'+r.navs[i].subs[j].src+'" class="w-100"></div>';
				html += '</div>';
			}
		}
		else if(r.navs[i].class.indexOf("WIDE") > -1) {
			html += '<div class="wrapper">';
			html += '	<div class="lt">';
			html += columnMaker(r.navs[i].subs);
			html += '		<div class="infos">';
			for(var j in r.navs[i].infos) {
				html += '<div class="info">';
				html += '	<div class="title">';
				html += '		<i class="'+r.navs[i].infos[j].icon+'"></i> ';
				html += 		r.navs[i].infos[j].title;
				html += '	</div>';
				html += '	<div class="content">'+r.navs[i].infos[j].content+'</div>';
				html += '</div>';
			}
			html += '		</div>'; 
			html += '	</div>';	// .lt
			html += '	<div class="rt">';
			html += '		<div class="sub-slide type1">';
			html += '			<div class="stage">';
			html += '				<div class="wrap">';
			r.navs[i].slides.push(r.navs[i].slides[0]);
			for(var j in r.navs[i].slides) {
				html += '<div class="slide">';
				html += '	<div class="img-wrap">';
				for(var k in r.navs[i].slides[j].cases){
					html += '		<div class="img-case '+(k==0 ? "active" : "")+'">';
					for(var l in r.navs[i].slides[j].cases[k].img){
						html += '<img src="'+r.navs[i].slides[j].cases[k].img[l]+'" class="w-100">';
					}
					html += '		</div>';
				}
				html += '<div class="bt bt-quick">';
				html += '<i class="fa fa-shopping-cart"></i> QUICK SHOP';
				html += '</div>';
				html += '		<div class="bt bt-icon bt-heart">';
				html += '			<div class="popper">';
				html += '				Login to use Wishlist <i class="fa fa-caret-right"></i>';
				html += '			</div>';
				html += '			<i class="far fa-heart"></i>';
				html += '		</div>';
				html += '		<div class="bt bt-icon bt-sync">';
				html += '			<div class="popper">';
				html += '				Compare <i class="fa fa-caret-right"></i>';
				html += '			</div>';
				html += '			<i class="fa fa-sync"></i>';
				html += '		</div>';
				html += '		<div class="bt bt-icon bt-search">';
				html += '			<div class="popper">';
				html += '				Quick View <i class="fa fa-caret-right"></i>';
				html += '			</div>';
				html += '			<i class="fa fa-search-plus"></i>';
				html += '		</div>';
				html += '	</div>';
				
				html += '	<div class="color">';
				for(var k in r.navs[i].slides[j].cases){
					html += '		<span class="'+r.navs[i].slides[j].cases[k].color+'" style="color:'+r.navs[i].slides[j].cases[k].color+'">●</span>';
				}
				html += '	</div>';
				html += '	<div class="title">'+r.navs[i].slides[j].title+'</div>';
				html += '	<div class="brand">'+r.navs[i].slides[j].brand+'</div>';
				html += '	<div class="price">';
				if(r.navs[i].slides[j].price !== ""){
					html += r.navs[i].slides[j].price;
				} else{
					html += ' <span class="price-def">'+r.navs[i].slides[j].priceDef+'</span> '
					html += ' <span class="price-sale">'+r.navs[i].slides[j].priceSale+'</span> '
				}
				html += '</div>';	
				html += '</div>';	// .slide
			}
			html += '				</div>'; // .wrap
			html += '				<div class="bt-pager bt-prev">〈</div>';
			html += '				<div class="bt-pager bt-next">〉</div>';
			html += '			</div>';
			html += '		</div>';	// .sub-slide
			html += '	</div>';	// .rt
			html += '<div>';

		}
		else if(r.navs[i].class.indexOf("COL") > -1 ){
			
			html += columnMaker(r.navs[i].subs);
		}
		
		html += '</div>';	// .sub-wrap
		html += '</div>'; // .navi
		$(".header-wrapper .navi-wrap").append(html);}
		var slideWid = $(".sub-slide.type1 .slide").length * 100 +"%";
		$(".sub-slide.type1 .wrap").css("width",slideWid);

		for(var i in r.navs){
			html = '<li class="mob-navi">';
			html += '<div class="title">'+r.navs[i].title+'</div>';
			html += '<div class="bt-down">';
			html += '<div class="slash-lt slash"></div>';
			html += '<div class="slash-rt slash"></div>';
			html += '</div>';
			html += '<ul class="mob-sub">';
			html += '<i class="fa fa-caret-up"></i>';
			if(r.navs[i].subs && r.navs[i].subs.length == 1){
				r.navs[i].subs =  r.navs[i].subs[0].subs;
			}
			for(var j in r.navs[i].subs){
				html += '<li class="mob-sub-navi">';
				html += '<div class="title">'+r.navs[i].subs[j].title+'</div>'
			
				if(r.navs[i].subs[j].subs && r.navs[i].subs[j].subs.length > 0){
				html += '<div class="bt-down">';
				html += '<div class="slash-lt slash"></div>';
				html += '<div class="slash-rt slash"></div>';
				html += '</div>';
				html += '<ul class="mob-sub-sub mob-sub">';
				for(var k in r.navs[i].subs[j].subs){
					html += '<li> '+r.navs[i].subs[j].subs[k].title+' </li>';
					}
				html += '</ul>';
				}
				html += '</li>';
			}
			html += '</ul>';
			html += '</li>';
			$(".mob-navi-wrap").append(html);
		}

		$(".header-wrapper .navi-wrap > .navi").mouseenter(onEnter);
		$(".header-wrapper .navi-wrap > .navi").mouseleave(onLeave);
		$(".sub-slide.type1 .color").find("span").click(onColorClick);
		$(".sub-slide.type1 .wrap").swipe({
		swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
			if(direction == 'left') $(".sub-slide.type1 .bt-next").trigger("click");
			if(direction == 'right') $(".sub-slide.type1 .bt-prev").trigger("click");
		},
		threshold: 30
	});

	$(".mob-wrapper").on("scroll touchmove mousewheel", onMobScroll);
	$(".mob-wrap").on("scroll touchmove mousewheel", onMobWrapScroll);
	$(".navi-mob-icon").on("click", onMobClick);
	$(".mob-wrapper").on("click", onMobClose);
	$(".mob-wrap").on("click", onMobWrapClick);
	$(".mob-navi .bt-down").on("click", onMobNaviClick);

	$(".sub-slide.type1 .bt-prev").on("click",onSubPrevClick);
	$(".sub-slide.type1 .bt-next").on("click",onSubNextClick);
} /* onNavi -end-  */

function onCtgrLoad(r){
	var html ='';
	for (var i in r.ctgrs){
		html += '<div class="ctgr">'+r.ctgrs[i].title;
		if (r.ctgrs[i].arrow == true) html += '<i class="fa fa-angle-right"></i>';
		html += '</div>';
	}
	$(".banner-wrapper .ctgr-wrap").append(html);
}

var bannerNow = 0;
var $banners = [];

function onBannerLoad(r){
	var html = '';
	for (var i in r.banners){
		html = '<div class="slide" style="background-image : url('+r.banners[i].src+')">';
		html += '<h3 class="desc">'+r.banners[i].desc+'</h3>';
		html += '<h2 class="title">'+r.banners[i].title+'</h2>';
		html += '<h4 class="price"> Recently <span>'+'</span> </h4>';
		html += '<button class="bt-banner">Check LookBook</button>';
		html += '</div>';
		$banners.push($(html).appendTo(".banner-wrapper .slide-wrap"));
	}
	bannerLast = $(".banner-wrapper .slide-wrap").length - 1;
	$(".banner-wrapper .slide-wrap").swipe({
		triggerOnTouchEnd: true,
		swipeStatus : swipeStatus
	});
	$(".banner-wrapper .bt-prev").on("click",onBannerPrev);
	$(".banner-wrapper .bt-next").on("click",onBannerNext);
}

function onPrdLoad(r){
	var html = '';
	for(var i in r.prds){
		html = '<div class="slide swiper-slide">';
		html += '<div class="img-wrap">';
		html += '<div class="img-case active">';
		html += '<img src='+r.prds[i].src[0]+' class="w-100"><img src='+r.prds[i].src[1]+' class="w-100"> </div>';
		html += '<div class="bt bt-icon bt-heart">';
		html += '<div class="popper"> Login to use Wishlist <i class="fa fa-caret-right"></i> </div>';
		html += '<i class="far fa-heart"></i></div>';
		html += '<div class="bt bt-icon bt-sync">	<div class="popper"> Compare <i class="fa fa-caret-right"></i> </div> <i class="fa fa-sync"></i></div>';
		html += '<div class="bt bt-icon bt-search"><div class="popper"> Quick View <i class="fa fa-caret-right"></i> </div> <i class="fa fa-search-plus"></i></div></div>';
		html += '<div class="title">'+r.prds[i].title+'</div>';
		html += '<div class="brand">'+r.prds[i].code+'</div>';
		html += '<div class="price-wrap">';
		html += '<div class="price">KRW'+r.prds[i].price+'</div>';
		html += '<div class="cart">';
		html += '<i class="fa fa-shopping-cart"></i>Add To Cart</div> ';
		html += '</div>';
		html += '</div>';
		$(".sub-slide.type2 .swiper-wrapper").append(html);
	}
	
	function getCount(){
		var wid =$(window).outerWidth();
		var count = 4;
		if(wid > 767 && wid <= 991){
			count = 3;
		}
		else if(wid > 575 && wid <= 767){
			count = 2;
		}
		else if(wid <= 575){
			count = 1;
		}
		return count;
	}

	 		var swiper = new Swiper('.sub-slide.type2 .swiper-container', {
			slidesPerView: getCount(),
			spaceBetween: 0,
			slidesPerGroup: getCount(),
			loop: true,
			loopFillGroupWithBlank: false,
			/* pagination: {
				el: '.swiper-pagination',
				clickable: true,
			}, */
			navigation: {
				nextEl: '.bt-next',
				prevEl: '.bt-prev',
			},
		});

		swiper.on("resize",function(){
		this.params.slidesPerGroup = getCount();
		this.params.slidesPerView = getCount();
	});
}


function onPrdCtgrLoad(r){
	var html ='';
	for(var i in r.ctgrs){
		html = '<div class="cate '+r.ctgrs[i].class+'">';
		html += '<div class="cont">';
		html += '<div class="designer">DESIGNERS: <span>'+r.ctgrs[i].designer+'</span></div>';
		html += '<h2 class="title">'+r.ctgrs[i].title+'</h2>';
		html += '<div class="price">KRW '+r.ctgrs[i].price+'</div>';
		html += '<div class="desc">'+r.ctgrs[i].content+'</div>';
		html += '<button class="bt-read">READ MORE</button> </div>';
		html += '<div class="image"><img src="'+r.ctgrs[i].src[0]+'" alt="cate" class="w-100"></div>';
		html += '<div class="image"><img src="'+r.ctgrs[i].src[1]+'" alt="cate" class="w-100"></div>';
		html += '</div>';
		ctgrPrds.push($(html));
	}
	$(".ctgr-wrapper .navi").on("click", onCateNaviClick);
	$(".ctgr-wrapper .navi").eq(0).trigger("click");
}

function onBranchLoad(r){
	var html = '';
	for(var i in r.branches){
		html = '<li class="branch">';
		html += '<img src="'+r.branches[i].src+'" alt="'+r.branches[i].title+'" class="w-100">';
		html += '<button class="bt-link">'+r.branches[i].title+'</button>';
		html += '</li>';
		$(".branch-wrapper .branch-wrap").append(html);
	}
}

function onBlogLoad(r){
	var html = '';
	for(var i in r.blogs){
		html = '<div class="blog slide swiper-slide"> ';
		html += '<div class="img-wrap"> ';
		html += '			<img src="'+r.blogs[i].src+'" alt="blog" class="w-100"> ';
		html += '			<div class="date-wrap"> ';
		html += '<div class="date">'+r.blogs[i].date+'</div> ';
		html += '				<div class="month">'+r.blogs[i].mon+'</div> ';
		html += '			</div> ';
		html += '			<div class="tag">'+r.blogs[i].tag+'</div> ';
		html += '		</div> ';
		html += '<div class="title">'+r.blogs[i].title+'</div> ';
		html += '		<button class="bt-comment">Leave a comment</button> ';
		html += '		<div class="desc">'+r.blogs[i].desc+'</div> ';
		html += '		<button class="bt-read">Read More</button> ';
		html += '	</div>	 ';
		$(".blog-wrapper .blog-wrap").append(html);
	}
	function getCount2(){
		var wid =$(window).outerWidth();
		var count = 3;
		if(wid > 767 && wid <= 991){
			count = 2;
		}
		else if(wid <= 767){
			count = 1;
		}
		return count;
	}
		
	var swiper = new Swiper('.sub-slide.type3 .swiper-container', {
		slidesPerView: getCount2(),
		spaceBetween: 0,
		slidesPerGroup: getCount2(),
		loop: true,
		loopFillGroupWithBlank: false,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.bt-next',
			prevEl: '.bt-prev',
		},
	});
 swiper.on("resize",function(){
		this.params.slidesPerGroup = getCount2();
		this.params.slidesPerView = getCount2();
	});
}

function onCateNaviClick(e){
	$(this).addClass("active");
	$(this).siblings().removeClass("active");
	var id = $(this).index();
	cateAni(id);
}

function cateAni(id){
	$(".ctgr-wrapper .cate").css({"opacity":0,"transform":"translateY(100px)"});
	var slide = $(ctgrPrds[id].clone()).appendTo(".ctgr-wrapper .cate-wrap").css({"opacity":0,"transform":"translateY(100px)","position":"absolute"});
	slide.css("opacity");
	slide.css("transform");
	slide.css({"opacity":1, "transform":"translateY(0)"});
	setTimeout(function(){
		$(".ctgr-wrapper .cate").remove();
		$(ctgrPrds[id].clone()).appendTo(".ctgr-wrapper .cate-wrap");
	},500);
}

function getBannerWidth(){
	return $(".banner-wrapper .slide").eq(0).outerWidth();
}

function getBannerLast(){
	return $(".banner-wrapper .slide").length-1;
}

function swipeStatus(event, phase, direction, distance) {
	if (phase == "move" && (direction == "left" || direction == "right")) {
			scrollImages((getBannerWidth() * bannerNow) + (direction == "left" ? distance : - distance), 0);
	} else if (phase == "cancel") {
			scrollImages(getBannerWidth() * bannerNow, 500);
	} else if (phase == "end") {
			if (direction == "right") {
					previousImage();
			} else if (direction == "left") {
					nextImage();
			}
	}
}
function previousImage() {
	bannerNow = Math.max(bannerNow - 1, 0);
	scrollImages(getBannerWidth() * bannerNow, 500);
}

function nextImage() {
	bannerNow = Math.min(bannerNow + 1, getBannerLast());
	scrollImages(getBannerWidth() * bannerNow, 500);
}

function scrollImages(distance, duration) {
	var value = (distance < 0 ? "" : "-") + Math.abs(distance).toString();
	$(".banner-wrapper .slide").css("transition-duration", (duration / 1000).toFixed(1) + "s");
	$(".banner-wrapper .slide").css("transform", "translate(" + value + "px,0)");
}

function onBannerPrev(){
	bannerNow = bannerNow == 0 ? getBannerLast() : bannerNow - 1;
	bannerAni()
}

function onBannerNext(){
	bannerNow = bannerNow == getBannerLast() ? 0 : bannerNow + 1;
	bannerAni()
	
}

function bannerAni(){
	var $slide = $($banners[bannerNow]).clone().appendTo(".banner-wrapper .slide-stage").addClass("active");
	$slide.stop().animate({"opacity":1},500,function(){scrollImages(getBannerWidth() * bannerNow, 0);
	$(this).remove();
	});
	}

function onResize(e){
	var winWid = $(this).outerWidth();
	if(winWid > 991 && $(".mob-wrapper").css("display") == 'block') {$(".mob-wrapper").trigger("click");
	}
	scrollImages(getBannerWidth()*bannerNow,0);
}

function onScroll(e){
	var scTop = $(this).scrollTop();
	if(scTop > 180){
		$(".header-wrapper").css({"position":"fixed","transform":
		"translateY(-10px)","top":"10px","box-shadow":"0 0 4px rgba(0,0,0,0.2)"});
		$(".top-wrapper").css("display","none");
		$(".search-wrapper").css("display","none");
		$(".title-wrapper .navi.WIDE .sub-wrap ").css({"top":"85px"});
	} else {
		$(".header-wrapper").css({"position":"relative","top":0,"box-shadow":"none","transform":
		"translateY(0)"});
		$(".top-wrapper").css("display","block");
		$(".search-wrapper").css("display","flex");
		$(".title-wrapper .navi.WIDE .sub-wrap ").css({"top":"85px"});
	}
}

function onMobScroll(e){
	e.preventDefault();
	e.stopPropagation();
	$("body, html").css({"overflow":"hidden","height":"100%"});
}

function onMobWrapScroll(e){
	e.stopPropagation();
	var winHei =$(window).outerHeight();
	var meHei =$(this).find(".mo-navi-wrap").outerHeight();
	if (meHei <= winHei) e.preventDefault();
}


function onMobClick(e){
	$(".mob-wrapper").css({"display":"block"});
	$(".mob-wrapper").css("background-color");
	$(".mob-wrapper").css({"background-color":"rgba(0,0,0,0.6)"});
	$(".mob-wrap").css({"left":0});
}

function onMobClose(e){
	$(".mob-wrapper").css({"background-color":"rgba(0,0,0,0)"});
	$(".mob-wrapper").delay(500).hide(0);
	$(".mob-wrap").css("left","-270px");
	e.stopPropagation();
}
function onMobWrapClick(e){
	e.stopPropagation();
}


function onMobNaviClick(){
	$(this).toggleClass("active").siblings(".mob-sub").stop().slideToggle(300);
	
	}

function cateEnter(){
	$(".ctgr-wrap").slideDown(300);
	
}
function cateLeave(){
	$(".ctgr-wrap").slideUp(300);
}
$(".browse-wrap").mouseenter(cateEnter);
$(".ctgr-wrap").mouseleave(cateLeave);
	

	$.get('../json/navi.json', onNaviLoad);
	$.get('../json/ctgr.json', onCtgrLoad);
	$.get('../json/banner.json', onBannerLoad);
	$.get('../json/prd.json', onPrdLoad);
	$.get('../json/prd-ctgr.json', onPrdCtgrLoad);
	$.get('../json/branch.json', onBranchLoad);
	$.get('../json/blog.json', onBlogLoad);
	$(window).on("scroll",onScroll);
	$(window).on("resize",onResize);

		emailjs.init("user_OQNTTJmx8nuO6apvJPh5b");
		
		function mailSend(x){
			x.contact_number.value = Math.random() * 100000 | 0;
			emailjs.sendForm('service_fur1cuq', 'template_a5s4ize', x);
			return false;
		}
	
		
	
	  