$(document).ready(function () {
    $('#language-select').on('change', function () {
        setLanguage(this.value)
    });

    function setLanguage(lang) {
        localStorage.setItem('language', lang);
        getLanguage();
    }

    function getLanguage() {
        let selectedLang = localStorage.getItem('language');

        $.getJSON(`language/${selectedLang}.json`, function (lang) {
            if (selectedLang != $("#language-select").val()) {
                $("#language-select").val(selectedLang);
            }
            populateText(lang);
        });
    }

    function ipLookUp() {
        $.ajax('http://ip-api.com/json')
            .then(
                function success(response) {
                    if (response.countryCode.toUpperCase() == 'MX') {
                        setLanguage("es")
                    }
                    else {
                        setLanguage("en")
                    }
                },

                function fail(data, status) {
                    console.log('Request failed.  Returned status of', status);
                    setLanguage("en")
                }
            );
    }

    function populateText(language) {
        //populate nav-menu
        for (let name in language.nav) {
            $(`.nav-menu #${name}-link`).html(language.nav[name]);
        }

    }

    //document ready 
    if (localStorage.getItem('language') == null) {
        ipLookUp();
    } else {
        getLanguage();
    }
});