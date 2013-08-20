function rMotion(paper) {
    // make sure we're instantiated, thx john resig
    if (!(this instanceof arguments.callee)) {
        return new arguments.callee(arguments);
    }

    var self = this;

    self.init = function() {
        self.paper = paper;
    }

    // create the circle and its components
    self.createCircle = function(xOffset, yOffset, radius, range, speed, color, text, imageurl, loadingurl, stringX, stringY) {
        self.xOffset = xOffset;
        self.yOffset = yOffset;
        self.radius = radius;
        self.range = range;
        self.speed = speed;
        self.color = color;
        self.text = text;
        self.imageurl = imageurl;
        self.stringX = stringX;
        self.stringY = stringY;

        // strings attach to a different point on background balloons
        if (self.text.length > 0) {
            self.string = self.paper.path("M" + self.stringX + "," + self.stringY + "L" + self.xOffset + "," + self.yOffset).attr({
                stroke: "rgba(0, 0, 0, 0.15)"
            });
        }
        else {
            self.string = self.paper.path("M" + self.stringX + "," + self.stringY + "L" + self.xOffset + "," + (self.yOffset + self.radius)).attr({
                stroke: "rgba(0, 0, 0, 0.15)"
            });
        }

        self.circle = self.paper.circle(self.xOffset, self.yOffset, 0).attr({
            fill: color,
            stroke: color,
            "stroke-width": 0
        });

        // only create text and image if this is actually a circle with an action
        if (self.text.length > 0) {
            self.label = self.paper.text(self.xOffset, self.yOffset, self.text).attr({
                "fill": "white",
                "font-size": 18,
                "font-family": "futura-pt, sans-serif"
            });

            // self.hoverImage = self.paper.image(self.imageurl, self.xOffset - self.radius, self.yOffset - self.radius, self.radius * 2, self.radius * 2).attr({ cursor: "pointer", opacity: 0,radius:40 });
            self.hoverImage = self.paper.circle(self.xOffset,self.yOffset,self.radius);
            self.hoverImage.attr({'fill':'url('+self.imageurl+')',cursor:"pointer"});

            self.loadingIcon = self.paper.image(loadingurl, 0, 0, 0, 0);
        }


        self.showCircle();
//      self.showCircle calls self.startAnimation as well; wasting cycles here
//        self.startAnimation();
    };

    //
    //
    //
    self.showCircle = function() {
        // set a random time for the circle to appear and start moving
        var delay = Math.floor(Math.random() * 700);

        // pop in with a cool effect
        var anim = Raphael.animation({r: self.radius}, 700, "elastic", function() {
            // don't bind events until the disc has fully appeared
            // keeps from accidentally mousing over bouncing balloons and causing them to stop
            // also don't bind at all if there is no text label (background circles)
            if (self.text.length > 0) {
                self.bindEvents();
                if (typeof self.cleanUp === "function") {
                    self.cleanUp();
                }
            }
        });
        self.circle.animate(anim.delay(delay));

        // start moving
        setTimeout( self.startAnimation, delay);
    }

    //
    // create event handlers
    //
    self.bindEvents = function() {
        // mouse over to stop
        // Note: these events shouldn't fire more than once; this was causing the
        //       issue of intermittent dissapearing text and some onclicks failing

        self.hoverImage.mouseover(self.stopAnimation);

        // mouse out to start
        self.hoverImage.mouseout(self.startAnimation);

        // click to load
        self.hoverImage.click(self.showLoading);
    }

    //
    // unbind events to keep from interrupting page load
    //
    self.unbindEvents = function() {
        self.hoverImage.unmouseover(self.stopAnimation);
        self.hoverImage.unmouseout(self.startAnimation);
        self.hoverImage.unclick(self.showLoading);
    }

    //
    // create the animation loop
    //
    self.startAnimation = function() {
        if (self.text.length > 0) {
            self.label.stop(); // in case the label is still animating while we mouse out
            self.hoverImage.stop();
            self.label.animate({ "font-size": 18 }, 100);
            self.hoverImage.animate({ opacity: 0 }, 200);
        }
        self.move();
        // why the hell are we starting 2 timers per circle
        if (self.animatotron) { clearInterval(self.animatotron); }
        self.animatotron = setInterval( self.move , self.speed - 500);
    }

    //
    // stop running animations, clear timers, pop up an image
    //
    self.stopAnimation = function() {
        if (self.text.length > 0) {
            self.label.stop();
            self.hoverImage.stop();
            self.label.animate({ "font-size": 1 }, 100);
            self.hoverImage.animate({ opacity: 1.0 }, 100);
        }
        self.string.stop();
        self.circle.stop();

        clearInterval(self.animatotron);
    }

    //
    // create a random vector within self.range and move at self.speed
    //
    self.move = function() {
        // random x and y (within the limits of self.range)
        var xRelative = Math.floor( Math.sqrt( Math.random() * (self.range * self.range) ) );
        var yRelative = Math.floor( Math.sqrt( (self.range * self.range) - (xRelative * xRelative) ) );


        var xDestination = (self.xOffset - (self.range / 2)) + xRelative;
        var yDestination = (self.yOffset - (self.range / 2)) + yRelative;


        // move the circle
        var circle_animation = Raphael.animation({
            cx: xDestination,
            cy: yDestination
        }, self.speed, "ease-in-out");

        self.circle.animate(circle_animation);

        // strings attach to a different point on background balloons
        if (self.text.length > 0) {
            self.string.animateWith(self.circle, circle_animation, {
                path: "M" + self.stringX + "," + self.stringY + "L" + xDestination + "," + yDestination
            }, self.speed, "ease-in-out");
        }
        else {
            self.string.animateWith(self.circle, circle_animation, {
                path: "M" + self.stringX + "," + self.stringY + "L" + xDestination + "," + (yDestination + self.radius)
            }, self.speed, "ease-in-out");
        }

        // move the label
        if (self.text.length > 0) {
            self.label.animateWith(self.circle, circle_animation, {
                x: xDestination,
                y: yDestination
            }, self.speed, "ease-in-out");
            /* self.hoverImage.animateWith(self.circle, circle_animation, {
             x: xDestination,
             y: yDestination
             }, self.speed, "ease-in-out");*/
            self.hoverImage.animate(circle_animation);
        }
    }

    self.showLoading = function() {
        self.unbindEvents();

        self.hoverImage.hide();
        self.label.hide();

        // show the loading icon
        self.loadingIcon.attr({
            height: 24,
            width: 24,
            x: self.circle.attr("cx") - 12,
            y: self.circle.attr("cy") - 12
        });

        self.circle.stop();
        clearInterval(self.animatotron);

        self.circle.animate({ r: 20 }, 250, function() {
            if (typeof self.clickHandler === "function") {
                self.clickHandler();
            }
        });
    }

    self.expand = function(callback) {
        self.unbindEvents(); // extra unbind since page-to-page loads don't trigger showLoading()
        self.loadingIcon.hide();
        self.circle.toFront();
        self.circle.animate({
            r: (window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight)
        }, 100, function() {
            if (typeof callback == "function") {
                callback();
            }
        });
    }

    self.reset = function(callback) {
        self.label.hide();

        // shrink the circle
        self.circle.toFront().animate({
            r: self.radius
        }, 150, function() {
            // done animating, let's put everything else back where it should be
            self.label.toFront().attr({ "font-size": 18}).show();
            self.hoverImage.toFront().attr({ opacity: 0 }).show();
            self.loadingIcon.toFront().attr({ height: 0, width: 0 }).show();

            // fix the events and start the animation again
            self.startAnimation();

            // hit the callback function if there is one
            if (typeof callback === "function") {
                callback();
            }
            self.bindEvents();
        });
    }

    self.click = function(action) {
        self.clickHandler = action;
    }

    self.setX = function(x, newStringX) {
        self.stopAnimation();

        self.xOffset = x;
        self.stringX = newStringX
        self.circle.attr({ cx: self.xOffset });
        self.string.attr({ path: "M" + self.stringX + "," + self.stringY + "L" + self.circle.attr("cx") + "," + (self.circle.attr("cy") + self.radius) });

        if (self.text.length > 0) {
            self.label.attr({ x: self.xOffset });
            self.hoverImage.attr({ x: self.xOffset - self.radius });
            self.loadingIcon.attr({ x: self.xOffset });
            self.string.attr({ path: "M" + self.stringX + "," + self.stringY + "L" + self.circle.attr("cx") + "," + self.circle.attr("cy") });
        }

        self.startAnimation();
    }

    self.init()
}

function createSVG(){
    if(typeof Raphael === 'undefined')
        return;
    var paper            = Raphael("paper", "100%", "100%"),

        SERIOUSBALLOONS  = {
            "about-us"       : new rMotion(paper),
            "Blog"           : new rMotion(paper),
            "news"           : new rMotion(paper),
            "chat"           : new rMotion(paper),
            "runjs"          : new rMotion(paper),
            odd1             : new rMotion(paper),
            odd2             : new rMotion(paper),
            odd3             : new rMotion(paper),
            odd4             : new rMotion(paper),
            odd5             : new rMotion(paper)
        },
        $obj = {};

    var offsetWidth = ($("#paper").width() - 940) / 2;

    SERIOUSBALLOONS.odd1.createCircle(offsetWidth + 175, 385, 85, 150, 10000, "rgba(0, 0, 0, 0.15)", "", "", "", offsetWidth + 345, 635);
    SERIOUSBALLOONS.odd2.createCircle(offsetWidth + 280, 230, 40, 150, 10000, "rgba(0, 0, 0, 0.15)", "", "", "", offsetWidth + 425, 635);
    SERIOUSBALLOONS.odd3.createCircle(offsetWidth + 485, 245, 115, 150, 10000, "rgba(0, 0, 0, 0.15)", "", "", "", offsetWidth + 480, 640);
    SERIOUSBALLOONS.odd4.createCircle(offsetWidth + 500, 480, 50, 150, 10000, "rgba(0, 0, 0, 0.15)", "", "", "", offsetWidth + 480, 640);
    SERIOUSBALLOONS.odd5.createCircle(offsetWidth + 735, 385, 65, 150, 10000, "rgba(0, 0, 0, 0.15)", "", "", "", offsetWidth + 595, 650);

    SERIOUSBALLOONS["about-us"].createCircle(offsetWidth + 240, 470, 88, 100, 5000, "#e95325", "ABOUT US", "assets/about.jpg", "assets/about.jpg", offsetWidth + 345, 635);
    SERIOUSBALLOONS["Blog"].createCircle(offsetWidth + 375, 275, 115, 100, 6000, "#1b8abe", "Blog", "assets/blog.jpg", "assets/blog.jpg", offsetWidth + 425, 635);
    SERIOUSBALLOONS["news"].createCircle(offsetWidth + 595, 345, 95, 100, 5500, "#ef5fa3", "NEWS", "assets/read.jpg", "assets/read.jpg", offsetWidth + 480, 640);
    SERIOUSBALLOONS["chat"].createCircle(offsetWidth + 720, 510, 80, 100, 5000, "#4ba93c", "Chat", "assets/chat.jpg", "assets/chat.jpg", offsetWidth + 595, 650);
    SERIOUSBALLOONS["runjs"].createCircle(offsetWidth + 480, 460, 80, 100, 5000, "#161a1b", "RunJS", "assets/runjs.png", "assets/runjs.png", offsetWidth + 480, 640);

    seriousLogo = paper.image("assets/mainLogo.png", offsetWidth + 310, 630, 300, 52);

    SERIOUSBALLOONS["about-us"].click(function() {
        //    history.pushState({ url: "/about-us/", pagename: "about-us" }, "about us", "/about-us/");
        //    SERIOUS.navigation.loadPage( "/about-us/", "about-us");
        location.href = '/about';
    });
    SERIOUSBALLOONS["Blog"].click(function() {
        //     SERIOUS.navigation.loadPage( "/admin/", "our-work");
        //    history.pushState({ url: "/admin/", pagename: "our-work" }, "our work", "/our-work/");
        location.href = '/articles';
    });
    SERIOUSBALLOONS["news"].click(function() {
        //   SERIOUS.navigation.loadPage( "/feeds/", "news-and-notes");
        //  history.pushState({ url: "/feeds/", pagename: "news-and-notes" }, "news and notes", "/news-and-notes/");
        location.href = '/feeds';
    });
    SERIOUSBALLOONS["chat"].click(function() {
        //    SERIOUS.navigation.loadPage( "/reach-out/", "reach-out");
        //    history.pushState({ url: "/reach-out/", pagename: "reach-out" }, "reach out", "/reach-out/");
        location.href = '/chat';
    });
    SERIOUSBALLOONS["runjs"].click(function() {
        location.href = '/lab';
    });
}

$(function(){
    createSVG();
})


