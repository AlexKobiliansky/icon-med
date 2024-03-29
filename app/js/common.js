$(document).ready(function(){

    //*** mobile-mnu customization *****//
    var mmenu = $('#mobile-mnu');
    var $mmenu = mmenu.mmenu({
        "pageScroll": true,

        "navbar": {
            "title" : "",
        },
        "extensions": [
            "position-front",
            "fullscreen",
        ],
    }, {
        offCanvas: {
            pageSelector: "#page-wrapper"
        },
        "autoHeight": true
    });

    var mmenuBtn = $("#mmenu-btn");
    var API = $mmenu.data("mmenu");

    mmenuBtn.click(function() {
        API.open();
        $(this).addClass('is-active')
    });

    $('#close-mnu').click(function(e){
        e.preventDefault();
        API.close();
    });


    API.bind( "close:start", function() {
        setTimeout(function() {
            mmenuBtn.removeClass( "is-active" );
        }, 300);
    });
    //***** end mobile-mnu customization *****//

    $('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });

    function heightses() {
        if ($(window).width()>=480) {
            $('.s-important .imp-item-title').height('auto').equalHeights();
            $('.s-important .imp-item-desc').height('auto').equalHeights();
        }
    }

    $(window).resize(function() {
        heightses();
    });

    heightses();

    $('.actuals-slider').owlCarousel({
        loop:true,
        nav: false,
        items: 1,
        margin: 8,
        dots: false,
        autoHeight: false,
        navText: ["",""],
        autoWidth:true,
    });


    $('.blogs-slider').owlCarousel({
        loop:true,
        nav: false,
        items: 1,
        margin: 8,
        dots: false,
        autoHeight: false,
        navText: ["",""],
        autoWidth:true,
    });

    $('.casts-slider').owlCarousel({
        loop:false,
        items: 1,
        dots: false,
        autoHeight: false,
        navText: ["",""],
        autoWidth:true,
        responsive: {
            0: {
                nav: false,
                margin: 8,
            },
            1200: {
                nav: true,
                margin: 30,
            }
        }
    });

    function availableFunction(date) {
        var availday= $.datepicker.formatDate('yy-mm-dd', date);

        if (jQuery.inArray(availday, availableDates) > -1) {
            return [true,"eventday",""];
        } else {
            return [false,"other",""];
        }
    }

    //date-picker custom
    $( ".calendar" ).datepicker({
        dayNames: [ "Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота" ],
        dayNamesMin: [ "Вс", "Пн", "Вт", "Ср", "Чт", "Пн", "Сб" ],
        monthNames: [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ],
        monthNamesShort: [ "Янв", "Феф", "Мар", "Апр", "Май", "Инь", "Иль", "Авг", "Сен", "Окт", "Нбр", "Дек" ],
        dateFormat: "yy-mm-dd",
        firstDay: 1,
        showOtherMonths: true,
        selectOtherMonths: true,
        onSelect: function(dateText, inst) {
            var date = $(this).val();
            // console.log(datavalues[date]);

            eventsArray = datavalues[date];

            var clickedDate = new Date(date)
            var dateTitle = $.datepicker.formatDate('dd.mm.yy', clickedDate);
            $('#calendar-popup-date').text(dateTitle);

            eventsArray.map(function(arr){

                var time = arr[0],
                    type = arr[1],
                    name = arr[2],
                    link = arr[3];

                $('#calendar-popup-events').append(
                "<div class='ev'><div class='ev-top'> <div class='ev-time'><span>"+ time +"</span></div> <div class='ev-type'>"+type+"</div> </div> <a href='"+link+"' class='ev-title'>"+name+"</a> </div>"
                );
            })

            $('.calendar-popup-events').mCustomScrollbar({
                scrollbarPosition: "outside",
                scrollInertia: 100,
                // autoDraggerLength: false
            });

            $('#calendar-popup').show();
        },
        beforeShowDay: availableFunction
    });

    $('.close-calendar').on('click', function(){
        $('.calendar-popup-events').mCustomScrollbar("destroy").html('');
        $('#calendar-popup').hide();
    })

    $('.preloader').fadeOut();

    var playing = false;

    $('#btn-audio').on('click', function(e){
        e.preventDefault();
        let audioPlayer = $('#audio-player');
        $(this).toggleClass('played');

        if (playing === true) {
            audioPlayer.trigger("pause");
            playing = false;
        } else {
            audioPlayer.trigger("play");
            playing = true;
        }
    })


    /**
     * YOUTUBE SCRIPT
     */
    var tag = document.createElement('script');
    tag.src = "//www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var vp;

    // var $videoID = 'yu5TPBX8290';
    var $playerID = 'videoPlayer-0';

    onYouTubeIframeAPIReady = function () {



        $("a[href='#video-popup']").on('click', function(){

            console.log('its working!');

            var $videoID = $(this).data("video");


            vp = new YT.Player($playerID, {
                videoId: $videoID,
                playerVars: {
                    'autoplay': 1,
                    'rel': 0,
                    'showinfo': 0
                },
                events: {
                    'onStateChange': onPlayerStateChange
                }
            });
        });
    };

    onPlayerStateChange = function (event) {
        if (event.data == YT.PlayerState.ENDED) {
            console.log('ended');
            $.magnificPopup.close();
        }
    };
    /**
     * end YOUTUBE SCRIPT
     */


    $(function () {
        $("a[href='#video-popup']").magnificPopup({
            type: "inline",
            fixedContentPos: !1,
            fixedBgPos: !0,
            overflowY: "auto",
            closeBtnInside: !0,
            preloader: !1,
            midClick: !0,
            removalDelay: 300,
            mainClass: "popup-zoom-in",

            callbacks: {
                close: function(){
                    console.log('closed');
                    vp.stopVideo();
                    vp.destroy();
                }
            }
        })
    });
});
