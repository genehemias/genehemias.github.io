
(function () {
    'use strict';

    $(document).foundation();

    const restaurants = [
        "Zaxby's",
        "Hardee's",
        "Waffle House",
        "Cracker Barrel",
        "Pollo Tropical",
        "Subway",
        "Larry's Giant Subs",
        "Tijuana Flats",
        "Panera Bread",
        "Moe's",
        "Bono's",
        "Sonny's",
        "Five Guys",
        "Freddy's",
        "Panda Express",
        "Popeye's"
    ];

    function btnSpinClick() {
        let audioElement = $('#clickSound');
        audioElement.play();
        
        let lblCurrentOption = $('#current-restaurant');

        let randomIndex = Math.floor(Math.random() * restaurants.length);

        let currentOption = restaurants[randomIndex];

        console.log(currentOption);
        console.log(lblCurrentOption);
        console.log(lblCurrentOption.html());
        console.log(lblCurrentOption.innerText);
        lblCurrentOption.html(currentOption);

        // btnVetoEnabled(true);
        // btnSpinEnabled(false);
    };

    function btnVetoEnabled(enable) {
        let btnVeto = $("#btnVeto");
        if (enable) {
            btnVeto.prop('disabled', false);
            btnVeto.removeClass('disabled');
        } else {
            btnVeto.prop('disabled', true);
            btnVeto.addClass('disabled');
        }
    }

    function btnSpinEnabled(enable) {
        let btnSpin = $("#btnSpin");
        if (enable) {
            btnSpin.removeClass('disabled');
        } else {
            btnSpin.addClass('disabled');
        }
    }

    $('#btnSpin').click(() => {
        btnSpinClick();        
    });

    // $("#btnVeto").click(() => {
    //     btnSpinEnabled(true);
    //     btnVetoEnabled(false);
    // })
})();
