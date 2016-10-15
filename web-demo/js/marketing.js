function cancelZoom() {
    function a(a) {
        b.content = c + ("blur" == a.type ? c.match(f, "") ? "" : e + 10 : e + 1)
    }
    var b, c, d = document, e = ",maximum-scale=", f = /,*maximum\-scale\=\d*\.*\d*/;
    this.addEventListener && d.querySelector && (b = d.querySelector('meta[name="viewport"]'), c = b.content, this.addEventListener("focus", a, !0), this.addEventListener("blur", a, !1))
}
!function() {
    "use strict";
    function a(b, d) {
        function e(a, b) {
            return function() {
                return a.apply(b, arguments)
            }
        }
        var f;
        if (d = d || {}, this.trackingClick=!1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = d.touchBoundary || 10, this.layer = b, this.tapDelay = d.tapDelay || 200, this.tapTimeout = d.tapTimeout || 700, !a.notNeeded(b)) {
            for (var g = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], h = this, i = 0, j = g.length; j > i; i++)
                h[g[i]] = e(h[g[i]], h);
            c && (b.addEventListener("mouseover", this.onMouse, !0), b.addEventListener("mousedown", this.onMouse, !0), b.addEventListener("mouseup", this.onMouse, !0)), b.addEventListener("click", this.onClick, !0), b.addEventListener("touchstart", this.onTouchStart, !1), b.addEventListener("touchmove", this.onTouchMove, !1), b.addEventListener("touchend", this.onTouchEnd, !1), b.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (b.removeEventListener = function(a, c, d) {
                var e = Node.prototype.removeEventListener;
                "click" === a ? e.call(b, a, c.hijacked || c, d) : e.call(b, a, c, d)
            }, b.addEventListener = function(a, c, d) {
                var e = Node.prototype.addEventListener;
                "click" === a ? e.call(b, a, c.hijacked || (c.hijacked = function(a) {
                    a.propagationStopped || c(a)
                }), d) : e.call(b, a, c, d)
            }), "function" == typeof b.onclick && (f = b.onclick, b.addEventListener("click", function(a) {
                f(a)
            }, !1), b.onclick = null)
        }
    }
    var b = navigator.userAgent.indexOf("Windows Phone") >= 0, c = navigator.userAgent.indexOf("Android") > 0&&!b, d = /iP(ad|hone|od)/.test(navigator.userAgent)&&!b, e = d && /OS 4_\d(_\d)?/.test(navigator.userAgent), f = d && /OS [6-7]_\d/.test(navigator.userAgent), g = navigator.userAgent.indexOf("BB10") > 0;
    a.prototype.needsClick = function(a) {
        switch (a.nodeName.toLowerCase()) {
        case"button":
        case"select":
        case"textarea":
            if (a.disabled)
                return !0;
            break;
        case"input":
            if (d && "file" === a.type || a.disabled)
                return !0;
            break;
        case"label":
        case"iframe":
        case"video":
            return !0
        }
        return /\bneedsclick\b/.test(a.className)
    }, a.prototype.needsFocus = function(a) {
        switch (a.nodeName.toLowerCase()) {
        case"textarea":
            return !0;
        case"select":
            return !c;
        case"input":
            switch (a.type) {
            case"button":
            case"checkbox":
            case"file":
            case"image":
            case"radio":
            case"submit":
                return !1
            }
            return !a.disabled&&!a.readOnly;
        default:
            return /\bneedsfocus\b/.test(a.className)
        }
    }, a.prototype.sendClick = function(a, b) {
        var c, d;
        document.activeElement && document.activeElement !== a && document.activeElement.blur(), d = b.changedTouches[0], c = document.createEvent("MouseEvents"), c.initMouseEvent(this.determineEventType(a), !0, !0, window, 1, d.screenX, d.screenY, d.clientX, d.clientY, !1, !1, !1, !1, 0, null), c.forwardedTouchEvent=!0, a.dispatchEvent(c)
    }, a.prototype.determineEventType = function(a) {
        return c && "select" === a.tagName.toLowerCase() ? "mousedown" : "click"
    }, a.prototype.focus = function(a) {
        var b;
        d && a.setSelectionRange && 0 !== a.type.indexOf("date") && "time" !== a.type && "month" !== a.type ? (b = a.value.length, a.setSelectionRange(b, b)) : a.focus()
    }, a.prototype.updateScrollParent = function(a) {
        var b, c;
        if (b = a.fastClickScrollParent, !b ||!b.contains(a)) {
            c = a;
            do {
                if (c.scrollHeight > c.offsetHeight) {
                    b = c, a.fastClickScrollParent = c;
                    break
                }
                c = c.parentElement
            }
            while (c)
            }
        b && (b.fastClickLastScrollTop = b.scrollTop)
    }, a.prototype.getTargetElementFromEventTarget = function(a) {
        return a.nodeType === Node.TEXT_NODE ? a.parentNode : a
    }, a.prototype.onTouchStart = function(a) {
        var b, c, f;
        if (a.targetTouches.length > 1)
            return !0;
        if (b = this.getTargetElementFromEventTarget(a.target), c = a.targetTouches[0], d) {
            if (f = window.getSelection(), f.rangeCount&&!f.isCollapsed)
                return !0;
            if (!e) {
                if (c.identifier && c.identifier === this.lastTouchIdentifier)
                    return a.preventDefault(), !1;
                this.lastTouchIdentifier = c.identifier, this.updateScrollParent(b)
            }
        }
        return this.trackingClick=!0, this.trackingClickStart = a.timeStamp, this.targetElement = b, this.touchStartX = c.pageX, this.touchStartY = c.pageY, a.timeStamp - this.lastClickTime < this.tapDelay && a.preventDefault(), !0
    }, a.prototype.touchHasMoved = function(a) {
        var b = a.changedTouches[0], c = this.touchBoundary;
        return Math.abs(b.pageX - this.touchStartX) > c || Math.abs(b.pageY - this.touchStartY) > c?!0 : !1
    }, a.prototype.onTouchMove = function(a) {
        return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(a.target) || this.touchHasMoved(a)) && (this.trackingClick=!1, this.targetElement = null), !0) : !0
    }, a.prototype.findControl = function(a) {
        return void 0 !== a.control ? a.control : a.htmlFor ? document.getElementById(a.htmlFor) : a.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
    }, a.prototype.onTouchEnd = function(a) {
        var b, g, h, i, j, k = this.targetElement;
        if (!this.trackingClick)
            return !0;
        if (a.timeStamp - this.lastClickTime < this.tapDelay)
            return this.cancelNextClick=!0, !0;
        if (a.timeStamp - this.trackingClickStart > this.tapTimeout)
            return !0;
        if (this.cancelNextClick=!1, this.lastClickTime = a.timeStamp, g = this.trackingClickStart, this.trackingClick=!1, this.trackingClickStart = 0, f && (j = a.changedTouches[0], k = document.elementFromPoint(j.pageX - window.pageXOffset, j.pageY - window.pageYOffset) || k, k.fastClickScrollParent = this.targetElement.fastClickScrollParent), h = k.tagName.toLowerCase(), "label" === h) {
            if (b = this.findControl(k)) {
                if (this.focus(k), c)
                    return !1;
                k = b
            }
        } else if (this.needsFocus(k))
            return a.timeStamp - g > 100 || d && window.top !== window && "input" === h ? (this.targetElement = null, !1) : (this.focus(k), this.sendClick(k, a), d && "select" === h || (this.targetElement = null, a.preventDefault()), !1);
        return d&&!e && (i = k.fastClickScrollParent, i && i.fastClickLastScrollTop !== i.scrollTop)?!0 : (this.needsClick(k) || (a.preventDefault(), this.sendClick(k, a)), !1)
    }, a.prototype.onTouchCancel = function() {
        this.trackingClick=!1, this.targetElement = null
    }, a.prototype.onMouse = function(a) {
        return this.targetElement ? a.forwardedTouchEvent?!0 : a.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (a.stopImmediatePropagation ? a.stopImmediatePropagation() : a.propagationStopped=!0, a.stopPropagation(), a.preventDefault(), !1) : !0 : !0
    }, a.prototype.onClick = function(a) {
        var b;
        return this.trackingClick ? (this.targetElement = null, this.trackingClick=!1, !0) : "submit" === a.target.type && 0 === a.detail?!0 : (b = this.onMouse(a), b || (this.targetElement = null), b)
    }, a.prototype.destroy = function() {
        var a = this.layer;
        c && (a.removeEventListener("mouseover", this.onMouse, !0), a.removeEventListener("mousedown", this.onMouse, !0), a.removeEventListener("mouseup", this.onMouse, !0)), a.removeEventListener("click", this.onClick, !0), a.removeEventListener("touchstart", this.onTouchStart, !1), a.removeEventListener("touchmove", this.onTouchMove, !1), a.removeEventListener("touchend", this.onTouchEnd, !1), a.removeEventListener("touchcancel", this.onTouchCancel, !1)
    }, a.notNeeded = function(a) {
        var b, d, e, f;
        if ("undefined" == typeof window.ontouchstart)
            return !0;
        if (d =+ (/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
            if (!c)
                return !0;
            if (b = document.querySelector("meta[name=viewport]")) {
                if ( - 1 !== b.content.indexOf("user-scalable=no"))
                    return !0;
                if (d > 31 && document.documentElement.scrollWidth <= window.outerWidth)
                    return !0
            }
        }
        if (g && (e = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), e[1] >= 10 && e[2] >= 3 && (b = document.querySelector("meta[name=viewport]")))) {
            if ( - 1 !== b.content.indexOf("user-scalable=no"))
                return !0;
            if (document.documentElement.scrollWidth <= window.outerWidth)
                return !0
        }
        return "none" === a.style.msTouchAction || "manipulation" === a.style.touchAction?!0 : (f =+ (/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1], f >= 27 && (b = document.querySelector("meta[name=viewport]"), b && ( - 1 !== b.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth))?!0 : "none" === a.style.touchAction || "manipulation" === a.style.touchAction?!0 : !1)
    }, a.attach = function(b, c) {
        return new a(b, c)
    }, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
        return a
    }) : "undefined" != typeof module && module.exports ? (module.exports = a.attach, module.exports.FastClick = a) : window.FastClick = a
}(), $(function() {
    FastClick.attach(document.body)
}), function() {
    var a, b = function(a, b) {
        return function() {
            return a.apply(b, arguments)
        }
    };
    a = function() {
        function a() {}
        return a.prototype.extend = function(a, b) {
            var c, d;
            for (c in a)
                d = a[c], null != d && (b[c] = d);
            return b
        }, a.prototype.isMobile = function(a) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)
        }, a
    }(), this.WOW = function() {
        function c(a) {
            null == a && (a = {}), this.scrollCallback = b(this.scrollCallback, this), this.scrollHandler = b(this.scrollHandler, this), this.start = b(this.start, this), this.scrolled=!0, this.config = this.util().extend(a, this.defaults)
        }
        return c.prototype.defaults = {
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !0
        }, c.prototype.init = function() {
            var a;
            return this.element = window.document.documentElement, "interactive" === (a = document.readyState) || "complete" === a ? this.start() : document.addEventListener("DOMContentLoaded", this.start)
        }, c.prototype.start = function() {
            var a, b, c, d;
            if (this.boxes = this.element.getElementsByClassName(this.config.boxClass), this.boxes.length) {
                if (this.disabled())
                    return this.resetStyle();
                for (d = this.boxes, b = 0, c = d.length; c > b; b++)
                    a = d[b], this.applyStyle(a, !0);
                return window.addEventListener("scroll", this.scrollHandler, !1), window.addEventListener("resize", this.scrollHandler, !1), this.interval = setInterval(this.scrollCallback, 50)
            }
        }, c.prototype.stop = function() {
            return window.removeEventListener("scroll", this.scrollHandler, !1), window.removeEventListener("resize", this.scrollHandler, !1), null != this.interval ? clearInterval(this.interval) : void 0
        }, c.prototype.show = function(a) {
            this.applyStyle(a);
            var b = new Event("wow");
            return b.wow = a, document.body.dispatchEvent(b), a.className = "" + a.className + " " + this.config.animateClass
        }, c.prototype.applyStyle = function(a, b) {
            var c, d, e;
            return d = a.getAttribute("data-wow-duration"), c = a.getAttribute("data-wow-delay"), e = a.getAttribute("data-wow-iteration"), a.setAttribute("style", this.customStyle(b, d, c, e))
        }, c.prototype.resetStyle = function() {
            var a, b, c, d, e;
            for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++)
                a = d[b], e.push(a.setAttribute("style", "visibility: visible;"));
            return e
        }, c.prototype.customStyle = function(a, b, c, d) {
            var e;
            return e = a ? "visibility: hidden; -webkit-animation-name: none; -moz-animation-name: none; animation-name: none;" : "visibility: visible;", b && (e += "-webkit-animation-duration: " + b + "; -moz-animation-duration: " + b + "; animation-duration: " + b + ";"), c && (e += "-webkit-animation-delay: " + c + "; -moz-animation-delay: " + c + "; animation-delay: " + c + ";"), d && (e += "-webkit-animation-iteration-count: " + d + "; -moz-animation-iteration-count: " + d + "; animation-iteration-count: " + d + ";"), e
        }, c.prototype.scrollHandler = function() {
            return this.scrolled=!0
        }, c.prototype.scrollCallback = function() {
            var a;
            return this.scrolled && (this.scrolled=!1, this.boxes = function() {
                var b, c, d, e;
                for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++)
                    a = d[b], a && (this.isVisible(a) ? this.show(a) : e.push(a));
                return e
            }.call(this), !this.boxes.length) ? this.stop() : void 0
        }, c.prototype.offsetTop = function(a) {
            var b;
            for (b = a.offsetTop; a = a.offsetParent;)
                b += a.offsetTop;
            return b
        }, c.prototype.isVisible = function(a) {
            var b, c, d, e, f;
            return c = a.getAttribute("data-wow-offset") || this.config.offset, f = window.pageYOffset, e = f + this.element.clientHeight - c, d = this.offsetTop(a), b = d + a.clientHeight, e >= d && b >= f
        }, c.prototype.util = function() {
            return this._util || (this._util = new a)
        }, c.prototype.disabled = function() {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent)
        }, c
    }()
}.call(this), function(a) {
    a.fn.simplyCountable = function(b) {
        b = a.extend({
            counter: "#counter",
            countType: "characters",
            wordSeparator: " ",
            maxCount: 140,
            strictMax: !1,
            countDirection: "down",
            safeClass: "safe",
            overClass: "over",
            thousandSeparator: ",",
            onOverCount: function() {},
            onSafeCount: function() {},
            onMaxCount: function() {}
        }, b);
        var c = this, d = a(b.counter);
        if (!d.length)
            return !1;
        regex = new RegExp("[" + b.wordSeparator + "]+");
        var e = function() {
            var e, f, g = function(a) {
                return a - 2 * a + b.maxCount
            }, h = function() {
                return "up" === b.countDirection ? f : e
            }, i = function(a) {
                var c = "";
                if (b.thousandSeparator) {
                    a = a.toString(), a.match(/^-/) && (a = a.substr(1), c = "-");
                    for (var d = a.length - 3; d > 0; d -= 3)
                        a = a.substr(0, d) + b.thousandSeparator + a.substr(d)
                }
                return c + a
            };
            if ("words" === b.countType ? (e = b.maxCount - a.trim(c.val()).split(regex).length, "" === c.val() && (e += 1)) : e = b.maxCount - c.val().length, f = g(e), b.strictMax && 0 >= e) {
                var j = c.val();
                (0 > e || j.match(new RegExp("[" + b.wordSeparator + "]$"))) && b.onMaxCount(h(), c, d), "words" === b.countType ? c.val(j.split(regex).slice(0, b.maxCount).join(b.wordSeparator)) : c.val(j.substring(0, b.maxCount)), e = 0, f = b.maxCount
            }
            d.text(i(h())), d.hasClass(b.safeClass) || d.hasClass(b.overClass) ? 0 > e && d.hasClass(b.safeClass) ? (d.removeClass(b.safeClass).addClass(b.overClass), b.onOverCount(h(), c, d)) : e >= 0 && d.hasClass(b.overClass) && (d.removeClass(b.overClass).addClass(b.safeClass), b.onSafeCount(h(), c, d)) : 0 > e ? d.addClass(b.overClass) : d.addClass(b.safeClass)
        };
        e(), c.keyup(e), c.bind("paste", function() {
            setTimeout(e, 5)
        })
    }
}(jQuery), + function(a) {
    "use strict";
    function b() {
        var a = document.createElement("bootstrap"), b = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var c in b)
            if (void 0 !== a.style[c])
                return {
                    end: b[c]
                };
        return !1
    }
    a.fn.emulateTransitionEnd = function(b) {
        var c=!1, d = this;
        a(this).one(a.support.transition.end, function() {
            c=!0
        });
        var e = function() {
            c || a(d).trigger(a.support.transition.end)
        };
        return setTimeout(e, b), this
    }, a(function() {
        a.support.transition = b()
    })
}(jQuery), function(a, b, c) {
    function d() {
        j.offset = i.$content.get(0).offsetTop, e.setup()
    }
    function e(b) {
        a.scrollY > j.offset&&!j.isVisible && (g(), j.isVisible=!0, e.destroy(), f.setup())
    }
    function f(b) {
        a.scrollY < j.offset && j.isVisible && (g(), j.isVisible=!1, f.destroy(), e.setup())
    }
    function g() {
        j.isVisible ? i.$fixedNav.removeClass("fade-in-down").addClass("fade-out-up") : i.$fixedNav.removeClass("hide fade-out-up").addClass("fade-in-down")
    }
    var h, i, j;
    i = h = {
        $body: b(document.body),
        $window: b(a),
        $fixedNav: b(".js-fixed-nav"),
        $content: b("#content")
    }, j = {
        isVisible: !1,
        offset: 0,
        showHandler: null,
        hideHandler: null
    }, e.setup = function() {
        i.$window.on({
            "scroll touchmove": this
        })
    }, e.destroy = function() {
        i.$window.off({
            "scroll touchmove": this
        })
    }, f.setup = function() {
        i.$window.on({
            "scroll touchmove": this
        })
    }, f.destroy = function() {
        i.$window.off({
            "scroll touchmove": this
        })
    }, b(function() {
        i.$fixedNav.length && i.$content.length && d()
    })
}(window, jQuery), function(a, b) {
    void 0 !== WOW && (wow = new WOW({
        animateClass: "animated",
        offset: 150,
        mobile: !1
    }), wow.init())
}(window, jQuery), function(a) {
    function b() {
        var b = window.innerHeight, c = document.compatMode;
        return (c ||!a.support.boxModel) && (b = "CSS1Compat" == c ? document.documentElement.clientHeight : document.body.clientHeight), b
    }
    a(window).scroll(function() {
        var c = b(), d = document.documentElement.scrollTop ? document.documentElement.scrollTop: document.body.scrollTop, e = [];
        a.each(a.cache, function() {
            this.events && this.events.inview && e.push(this.handle.elem)
        }), e.length && a(e).each(function() {
            var b = a(this), e = b.offset().top, f = b.height(), g = b.data("inview") ||!1;
            d > e + f || e > d + c ? g && (b.data("inview", !1), b.trigger("inview", [!1])) : e + f > d && (g || (b.data("inview", !0), b.trigger("inview", [!0])))
        })
    }), a(function() {
        a(window).scroll()
    })
}(jQuery), function(a) {
    a.fn.cancelZoom = function() {
        return this.each(cancelZoom)
    }, a("input:text,select,textarea").cancelZoom()
}(jQuery), $("a[href*=#]:not([href=#])").click(function() {
    if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") || location.hostname == this.hostname) {
        var a = $(this.hash);
        if (a = a.length ? a : $("[name=" + this.hash.slice(1) + "]"), a.length)
            return $("html,body").animate({
                scrollTop: a.offset().top
            }, 600), !1
    }
}), function(a) {
    "use strict";
    function b(a) {
        this.el = a, this.overlay = this.el.querySelector(".nl-overlay"), this.fields = [], this.fldOpen =- 1, this._init()
    }
    function c(a, b, c, d) {
        this.form = a, this.elOriginal = b, this.pos = d, this.type = c, this._create(), this._initEvents()
    }
    var d = a.document;
    String.prototype.trim || (String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, "")
    }), b.prototype = {
        _init: function() {
            var a = this;
            Array.prototype.slice.call(this.el.querySelectorAll("select")).forEach(function(b, d) {
                a.fldOpen++, a.fields.push(new c(a, b, "dropdown", a.fldOpen))
            }), Array.prototype.slice.call(this.el.querySelectorAll("input")).forEach(function(b, d) {
                a.fldOpen++, a.fields.push(new c(a, b, "input", a.fldOpen))
            }), this.overlay.addEventListener("click", function(b) {
                a._closeFlds()
            }), this.overlay.addEventListener("touchstart", function(b) {
                a._closeFlds()
            })
        },
        _closeFlds: function() {
            - 1 !== this.fldOpen && this.fields[this.fldOpen].close()
        }
    }, c.prototype = {
        _create: function() {
            "dropdown" === this.type ? this._createDropDown() : "input" === this.type && this._createInput()
        },
        _createDropDown: function() {
            var a = this;
            this.fld = d.createElement("div"), this.fld.className = "nl-field nl-dd", this.toggle = d.createElement("a"), this.toggle.innerHTML = this.elOriginal.options[this.elOriginal.selectedIndex].innerHTML, this.toggle.className = "nl-field-toggle", this.optionsList = d.createElement("ul");
            var b = "";
            Array.prototype.slice.call(this.elOriginal.querySelectorAll("option")).forEach(function(c, d) {
                b += a.elOriginal.selectedIndex === d ? '<li class="nl-dd-checked">' + c.innerHTML + "</li>" : "<li>" + c.innerHTML + "</li>", a.elOriginal.selectedIndex === d && (a.selectedIdx = d)
            }), this.optionsList.innerHTML = b, this.fld.appendChild(this.toggle), this.fld.appendChild(this.optionsList), this.elOriginal.parentNode.insertBefore(this.fld, this.elOriginal), this.elOriginal.style.display = "none"
        },
        _createInput: function() {
            this.fld = d.createElement("div"), this.fld.className = "nl-field nl-ti-text", this.toggle = d.createElement("a"), this.toggle.innerHTML = this.elOriginal.getAttribute("placeholder"), this.toggle.className = "nl-field-toggle", this.optionsList = d.createElement("ul"), this.getinput = d.createElement("input"), this.getinput.setAttribute("type", "text"), this.getinput.setAttribute("placeholder", this.elOriginal.getAttribute("placeholder")), this.getinputWrapper = d.createElement("li"), this.getinputWrapper.className = "nl-ti-input", this.inputsubmit = d.createElement("button"), this.inputsubmit.className = "nl-field-go", this.inputsubmit.innerHTML = "Go", this.getinputWrapper.appendChild(this.getinput), this.getinputWrapper.appendChild(this.inputsubmit), this.example = d.createElement("li"), this.example.className = "nl-ti-example", this.example.innerHTML = this.elOriginal.getAttribute("data-subline"), this.optionsList.appendChild(this.getinputWrapper), this.optionsList.appendChild(this.example), this.fld.appendChild(this.toggle), this.fld.appendChild(this.optionsList), this.elOriginal.parentNode.insertBefore(this.fld, this.elOriginal), this.elOriginal.style.display = "none"
        },
        _initEvents: function() {
            var a = this;
            if (this.toggle.addEventListener("click", function(b) {
                b.preventDefault(), b.stopPropagation(), a._open()
            }), this.toggle.addEventListener("touchstart", function(b) {
                b.preventDefault(), b.stopPropagation(), a._open()
            }), "dropdown" === this.type) {
                var b = Array.prototype.slice.call(this.optionsList.querySelectorAll("li"));
                b.forEach(function(c, d) {
                    c.addEventListener("click", function(d) {
                        d.preventDefault(), a.close(c, b.indexOf(c))
                    }), c.addEventListener("touchstart", function(d) {
                        d.preventDefault(), a.close(c, b.indexOf(c))
                    })
                })
            } else
                "input" === this.type && (this.getinput.addEventListener("keydown", function(b) {
                    13 == b.keyCode && a.close()
                }), this.inputsubmit.addEventListener("click", function(b) {
                    b.preventDefault(), a.close()
                }), this.inputsubmit.addEventListener("touchstart", function(b) {
                    b.preventDefault(), a.close()
                }))
        },
        _open: function() {
            if (this.open)
                return !1;
            this.open=!0, this.form.fldOpen = this.pos;
            this.fld.className += " nl-field-open"
        },
        close: function(a, b) {
            if (!this.open)
                return !1;
            if (this.open=!1, this.form.fldOpen =- 1, this.fld.className = this.fld.className.replace(/\b nl-field-open\b/, ""), "dropdown" === this.type) {
                if (a) {
                    var c = this.optionsList.children[this.selectedIdx];
                    c.className = "", a.className = "nl-dd-checked", this.toggle.innerHTML = a.innerHTML, this.selectedIdx = b, this.elOriginal.value = this.elOriginal.children[this.selectedIdx].value
                }
            } else
                "input" === this.type && (this.getinput.blur(), this.toggle.innerHTML = "" !== this.getinput.value.trim() ? this.getinput.value : this.getinput.getAttribute("placeholder"), this.elOriginal.value = this.getinput.value)
        }
    }, a.NLForm = b
}(window);
var nlform = new NLForm(document.getElementById("nl-form"));
