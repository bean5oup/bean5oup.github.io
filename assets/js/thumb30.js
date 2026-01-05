$(document).ready(() => {
    if(!document.location.pathname.match(/^\/[0-9]*[0-9]$/)) {
        if($('#content>.inner>.post-item').length) {
            $('#content>.inner').css({
                'max-width': 'calc(980px * var(--var-zoom))',
                'padding': '0 40px'
            });
            // $('section.container').css('height', '100%');
            
            // move to script.js
            // $(".pagination .view-more").on("click", function(){
            //     for(let i = $('.post-item').length - 1; i >= 0; i--) {
            //         if ($('.post-item').eq(i).css('animation') == '1s ease-in-out 0s 1 normal forwards running fadeIn')
            //             break;
            //         $('.post-item').eq(i).css('animation', 'fadeIn 1s ease-in-out forwards');
            //     }
            //     return false;
            // });
            $('.post-item').css('animation', 'fadeIn 1s ease-in-out forwards');
            
            const video = document.createElement("video");
            video.onplay = function (e) {
                $('.profile_animated_background video').css('opacity', '1');
            };
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            video.innerHTML = `<source src="https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/1263950/6c0a7998c55d09d6c69677a5b7c7002125d66024.webm" type="video/webm">
                               <source src="https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/1263950/5d55e33857c40b4ae57aaba611cf7ce8a2b41c5b.mp4" type="video/mp4">`;
            $('.profile_animated_background').html(video);
        }
        return;
    }
    // $('#content>.inner').css('padding', '0');
    // $('#content>.inner').css('max-width', '100%');

    // let excerpt = $('.entry-content p')[0].innerText.trim();
    // $('.entry-content p')[0].remove();
    // $('.entry-excerpt b').text(excerpt);

    let images = $('.entry-content figure.imageblock');
    let image = undefined;
    //let image = $('.entry-content figure.imageblock[data-filename="thumbnail.jpg"]')[0];
    for(let i = 0; i < images.length; i++) {
        let filename = images[i].getAttribute('data-filename');
        if(!!filename?.match(/^thumbnail\./g)) {
            image = images[i];
            break;
        }
    }
    if(image) {
        $('.entry-header-thumb').css('background-image', `url(${image.querySelector('span img').src})`);
        image.remove();
    }
    $('.post-tags')[0].innerHTML = $('.post-tags')[0].innerHTML.replaceAll('</a>, <a', '</a> <a');

    for (const _ of $('.entry-content ol li')) {
        _.innerHTML = _.innerHTML.replaceAll('<br>', ' ');
    }

    for (const _ of $('.entry-content p')) {
        _.innerHTML = _.innerHTML.replaceAll('<br>', ' ');
    }

    for (const _ of $('.entry-content ul li')) {
        _.innerHTML = _.innerHTML.replaceAll('<br>', ' ');
    }
});