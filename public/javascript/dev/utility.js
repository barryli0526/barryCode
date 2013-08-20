/// <reference path="../lib/requirejs/require.js" />

define("utility", function ()
{
    var eventNameReg = /^on/gi,
        emptyStr = "";

    String.prototype.HtmlEncode = function ()
    {
        var tmpDiv = document.createElement("div");
        if (tmpDiv.innerText != null)
            tmpDiv.innerText = this.toString();
        else
            tmpDiv.textContent = this.toString();
        return tmpDiv.innerHTML;
    };
    String.prototype.HtmlDecode = function ()
    {
        var tmpDiv = document.createElement("div");
        tmpDiv.innerHTML = this.toString();
        return tmpDiv.innerText ? tmpDiv.innerText : tmpDiv.textContent;
    };
    String.prototype.trim = function ()
    {
        var reg = /(^\s*)|(\s*$)/gi,
            empty = "";
        return this.replace(reg, empty);
    };
    String.prototype.format = function ()
    {
        var result = this;
        for (var ndx = 0, l = arguments.length; ndx < l; ndx++)
        {
            result = result.replace(new RegExp("\\{" + ndx + "\\}", "g"), arguments[ndx]);
        }
        return result;
    };

    Object.prototype = (function ()
    {
        var cache = [],
            eventModel = function (element, event, fun)
            {
                var events = [];
                event.funs = event.funs || [];
                event.funs.push(fun);

                this.element = element;
                this.events = events.push(event);
                this.update = function (event, fun)
                {
                    if (events.indexOf(event) == -1)
                    {
                        event.funs = [];
                        event.funs.push(fun);
                        events.push(event);
                    }
                    else
                    {
                        //if(eventsa
                    }
                }
            },

            findElement = function (element)
            {
                for (var i = 0; i < cache.length; i++)
                {
                    if (cache[i]["element"] == element)
                        return cache[i];
                }
            },

            findEvent = function (element, event)
            {
                for (var i = 0; i < element.events.length; i++)
                {
                    if (element.events[i] == event)
                        return element.events[i];
                }
            },

            addEvent = function (element, event, fun)
            {
                var model = findElement(element);

                if (!model)
                {
                    model = new eventModel(element, event, fun);
                    cache.push(model);
                    return;
                }

                model.update(event, fun);
            },

            bindEvent = function (type, fun)
            {
                type = type.replace(eventNameReg, emptyStr);
                if (document.addEventListener)
                {
                    this.addEventListener(type, fun, false);
                }
                else if (document.attachEvent)
                {
                    this.attachEvent("on" + type, fun);
                }
                else
                {
                    this["on" + type] = fun;
                }
            },

            unbindEvent = function (type, fun)
            {
                if (typeof fun != "function")
                    throw Error(fun + " should be a function name");

                type = type.replace(eventNameReg, emptyStr);
                if (document.removeEventListener)
                {
                    this.removeEventListener(type, fun, false);
                }
                else if (document.detachEvent)
                {
                    this.detachEvent("on" + type, fun);
                }
                else
                {
                    this["on" + type] = null;
                }
            }

        return { "bindEvent": bindEvent, "unbindEvent": unbindEvent };
    })();


    var utility = {

        addStyleRule: function (styles, zindex)
        {
            var style = document.createElement("style");
            style.setAttribute("media", "screen");
            style.appendChild(document.createTextNode(emptyStr));
            document.head.appendChild(style);

            var sheet = style.sheet;
            for (var i = 0; i < styles.length; i++)
            {
                addStyle(sheet, styles[i].selector, styles[i].rules, zindex);
            }

            function addStyle(sheet, selector, rules, zindex)
            {
                if (sheet.insertRule)
                {
                    sheet.insertRule(selector + "{" + rules + "}", zindex);
                }
                else
                {
                    sheet.addRule(selector, rules, zindex);
                }
            }
        }
    };

    return utility;
});