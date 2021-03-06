/**
 jQuery Masked Input Plugin
 Copyright (c) 2007 - 2014 Josh Bush (digitalbush.com)
 Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
 Version: 1.4.0
 */

!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery)
}(function (a) {
    var b, c = navigator.userAgent, d = /iphone/i.test(c), e = /chrome/i.test(c), f = /android/i.test(c);
    a.mask = {
        definitions: {9: "[0-9]", a: "[A-Za-z]", "*": "[A-Za-z0-9]"},
        autoclear: !0,
        dataName: "rawMaskFn",
        placeholder: "_"
    }, a.fn.extend({
        caret: function (a, b) {
            var c;
            if (0 !== this.length && !this.is(":hidden")) return "number" == typeof a ? (b = "number" == typeof b ? b : a, this.each(function () {
                this.setSelectionRange ? this.setSelectionRange(a, b) : this.createTextRange && (c = this.createTextRange(), c.collapse(!0), c.moveEnd("character", b), c.moveStart("character", a), c.select())
            })) : (this[0].setSelectionRange ? (a = this[0].selectionStart, b = this[0].selectionEnd) : document.selection && document.selection.createRange && (c = document.selection.createRange(), a = 0 - c.duplicate().moveStart("character", -1e5), b = a + c.text.length), {
                begin: a,
                end: b
            })
        }, unmask: function () {
            return this.trigger("unmask")
        }, mask: function (c, g) {
            var h, i, j, k, l, m, n, o;
            if (!c && this.length > 0) {
                h = a(this[0]);
                var p = h.data(a.mask.dataName);
                return p ? p() : void 0
            }
            return g = a.extend({
                autoclear: a.mask.autoclear,
                placeholder: a.mask.placeholder,
                completed: null
            }, g), i = a.mask.definitions, j = [], k = n = c.length, l = null, a.each(c.split(""), function (a, b) {
                "?" == b ? (n--, k = a) : i[b] ? (j.push(new RegExp(i[b])), null === l && (l = j.length - 1), k > a && (m = j.length - 1)) : j.push(null)
            }), this.trigger("unmask").each(function () {
                function h() {
                    if (g.completed) {
                        for (var a = l; m >= a; a++) if (j[a] && C[a] === p(a)) return;
                        g.completed.call(B)
                    }
                }

                function p(a) {
                    return g.placeholder.charAt(a < g.placeholder.length ? a : 0)
                }

                function q(a) {
                    for (; ++a < n && !j[a];) ;
                    return a
                }

                function r(a) {
                    for (; --a >= 0 && !j[a];) ;
                    return a
                }

                function s(a, b) {
                    var c, d;
                    if (!(0 > a)) {
                        for (c = a, d = q(b); n > c; c++) if (j[c]) {
                            if (!(n > d && j[c].test(C[d]))) break;
                            C[c] = C[d], C[d] = p(d), d = q(d)
                        }
                        z(), B.caret(Math.max(l, a))
                    }
                }

                function t(a) {
                    var b, c, d, e;
                    for (b = a, c = p(a); n > b; b++) if (j[b]) {
                        if (d = q(b), e = C[b], C[b] = c, !(n > d && j[d].test(e))) break;
                        c = e
                    }
                }

                function u() {
                    var a = B.val(), b = B.caret();
                    if (a.length < o.length) {
                        for (A(!0); b.begin > 0 && !j[b.begin - 1];) b.begin--;
                        if (0 === b.begin) for (; b.begin < l && !j[b.begin];) b.begin++;
                        B.caret(b.begin, b.begin)
                    } else {
                        for (A(!0); b.begin < n && !j[b.begin];) b.begin++;
                        B.caret(b.begin, b.begin)
                    }
                    h()
                }

                function v() {
                    A(), B.val() != E && B.change()
                }

                function w(a) {
                    if (!B.prop("readonly")) {
                        var b, c, e, f = a.which || a.keyCode;
                        o = B.val(), 8 === f || 46 === f || d && 127 === f ? (b = B.caret(), c = b.begin, e = b.end, e - c === 0 && (c = 46 !== f ? r(c) : e = q(c - 1), e = 46 === f ? q(e) : e), y(c, e), s(c, e - 1), a.preventDefault()) : 13 === f ? v.call(this, a) : 27 === f && (B.val(E), B.caret(0, A()), a.preventDefault())
                    }
                }

                function x(b) {
                    if (!B.prop("readonly")) {
                        var c, d, e, g = b.which || b.keyCode, i = B.caret();
                        if (!(b.ctrlKey || b.altKey || b.metaKey || 32 > g) && g && 13 !== g) {
                            if (i.end - i.begin !== 0 && (y(i.begin, i.end), s(i.begin, i.end - 1)), c = q(i.begin - 1), n > c && (d = String.fromCharCode(g), j[c].test(d))) {
                                if (t(c), C[c] = d, z(), e = q(c), f) {
                                    var k = function () {
                                        a.proxy(a.fn.caret, B, e)()
                                    };
                                    setTimeout(k, 0)
                                } else B.caret(e);
                                i.begin <= m && h()
                            }
                            b.preventDefault()
                        }
                    }
                }

                function y(a, b) {
                    var c;
                    for (c = a; b > c && n > c; c++) j[c] && (C[c] = p(c))
                }

                function z() {
                    B.val(C.join(""))
                }

                function A(a) {
                    var b, c, d, e = B.val(), f = -1;
                    for (b = 0, d = 0; n > b; b++) if (j[b]) {
                        for (C[b] = p(b); d++ < e.length;) if (c = e.charAt(d - 1), j[b].test(c)) {
                            C[b] = c, f = b;
                            break
                        }
                        if (d > e.length) {
                            y(b + 1, n);
                            break
                        }
                    } else C[b] === e.charAt(d) && d++, k > b && (f = b);
                    return a ? z() : k > f + 1 ? g.autoclear || C.join("") === D ? (B.val() && B.val(""), y(0, n)) : z() : (z(), B.val(B.val().substring(0, f + 1))), k ? b : l
                }

                var B = a(this), C = a.map(c.split(""), function (a, b) {
                    return "?" != a ? i[a] ? p(b) : a : void 0
                }), D = C.join(""), E = B.val();
                B.data(a.mask.dataName, function () {
                    return a.map(C, function (a, b) {
                        return j[b] && a != p(b) ? a : null
                    }).join("")
                }), B.one("unmask", function () {
                    B.off(".mask").removeData(a.mask.dataName)
                }).on("focus.mask", function () {
                    if (!B.prop("readonly")) {
                        clearTimeout(b);
                        var a;
                        E = B.val(), a = A(), b = setTimeout(function () {
                            z(), a == c.replace("?", "").length ? B.caret(0, a) : B.caret(a)
                        }, 10)
                    }
                }).on("blur.mask", v).on("keydown.mask", w).on("keypress.mask", x).on("input.mask paste.mask", function () {
                    B.prop("readonly") || setTimeout(function () {
                        var a = A(!0);
                        B.caret(a), h()
                    }, 0)
                }), e && f && B.off("input.mask").on("input.mask", u), A()
            })
        }
    })
});

jQuery(document).ready(function () {

  $('.header__toggle-button').click(function () {
      $(this).toggleClass('active');
      $('.device-toggle-content').toggleClass('active');
      $('body').toggleClass('no-scroll');
  });

  $('[name="phone"]').mask("+7(999)999-99-99");

  var validate = function (el) {
      var value = el.val();

      if (el.attr('data-required') == 'true') {
          if (value.length == 0) {
              return false;
          }
      }
      return true;
  };
  var validateCheck = function (el) {
      if (el.attr('checked') == 'checked') {
        return true;
      }
      return false;
  };

  var formSubmit = function (data) {
      funcAjax(data, function(p) {
          console.log(p);
      });
  };


  $('.form').submit(function (event) {
      event.preventDefault();
      var errors = 0;
      var data = {};
      $('[name]', $(this)).each(function () {
         var parent = $(this).parent();
         if ($(this).attr('type') == 'checkbox') {
             if (!validateCheck($(this))) {
                 parent.addClass('form-control--error');
                 errors++;
             } else {
                 parent.removeClass('form-control--error');
                 data[$(this).attr('name')] = $(this).val()
             }
         } else {
             if (!validate($(this))) {
                 parent.addClass('form-control--error');
                 errors++;
             } else {
                 parent.removeClass('form-control--error');
                 data[$(this).attr('name')] = $(this).val()
             }
         }

      });
      if (errors == 0) {
          formSubmit(data);
      }
  })
    /*
    /*
  $('.form-control select').each(function () {
        var $this = $(this),
            numberOfOptions = $(this).children('option').length;

        $this.addClass('select-hidden');
        $this.wrap('<div class="form-control__select"></div>');
        $this.after('<div class="select-styled"></div>');

        var $styledSelect = $this.next('div.select-styled');
        $styledSelect.text($this.children('option').eq(0).text());

        if ($this.prop('disabled')) {
            $styledSelect.addClass('disabled');
            $('.select').addClass('disabled');
        }

        var $list = $('<ul />', {
            'class': 'select-options'
        }).insertAfter($styledSelect);

        for (var i = 0; i < numberOfOptions; i++) {
            var li = $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
            if (i == 0) {
                li.addClass('selected');
            }
        }

        var $listItems = $list.children('li');

        $styledSelect.click(function (e) {
            e.stopPropagation();
            $(this).toggleClass('active').next('ul.select-options').toggle();
        });

        $listItems.click(function (e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $listItems.removeClass('selected');
            $(this).addClass('selected');
            $list.hide();
            //console.log($this.val());
        });

        $(document).click(function () {
            $styledSelect.removeClass('active');
            $list.hide();
        });

    });
    */
    var map = $('.pain__map');

    $('.pain__item').each(function() {
       var $this = $(this),
           x = $(this).attr('data-x-pos'),
           y = $(this).attr('data-y-pos'),
           index = $(this).attr('id'),
           point = $('<div>')
               .addClass('pain__point')
               .css({
                top: y + 'px',
                left: x + 'px',
            })
               .attr({
                    id: 'point' + index,
                })
               .mouseout(function () {
                    $('#' + index).removeClass('active');
                })
               .mouseover(function() {
                    $('#' + index).addClass('active');
                });
    // .hover(function () {
    //         $('#' + index).toggleClass('active');
    //     });
            map.append(point);

        $this
            .mouseout(function () {
                $('#point' + index).removeClass('active');
            })
            .mouseover(function() {
                $('#point' + index).addClass('active');
            });

    });

    $('.pain__button-more').click(function () {
        $(this).addClass('activated');
        $('.right').addClass('active');
    });

    var funcAjax = (function(data, f) {
        $.ajax({
            method: "POST",
            url:  "/mess/mess/get-message-list/",
            data: data
        })
            .done(function (ret) {
                f(ret);
            })
            .fail(function (e) {
                console.log(e);
            });
    });

    var stringToDate = function(line) {
        var sDate = line;
        sDate = sDate.replace(/\-/g, "/");
        sDate = sDate.replace(/(\d{1,2})[\/-\\.](\d{1,2})[\/-\\.](\d{4})\s(\d{2}):(\d{2}):(\d{2})/, "$3/$2/$1 $4:$5:$6");
        return new Date(sDate);
    };

    var dateParse = function(date) {
        var minute = date.getMinutes(),
            hour = date.getHours(),
            fullDate,
            day = date.getDate(),
            dayWeek = date.getDay(),
            month = date.getMonth(),
            year = date.getFullYear(),
            monthArray=["января", "февраля", "марта", "апреля", "мая", "июня","июля", "августа", "сентября", "октября", "ноября", "декабря"],
            daysWeek=["Воскресенье", "Понедельник", "Вторник", "Среда","Четверг", "Пятница", "Суббота"];

        month = monthArray[month];
        fullDate = day + " " + month + " " + year;
        dayWeek = daysWeek[dayWeek];


        return {
            minute : minute,
            hour : hour,
            fullDate : fullDate,
            day : day,
            dayWeek : dayWeek,
            month : month,
            year : year,
        }
    };

    var newDate = stringToDate("8-12-2018");

    console.log(dateParse(newDate));

    var people = [
        {
            name: 'Иван',
            age: 30
        },
        {
            name: 'Иван2',
            age: 12
        },
        {
            name: 'Иван3',
            age: 45
        },
        {
            name: 'Иван4',
            age: 5
        },
        {
            name: 'Иван5',
            age: 24
        },
        {
            name: 'Иван6',
            age: 65
        },
        {
            name: 'Иван7',
            age: 12
        },
        {
            name: 'Иван8',
            age: 8
        },

    ];
    function compareNumeric(a, b) {
        if (a.age > b.age) return 1;
        if (a.age < b.age) return -1;
    }
    var peopleSort = [...people].sort(compareNumeric);

    console.log("Без сортировки", people);
    console.log("С сортировкой", peopleSort);

    var arr = [ 1, 2, 15 ];
    var people3 = people;
    peopleSort.forEach(function(item) {
        people3 = people3.concat(item);
    });

    console.log("оба", people3);

  $('.slider').owlCarousel({
    loop:true,
    responsiveClass:true,
    responsive:{
      0:{
        items:1,
        nav:false
      },
      767:{
        items:2,
        nav:false
      },
      1200:{
        items:3,
        nav:false
      }
    }
  })


    $('.faq-page__images').owlCarousel({
        loop:false,
        responsiveClass:true,
        items: 1,
        dots: true,
        nav: true,
        navText: ['','']
    });


    function initMap() {
        var map;
        var pos = {lat: 40.017731, lng:  -105.252123};
        var opt = {
            center: pos,
            zoom: 12
        };

        var popupContent = `<div class="contacts_popup"> Здесь могло быть что то написано </div>`
        map = new google.maps.Map(document.querySelector('.google-maps'), opt);
        var marker = new google.maps.Marker({
            position: pos,
            map: map,
            title: "Убери мышку прочь",
            icon: './images/map@2x.png',
            animation: google.maps.Animation.DROP
        });
        infowindow = new google.maps.InfoWindow({
            content: popupContent
        });
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
        $.getJSON("./json/style.json", function(data) {
            map.setOptions({styles: data});
        });
    }
    initMap();
});
