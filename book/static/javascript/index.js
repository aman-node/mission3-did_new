function updateClock() {
    var now = new Date();
    var dname = now.getDay(),
        month = now.getMonth(),
        dnum = now.getDate(),
        year = now.getFullYear(),
        hours = now.getHours(),
        minutes = now.getMinutes(),
        seconds = now.getSeconds(),
        period = "AM";

    if (hours == 0) {
        hours = 12;
    }
    if (hours > 12) {
        hours = hours - 12;
        period = "PM";
    }

    Number.prototype.pad = function (digits) {
        for (var n = this.toString(); n.length < digits; n = 0 + n);
        return n;
    }

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var ids = ['dayname', 'month', 'daynum', 'year', 'hour', 'minutes', 'seconds', 'period'];
    var values = [week[dname], months[month], dnum, year, hours.pad(2), minutes.pad(2), seconds.pad(2), period];
    for (var i = 0; i < ids.length; i++)
        document.getElementById(ids[i]).firstChild.nodeValue = values[i];
}

function initClock() {
    updateClock();
    window.setInterval(updateClock, 1000);

}

// Add By HC
function moveRight(img, tit, pdate) {
    var img_old = document.getElementById("imgid").src;
    var tit_old = document.getElementById("title_id").innerText;
    var pdate_old = document.getElementById("pubdate_id").innerText;
    if (img_old == img && tit_old == tit && pdate_old == pdate) {return;}   // Detect if the same book is clicked

    // Hide the previous book by Animation
    $('#myimg').animate({ right: $(window).width()+$("#imgid").width()+"px" }, {
        easing: 'swing',
        complete: function () {
            // Animation complete callback
            // fade out Title E.t.c
            $(".slidertext").fadeOut(200, function () {
                // On Hide Change Data and Again Show
                dispData(img, tit, pdate);
                $(".slidertext").fadeIn(200);
            });

        }
    }
    );
}
$(document).ready(function () {
    $("#myimg").css({ 'right': '', 'top': '-30px' });
    $("#myimg").animate({ top: '30px' });
    $(".imgcon").click(function () {
        var img = $(this).attr("src");
        var tit = $(this).data("title");
        var pdate = $(this).data("pubdate");
        moveRight(img, tit, pdate);
    });
    
})



function dispData(img, tit, pdate) {
    const img1 = document.getElementById("imgid").src = img;
    const title = document.getElementById("title_id").innerText = tit;
    const pub_date = document.getElementById("pubdate_id").innerText = pdate;
    document.getElementById("imgid").onload = function () {

        // I have to use this function to make sure the image is loaded before the animation starts
        // Please Comment Below Line and UnComment Abobe if Taking More Time Than Expected
        $("#myimg").css({ 'right': '', 'top': '-30px' });
        $("#myimg").animate({ top: '30px' });
    }
}





indexOfBook = 0;
function refreshBook(){
    indexOfBook++;
    indexOfBook = indexOfBook >= $(".bookCardBody").length ? 0 : indexOfBook;
    $("#booksdiv .bookCardBody:nth-child("+(indexOfBook+1)+") img:nth-child(1)").click()
    $("#booksdiv .bookCardBody:nth-child("+(indexOfBook+1)+") img:nth-child(1)").addClass('hover_img');
    setTimeout(() => {$("#booksdiv .bookCardBody:nth-child("+(indexOfBook+1)+") img:nth-child(1)").removeClass('hover_img');
        
    }, 1000);
    // $(".bookCardBody").hide()

    book = indexOfBook
    start = parseInt(book/6)*6;
    start = (start==-1) ? 0:start;
    end = start+6
    end--;
    if(end+1 > $(".bookCardBody").length){
        start = $(".bookCardBody").length - 6
        end = $(".bookCardBody").length - 1
    }

    
    console.log("Index",indexOfBook,"start",start,"end",end)
    $(".bookCardBody").each(function(i) {
        if(i>= start && i<=end){
            $("#booksdiv .bookCardBody:nth-child("+(i+1)+")").show();
        }
        else{
            $("#booksdiv .bookCardBody:nth-child("+(i+1)+")").hide();
        }
    })
}
book = indexOfBook
start = parseInt(book/6)*6;
start = (start==-1) ? 0:start;
end = start+6
end--;
if(end+1 > $(".bookCardBody").length){
    start = $(".bookCardBody").length - 6
    end = $(".bookCardBody").length - 1
}


console.log("Index",indexOfBook,"start",start,"end",end)
$(".bookCardBody").each(function(i) {
    if(i>= start && i<=end){
        $("#booksdiv .bookCardBody:nth-child("+(i+1)+")").show();
    }
    else{
        $("#booksdiv .bookCardBody:nth-child("+(i+1)+")").hide();
    }
})

setInterval(refreshBook,5000)

// function image(){
//     $(".img_hoover").css({
//         opacity:1
//     })
// }
// setTimeout(image,1000)