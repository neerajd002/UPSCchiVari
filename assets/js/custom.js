/*
Theme: eLearning - Free Educational Responsive Web Template
Description: Free to use for personal and commercial use
Author: WebThemez.com
Website: http://webthemez.com
Note: Please do not remove the footer backlink (webthemez.com)--(if you want to remove contact: webthemez@gmail.com)
Licence: Creative Commons Attribution 3.0** - http://creativecommons.org/licenses/by/3.0/
*/
jQuery(document).ready(function ($) {

    //Set the carousel options
    if($('#quote-carousel').length) {
      $('#quote-carousel').carousel({
          pause: true,
          interval: 4000,
      });
    }
    // fancybox
    if($(".fancybox").length) { $(".fancybox").fancybox(); }
    //isotope
    if ($('.isotopeWrapper').length) {
        var $container = $('.isotopeWrapper');
        var $resize = $('.isotopeWrapper').attr('id');
        // initialize isotope
        $container.isotope({
            itemSelector: '.isotopeItem',
            resizable: false, // disable normal resizing
            masonry: {
                columnWidth: $container.width() / $resize
            }
        });
        $("a[href='#top']").click(function () {
            $("html, body").animate({
                scrollTop: 0
            }, "slow");
            return false;
        });
        $('.navbar-inverse').on('click', 'li a', function () {
            $('.navbar-inverse .in').addClass('collapse').removeClass('in').css('height', '1px');
        });
        $('#filter a').click(function () {
            $('#filter a').removeClass('current');
            $(this).addClass('current');
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 1000,
                    easing: 'easeOutQuart',
                    queue: false
                }
            });
            return false;
        });
        $(window).smartresize(function () {
            $container.isotope({
                // update columnWidth to a percentage of container width
                masonry: {
                    columnWidth: $container.width() / $resize
                }
            });
        });
    }
    var disableSubmit = false;
    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
    validateNumber = function ($this, event, text) {
      var regex = new RegExp("^[0-9]+$");
      var allowChar = ['8', '9', '37', '38', '39', '40', '46'];
      var str = typeof text != 'undefined' && text.length ? text : String.fromCharCode(!event.charCode ? event.which : event.charCode);
      //var str = String.fromCharCode(!event.charCode ? event.which : event.charCode);
      var number = $this.val();
      var length = number.length;
      var limit = parseInt($this.attr('length')) || 0;
      if (!regex.test(str) || length >= limit && limit > 0 && $this[0].selectionStart == $this[0].selectionEnd) {
          var notAllowed = true;
          if (!event.shiftKey && !event.ctrlKey && !event.altKey) {
              for (var i in allowChar) {
                  if (allowChar[i] == event.keyCode && event.keyCode != '0' && str != '.' && str != "'") {
                      notAllowed = false;
                  }
              }
          }
          if (notAllowed) {
              event.preventDefault();
          }
      }
    }
  $(document).on('keypress', '.validate-number', function (event) { var $this = $(this); validateNumber($this, event); });
  $(document).on('paste', '.validate-number', function (event) {
      var $this = $(this), text = event.originalEvent.clipboardData.getData('text/plain');
      if (text && text.length) { text.split('').forEach(function (data) { validateNumber($this, event, text); }); }
  });
  function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }
  $(document).on('paste', '.validate-email', function (event) {
      var $this = $(this), text = event.originalEvent.clipboardData.getData('text/plain');
      if (text && text.length && !validateEmail(text)) { event.preventDefault(); }
  });
    $(document).on('keypress', '.validate-email', function (event) {
        var regex = new RegExp("^[a-zA-Z0-9@._]+$");
        var character = new RegExp("^[a-zA-Z]+$");
        var specialCharacter = new RegExp("^[.@_]+$");
        //var regex = new RegExp("^([0-9a-zA-Z]([-\\.\\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\\w]*[0-9a-zA-Z]\\.)+[a-zA-Z]{2,9})$");
        var allowChar = ['8', '9', '37', '38', '39', '40', '46'];
        var str = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        var number = $(this).val();
        var length = number.length;
        var limit = parseInt($(this).attr('length')) || 0;
        if (!regex.test(str) || length >= limit && limit > 0 && $(this)[0].selectionStart == $(this)[0].selectionEnd) {
            var notAllowed = true;
            if (!event.shiftKey && !event.ctrlKey && !event.altKey) {
                for (var i in allowChar) {
                    if (allowChar[i] == event.keyCode && event.keyCode != '0' && str != '.' && str != "'") {
                        notAllowed = false;
                    }
                }
            }
            if (str == "'") {
                notAllowed = true;
            }
            if (notAllowed) {
                event.preventDefault();
            }
        }
        else if (!character.test(str) && length == 0) {
            event.preventDefault();
        }
        else if (specialCharacter.test(str)) {
            if (specialCharacter.test(number[length - 1])) {
                event.preventDefault();
            }
            if (number.indexOf('@') > 0) {
                if (str == '@' || str == '_') {
                    event.preventDefault();
                }
                var text2 = number.split('@')[1];
                var count = text2.split('.').length - 1;
                if (count >= 2) {
                    event.preventDefault();
                }
            }
        }
        else if (number.indexOf('@') > 0) {
            var text2 = number.split('@')[1];
            var count = text2.split('.').length - 1;
            if (count >= 1 && !character.test(str)) {
                event.preventDefault();
            }
        }
        $(this).css('text-transform', 'lowercase');
    });
    var submitForm = function(data) {
      if(data) {
        // var encoded = Object.keys(data).map(function(k) {
        //     return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
        // }).join('&');
        $.ajax({
           type: "GET",
           url: 'https://script.google.com/macros/s/AKfycbwRpHhcRjWBZnAdd5K87V8_LxsKLQZHppsOJT67rvz_91Tff0o/exec',
           crossDomain: true,
           data: JSON.stringify(data),
           contentType: "application/json; charset=utf-8",
          //  contentType: "application/x-www-form-urlencoded",
           dataType: "jsonp",
           beforeSend: function () {  },
           complete: function () {
             $('form#gform')[0].reset();
             disableSubmit = false;
             $('form#gform button[type=submit]').removeClass('disabled');
           },
           success: function (json) {
               alert(json.d);
               console.log(json.d);
           },
           failure: function (response) {
               alert(response.d);
           }
       });
     }
    }
   $(document).on('submit','form#gform', function(event) {
     event.preventDefault();
      if (!disableSubmit) {
        var data = $('form#gform').serializeObject();
        if('Name' in data && !data.Name.length) { alert('Please Enter Name...'); }
        else if('Email' in data && !data.Email.length) { alert('Please Enter Email...'); }
        else if('Email' in data && !validateEmail(data.Email)) { alert('Please Enter Email Properly...'); }
        else if('Phone' in data && data.Phone.length && (data.Phone.length != 10 && data.Phone.length != 11)) { alert('Please Enter Phone no Properly...'); }
        else {
          disableSubmit = false;
          $('form#gform button[type=submit]').addClass('disabled');
          submitForm(data);
        }
      }
   });
   $('form#gform button[type=submit]').show();
});
