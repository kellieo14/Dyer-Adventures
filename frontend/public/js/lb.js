/* eslint-disable no-undef */
$('.img-wrapper').hover(
    function () {
        $(this).find('.img-overlay').animate({ opacity: 1 }, 600);
    }, function () {
        $(this).find('.img-overlay').animate({ opacity: 0 }, 600);
    },
);

// Lightbox
const $overlay = $('<div id="overlay"></div>');
const $image = $('<img class="image-item">');
const $prevButton = $('<div id="prevButton"><img src="/images/left-arrow.png"></img></div>');
const $nextButton = $('<div id="nextButton"><img src="/images/right-arrow.png"></img></div>');
const $exitButton = $('<div id="exitButton"><img src="/images/exit.png"></img></div>');

// Add overlay
$overlay.append($image).prepend($prevButton).append($nextButton).append($exitButton);
$('#gallery').append($overlay);

// Hide overlay on default
$overlay.hide();

// When an image is clicked
$('.img-overlay').click(function (event) {
    // Prevents default behavior
    event.preventDefault();
    // Adds href attribute to variable
    const imageLocation = $(this).prev().attr('href');
    // Add the image src to $image
    $image.attr('src', imageLocation);
    // Fade in the overlay
    $overlay.fadeIn('slow');
});

// When the overlay is clicked
$overlay.click(function () {
    // Fade out the overlay
    $(this).fadeOut('slow');
});

// When next button is clicked
$nextButton.click((event) => {
    // Hide the current image
    $('#overlay .image-item').hide();
    // Overlay image location
    const $currentImgSrc = $('#overlay .image-item').attr('src');
    // Image with matching location of the overlay image
    const $currentImg = $(`#image-gallery img[src="${$currentImgSrc}"]`);
    // Finds the next image
    const $nextImg = $($currentImg.closest('.image').next().find('img'));
    // All of the images in the gallery
    const $images = $('#image-gallery img');
    // If there is a next image
    if ($nextImg.length > 0) {
        // Fade in the next image
        $('#overlay .image-item').attr('src', $nextImg.attr('src')).fadeIn(800);
    } else {
        // Otherwise fade in the first image
        $('#overlay .image-item').attr('src', $($images[0]).attr('src')).fadeIn(800);
    }
    // Prevents overlay from being hidden
    event.stopPropagation();
});

// When previous button is clicked
$prevButton.click((event) => {
    // Hide the current image
    $('#overlay .image-item').hide();
    // Overlay image location
    const $currentImgSrc = $('#overlay .image-item').attr('src');
    // Image with matching location of the overlay image
    const $currentImg = $(`#image-gallery img[src="${$currentImgSrc}"]`);
    // Finds the next image
    const $nextImg = $($currentImg.closest('.image').prev().find('img'));
    // Fade in the next image
    $('#overlay .image-item').attr('src', $nextImg.attr('src')).fadeIn(800);
    // Prevents overlay from being hidden
    event.stopPropagation();
});

// When the exit button is clicked
$exitButton.click(() => {
    // Fade out the overlay
    $('#overlay').fadeOut('slow');
});

// Add active class to navbar
$(`a[href="${this.location.pathname}"]`).parents('li,ul').addClass('active');
