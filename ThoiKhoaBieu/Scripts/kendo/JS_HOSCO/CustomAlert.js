function ohSnap(text, color, icon) {
    var icon_markup = "",
        html,
        time = '3000',
        $container = $('#ohsnap');

    if (icon) {
        icon_markup = "<span class='" + icon + "'></span> ";
    }

    // Generate the HTML
    html = $('<div class="alert alert-' + color + '">' + icon_markup + text + '</div>').fadeIn('fast');

    // Append the label to the container
    $container.append(html);

    // Remove the notification on click
    html.on('click', function () {
        ohSnapX($(this));
    });

    // After 'time' seconds, the animation fades out
    setTimeout(function () {
        ohSnapX(html);
    }, time);
}

function ohSnapX(element) {
    // Called without argument, the function removes all alerts
    // element must be a jQuery object

    if (typeof element !== "undefined") {
        element.fadeOut('fast', function () {
            $(this).remove();
        });
    } else {
        $('.alert').fadeOut('fast', function () {
            $(this).remove();
        });
    }
}
//Css tại Content/FileHosco/AdminLTE.css