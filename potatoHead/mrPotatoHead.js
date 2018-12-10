/*global $*/
(function () {
    'use strict';

    let zIndex = 0;

    $('.piece, .body').draggable();
    $('.piece').on('mousedown', function () {
        $(this).css('z-index', ++zIndex);
    });

    $('#startOver').click(() => {
        $('.piece, .body').css({top: 0, left: 0});
        localStorage.clear(0);
        zIndex = 0;
    });

    $('.piece, .body').mouseup(function () {
        localStorage.setItem(this.id, JSON.stringify({
            top: $(this).css('top'), 
            left: $(this).css('left'), 
            zIndex: $(this).css('z-index')
        }));
        localStorage.setItem('zIndex', $(this).css('z-index'));
    });

    let allKeys = Object.keys(localStorage);
    let allPieces = allKeys.filter(function (piece) {
        return piece !== 'zIndex';
    });
    
    zIndex = localStorage.getItem('zIndex');

    allPieces.forEach(piece => {
        $(`#${piece}`).css(JSON.parse(localStorage.getItem(piece)));
    });
}());






// /*global $*/
// (function () {
//     'use strict';

//     let zIndex = 0;
//     let dragging = false;
//     let offset;

//     $(document).on('mousedown', '.piece, .body', function (event) {
//         console.log('mousedown', event);
//         offset = { x: event.offsetX, y: event.offsetY };
//         dragging = $(this);
//         event.preventDefault();
//     }).on('mouseup', event => {
//         console.log('mouseup', event);
//         dragging = null;
//         event.preventDefault();
//     }).mousemove(event => {
//         if (dragging) {
//             console.log('mousemove', event);
//             dragging.css({ top: event.clientY - offset.y, left: event.clientX - offset.x });
//             event.preventDefault();
//         }
//     });

//     $('.piece').on('mousedown', function () {
//         $(this).css('z-index', ++zIndex);
//     });

//     $('#startOver').click(() => {
//         $('.piece, .body').css({top: 0, left: 0});
//         localStorage.clear(0);
//         zIndex = 0;
//     });

//     $('.piece, .body').mouseup(function () {
//         console.log('top: ' + $(this).css('top'));
//         console.log('left: ' + $(this).css('left'));
//         console.log('zindex: ' + $(this).css('z-index'));
//         console.log(this.id);
//         localStorage.setItem(this.id, JSON.stringify({
//             top: $(this).css('top'), 
//             left: $(this).css('left'), 
//             zIndex: $(this).css('z-index')
//         }));
//         localStorage.setItem('zIndex', $(this).css('z-index'));
//     });

//     let allPieces = Object.keys(localStorage);
//     zIndex = localStorage.getItem('zIndex');

//     allPieces.forEach(piece => {
//         $(`#${piece}`).css(JSON.parse(localStorage.getItem(piece)));
//     });
    
// }());