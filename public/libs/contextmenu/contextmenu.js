/// <reference path="../lib/jquery/jquery-1.10.2.js" />
/// <reference path="../lib/requirejs/require.js" />
/// <reference path="common.js" />

/*-----------------------------------------
 ContextMenu UI control.

 API:
 contextMenu            :build a contextmenu
 menuItem               :create menuitem of contextmenu
 ready                  :reset context menu start layout, must be called after all contextmenus setup

 contextMenu instance methods
 show                   :show contextmenu

 menuitem instance methods
 children.add           :add child menuitems
 children.removeAt      :remove child menuitems
 children.clear         :clear all children menuitems

 Q&A:
 How to create a menuitem?
 Create a menuitem instance with text, url, sepline, evts, bgimg and the text is required.

 How to add children menuitem?
 Use menuiten instance method "children.add"

 How to append sub menuitems to a context menu
 Append the root menuitem to contextmenu's "children" argument

 Notification:
 1.Each menuitem is uniqued on a contextmenu
 2.Don't add one menuitem to diffrent contextmenu or different sub menuitem
 3.In menuitem owner events, the this is pointing to the document object which invoke the context menu not the menuitem self.

 ------------------------------------------*/

define(["jquery", "utility"], function ($, utility)
{
    var defaults = {
        children: [],     //root menuitems
        disable: false,   //auto-bind contextmenu event
        richStyle: false  //whether show menuitem background image at the left side(rich style)
    };

    var randomClass = [],
        liTemplate = "<li class='{0}'><a href='{1}'>{2}</a>",
        liBGgTemplate = "<li class='{0}' style='{3}'><a href='{1}'>{2}</a>",
        liClose = "</li>",
        child = "<ul class='child'>",
        childClose = "</ul>",
        containerTemplate = "<div class='content_menu' id='{0}'><ul>",
        richContainerTemplate = "<div class='content_menu{1}' id='{0}'><ul>",
        containerClose = "</ul></div>",
        randomBaseStr = "0123456789qwertyuioplkjhgfdsazxcvbnm",
        classMaxLength = 5,

        randomChar = function (length)
        {
            length = length || classMaxLength
            var base = randomBaseStr;
            var char = "";
            for (var i = 0; i < length; i++)
            {
                char += base.charAt(Math.ceil(Math.random() * 100000000) % base.length);
            }

            if (randomClass.indexOf(char) != -1)
                arguments.callee(length);

            return char;
        },

        generatedMenuItem = function (node, className, id)
        {
            bindEventDelegate(node, "#" + id + " ." + className + ">a");
            return node.generatedHTML(className);
        },

        generatedMenuItemHTML = function (node, id)
        {
            if (node.seperateLine)
            {
                return generatedSeperateLine();
            }

            var className = node.className || randomChar();

            var html = generatedMenuItem(node, className, id);

            //叶子节点
            if (!node.children.length)
            {
                return html + liClose;
            }

            html += child;
            for (var i = 0; i < node.children.length; i++)
            {
                html += generatedMenuItemHTML(node.children[i], id);
            }
            html += childClose;
            html += liClose;
            return html;
        },

        generatedContentMenu = function (nodes, id, rich)
        {
            var html = rich ? richContainerTemplate.format(id, " withimg") : containerTemplate.format(id);
            for (var i = 0; i < nodes.length; i++)
            {
                html += generatedMenuItemHTML(nodes[i], id);
            }
            html += containerClose;
            return html;
        },

        generatedSeperateLine = function ()
        {
            return "<li class='sepline'></li>";
        },

        isChild = function (element, parent)
        {
            while (element && parent && element.tagName.toUpperCase() != "BODY" && element.tagName.toUpperCase() != "HTML")
            {
                if (element == parent)
                {
                    return true;
                }
                element = element.parentNode;
            }
            return false;
        },

        bindEventDelegate = function (menu, selector)
        {
            for (var i in menu.evts)
            {
                $(document).on(i, selector, function (e)
                {
                    var self = e.target || window.event.srcElement;
                    while (self.tagName != "DIV")
                    {
                        self = self.parentNode;
                    }
                    menu.evts[i].call(self.owner, e);
                });
            }
        },

        setStyleSheet = function (menuul)
        {
            var children = menuul.querySelectorAll(".child");
            for (var i = 0; i < children.length; i++)
            {
                children[i].style.left = children[i].parentNode.parentNode.offsetWidth + "px";
            }
        },

        disableContextMenu = function (e)
        {
            e = e || window.event;

            if (e.button == 2 && e.preventDefault)
                e.preventDefault();
            else
                e.returnValue = false;
        },

    /// <summary>reset all context menu css layout</summary>
    /// <param name="selectors" type="string">element selectors which wants to disable default context menu</param>
    /// <returns type="voild" />
        resetLayout = function (selectors)
        {
            utility.addStyleRule([
                {
                    selector: ".content_menu",
                    rules: "visibility: visible; display: none"
                },
                {
                    selector: ".content_menu .child",
                    rules: "display: none"
                }]);

            if (selectors instanceof Array)
            {
                selectors.push(".content_menu");
            }
            else
            {
                selectors = ".content_menu"
            }

            $(document).on("contextmenu", selectors.join(", "), disableContextMenu);
        };

    /// <summary>Build a context menu and reader on page</summary>
    /// <param name="selector" type="string">context menu call element selector</param>
    /// <param name="id" type="string">context menu id</param>
    /// <param name="option" type="object">override defaults</param>
    /// <returns type="voild" />
    function ContextMenu(selector, id, option)
    {
        if (!id || !selector || typeof id != "string")
            throw Error("Muse set an unique id for contentmenu and selector can not be empty");

        var settings = $.extend(true, {}, defaults, option);

        if (!settings.children.length)
            return;

        var contextMenuDOM = generatedContentMenu(settings.children, id, settings.richStyle),
            container = document.createElement("div");

        container.innerHTML = contextMenuDOM;
        var cmenu = container.firstChild;

        document.body.appendChild(cmenu);
        setStyleSheet(cmenu.firstChild);

        delete container;
        contextMenuDOM = "";

        /// <summary>show context menu</summary>
        /// <returns type="undefined" />
        this.show = function (e)
        {
            e = e || window.event;

            var targets = document.querySelectorAll(selector),
                selected = false,
                owner = e.target || e.srcElement || this;

            for (var i = 0; i < targets.length; i++)
            {
                if (targets[i] == owner)
                {
                    selected = true;
                    break;
                }
            }

            if (!selected)
                return;

            disableContextMenu(e);

            var location = {
                top: e.pageY || e.y,
                left: e.pageX || e.x
            }

            var allmenu = document.querySelectorAll(".content_menu");
            for (var i = 0; i < allmenu.length; i++)
            {
                allmenu[i].style.display = "none";
            }

            setTimeout(function ()
            {
                var self = document.getElementById(id);
                self.owner = owner;
                self.style.top = location.top + "px";
                self.style.left = location.left + "px";
                self.style.display = "block";
            }, 0);
        };

        if (!settings.disable)
        {
            $(document).on("contextmenu", selector, this.show);
        }

        $(document).bind("click", function (e)
        {
            e = e || window.event;
            var target = e.target || e.srcElement;

            if (e.button == 2)
                return;

            var contextmenu = document.querySelector("#" + id);
            if (!isChild(target, contextmenu))
                contextmenu.style.display = "none";
        });

        $(".content_menu a").bind("click", function (e)
        {
            e = e || window.event;
            e.preventDefault && e.preventDefault();

            var self = e.target || window.event.srcElement;
            while (!self.getAttribute("id"))
            {
                self = self.parentNode;
            }
            setTimeout(function ()
            {
                self.style.display = "none";
            }, 0);
        });
    }

    /// <summary>Create a contextmenu's child menuitem</summary>
    /// <param name="text" type="string">menuitem text</param>
    /// <param name="url" type="string">menuitem link url</param>
    /// <param name="sepline" type="bool">whether it is a seperated line</param>
    /// <param name="evts" type="object">menuitem self-bind events</param>
    /// <param name="bgimg" type="object">menuitem icon, before set this value please enable the richStyle of contextmenu</param>
    /// <returns type="voild" />
    function MenuItem(text, url, sepline, evts, bgimg)
    {
        var children = [],
            emptyStr = "";

        this.text = text;
        this.bgimg = bgimg;
        this.url = url || "#";
        this.seperateLine = !!sepline;
        this.evts = evts ? filterEventList(evts) : {};
        this.children = children;
        this.className = emptyStr;
        this.parents = 0;
        this.generatedHTML = function (className)
        {
            this.className += " " + className || emptyStr;
            this.className = this.className.trim();

            if (this.bgimg)
                return liBGgTemplate.format(className, this.url, this.text, this.bgimg);

            return liTemplate.format(className, this.url, this.text);
        }

        this.children.add = function (u)
        {
            if (u.seperateLine)
                throw Error("Seperate line can not have children")

            if (!(u instanceof MenuItem && isValid(u)))
                return false;

            ++u.parents;
            children.push(u);
            return true;
        }

        this.children.removeAt = function (index)
        {
            if (index < 0 || children[index] == undefined)
                return false;

            if (children[index].parents > 0)
                --children[index].parents;

            children.splice(index, 1);
            return true;
        }

        this.children.clear = function ()
        {
            while (children.length != 0)
            {
                var node = children.pop();
                if (node.parents > 0)
                    --node.parents;
            }
        }

        function isValid(item)
        {
            for (var i = 0; i < children.length; i++)
            {
                if (item.text.toLowerCase().trim() === children[i].text.toLowerCase().trim())
                {
                    return false;
                }
            }
            return true;
        }

        function filterEventList(evts)
        {
            if (!evts || typeof evts != "object")
                return;

            var reg = /^on/gi;

            for (var i in evts)
            {
                if (reg.test(i))
                {
                    var temp = evts[i];
                    delete evts[i];
                    evts[i.replace(reg, emptyStr)] = temp;
                }
            }
            return evts;
        }
    }

    return {
        contextMenu: ContextMenu,
        menuItem: MenuItem,
        ready: resetLayout
    };
});