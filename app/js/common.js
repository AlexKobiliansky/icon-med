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
            $('.imp-item-title').height('auto').equalHeights();
            $('.imp-item-desc').height('auto').equalHeights();
        }
    }

    $(window).resize(function() {
        heightses();
    });

    heightses();

    //E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $(this);

        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {

        });
        return false;
    });
});
