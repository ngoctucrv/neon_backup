$('#submitQuote').click(function(){
    var name = $('#name').val();
    var phone = $('#phone').val();
    //var email = $('#email').val();
    var location = $('input[name=doorRadio]:checked', '.main_radio').data('value');
    var size = $('#size_table .active').data('size');
    var content = $('#content').val();

    var font = $('#fontt a.current').data('value');
    var color = $('#colorr p.current').data('value');
    var colorName = $('#colorr p.current').data('cname');
    var colorLink = $('.img-color-current').attr('src');
  var vl = "Name: " + name + "\nPhone: " + phone + "\nLocation: " + location + "\nSize: " + size + "\nContent: " + content + "\nFont: " + font + "\nColor: " + color + "\ncolorName: " + colorName + "\ncolorLink: " + colorLink
  $(".form-mess").html("<input class='contact-form-name contact-style' id='ContactForm1_contact-form-name' name='name' placeholder='Tên của bạn *' size='30' type='text' value=''/><input class='contact-form-email contact-style' id='ContactForm1_contact-form-email' name='email' placeholder='Địa chỉ Email *' size='30' type='text' value=''/><textarea class='contact-form-email-message contact-style' cols='25' id='ContactForm1_contact-form-email-message' name='email-message' rows='5'></textarea>");
  $("#ContactForm1_contact-form-name").val(name)
  $("#ContactForm1_contact-form-email").val(phone + '@sdt.com')
  $("#ContactForm1_contact-form-email-message").val(vl)
  setTimeout(function(){$("#ContactForm1_contact-form-submit").click()}, 500);
});

$('#colorr ul li').click(function(){
    var img = $(this).data('image');
    var url = "https://cdn.jsdelivr.net/gh/minhkhoi2001/2021/ledneon/colors"
    $('.img-color-current').attr("src",url+"/"+img);
})

function getQuote() {
    $("#form-sent-quote").fadeToggle(300);
}

function printErrorMsg(msg) {
    $(".print-error-msg").find("ul").html("");
    $(".print-error-msg").css("display", "block");
    $.each(msg, function (key, value) {
        $(".print-error-msg")
            .find("ul")
            .append("<li>" + value + "</li>");
    });
}

$("#content").bind("input propertychange", function () {
    $(".neon .shadow").html(
        $(this)
            .val()
            .replace(/\r\n|\r|\n/g, "<br />")
    );
});

$(".custom-radio").click(function () {
    $(".custom-radio").removeClass("selected");
    $(this).addClass("selected");
    $(this).find("input").prop("checked", true);
    totalDesign();
});

$(".size-box").click(function () {
    $(".size-box").removeClass("active");
    $(this).addClass("active");
    totalDesign();
});

function totalDesign() {
    // total price
    var size = $("#size_table .active").data("size");
    var total = 0;
    var sizePrice = $("#size_table .active").data("price");
    var locationPrice = $("#locationGr .selected").data("price");
    total = parseInt(sizePrice) + parseInt(locationPrice);
    $("#totalPrice").val(total);

    if (size == "xx") {
        $(".total_sel_price").text("LiĂªn há»‡");
    } else {
        var totalf = formatMoney(total);
        $(".total_sel_price").html('~<span class="total-price-design">' + totalf + "</span><sup>Ä‘</sup>");
    }
}

function formatMoney(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

$(document).ready(function () {
    totalDesign();
    //bg
    var coverflow = $("#coverflow").flipster();
    var src_bg_f  = $(".flipster__item--current").data("src");

    if (src_bg_f) {
        $("#lenon-slide").css("background-image", "url('" + src_bg_f + "')");
    }

    $("#lenon-slide #coverflow li").click(function () {
        var src_bg = $(this).data("src");
        $("#lenon-slide").css("background-image", "url('" + src_bg + "')");
    });
    $("#lenon-slide #coverflow li").on("touchstart", function () {
        var src_bg = $(this).data("src");
        $("#lenon-slide").css("background-image", "url('" + src_bg + "')");
    });

    $("#move-neon").draggable({ containment: "#neon", scroll: false });

    $("#fader").on("input", function () {
        $(".neon").css("font-size", $(this).val() + "px");
        var width = (($(".neon")[0].offsetWidth / $("#lenon-slide")[0].offsetWidth) * 100);
        console.log(width);
        $("#fontsize").text($(this).val());
    });
});

$(".toggle-title").click(function () {
    var index = $(this).next();
    index.slideToggle("fast");
    if ($(this).hasClass("mins-icon")) {
        $(this).removeClass("mins-icon").addClass("plus-icon");
    } else {
        $(this).addClass("mins-icon");
    }
    return false;
});

$(".btn-action").click(function () {
    var name = $(this).data("name");
    $(".neon .shadow").removeClass(function (index, className) {
        return (className.match(/(^|\s)shadow-\S+/g) || []).join("");
    });
    $(".neon .shadow").addClass("shadow-" + name);
    $("#color").val($(this).data("color"));
    $(".btn-action").removeClass("current");
    $(this).addClass("current");
    $(".btn-action").find("span").css("color", "");
    if ($(this).hasClass("current")) {
        $(this).find("span").css("color", $(this).data("value"));
    }
});

$(".font-action").click(function () {
    var name = $(this).data("name");
    var code = $(this).data("value");
    var size = $(this).data("size");
    $("#font").val($(this).data("value"));
    $(".font-action").removeClass("current");
    $(this).addClass("current");
    $(".neon .shadow").css("font-family", code);
    $(".neon .shadow").css("font-size", size + "%");
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

$('#downloadImage').click(function(){
    html2canvas($('#neon')[0]).then(function(canvas) {
        var image     = canvas.toDataURL();
        var link      = document.createElement('a');
        link.download = 'neon-' + Math.floor(Date.now() / 1000) + '.png';
        link.href     = image;
        link.target   = '_blank';
        document.body.appendChild(link);
        link.click();
    });
});

var bg = ['image/bg.jpg', 'image/bg1.jpg'];
var bgActive = 0;

setInterval(() => {
    bgActive = bgActive === 0 ? 1 : 0;
    $('#neon').css("background-image", "url('" + bg[bgActive] + "')");
}, 5000)