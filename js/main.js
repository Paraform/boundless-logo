/* Boundless Logo v0.9.81 */

(function () {
    'use strict';

    /* Setup SVG */

    var size = 400,
        tau = Math.PI * 2,
        pi = Math.PI;

    var svg = d3.select('.logo')
    .attr('viewBox', [0, 0, size, size])

    svg = svg.append('g')
        .attr('transform', 'translate(' + [size/2, size/2] + ')')


    /* Setup Line */

    var line = d3.radialLine()
    var boundless = svg.append('path').style('stroke', '#fff').style("stroke-linecap", "round")

    function render(date) {

        /* Get time */

        var ms = date.getMilliseconds(),
            s = date.getSeconds(),
            m = date.getMinutes(),
            h = date.getHours(),
            d = date.getDate(),
            y = date.getFullYear();

        function deciSeconds(dt) {
            return Math.floor((date.getTime())/50);
        }

        /* Map time to a range */

        function map_range(value, low1, high1, low2, high2) {
            return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
        }

        var millisecondsForward = map_range(ms, 0 , 999, 120, 0),
            millisecondsReverse = map_range(ms, 0, 999, 0, 120),
            secondsForward = map_range(s + 120, 120, 179, 120, 0),
            secondsReverse = map_range(s + 120, 120, 179, 0, 120),
            minutesForward = map_range(m + 120, 120, 179, 120, 0),
            minutesReverse = map_range(m + 120, 120, 179, 0, 120),
            hoursForward = map_range(h + 120, 120, 143, 120, 0),
            hoursReverse = map_range(h + 120, 120, 143, 0, 120),
            daysForward = map_range(d + 120, 121, 151, 120, 0),
            daysReverse = map_range(d + 120, 121, 151, 0, 120),


            milliseconds = map_range(ms, 0, 999, millisecondsForward, millisecondsReverse),
            seconds = map_range(s, 0, 59, secondsForward, secondsReverse),
            secondsMinutes = map_range(s + m, 0, 118, -secondsForward, -secondsReverse),
            minutes = map_range(m, 0, 59, minutesForward, minutesReverse),
            hours = map_range(h, 0, 23, minutesForward, minutesReverse),
            days = map_range(d, 1, 31, minutesForward, minutesReverse),
            hide = 0;

        /* x points */
                                                 /* pi -- speed of rotation */  /* y + number offset */
        var x1 = map_range(deciSeconds(), 0, 59, 0, pi) + y + 200,
            x2 = map_range(deciSeconds(), 0, 59, 0, - pi) + y + 700,
            x3 = map_range(deciSeconds(), 0, 59, 0, pi) + y + 500,
            x4 = map_range(deciSeconds(), 0, 59, 0, - pi) + y,
            x5 = map_range(deciSeconds(), 0, 59, 0, pi) + y + 300,
            x6 = map_range(deciSeconds(), 0, 59, 0, -pi) + y + 800,
            x7 = map_range(deciSeconds(), 0, 59, 0, pi) + y,
            x8 = map_range(deciSeconds(), 0, 59, 0, -pi) + y + 400,
            x9 = map_range(deciSeconds(), 0, 59, 0, pi) + y + 100,
           x10 = map_range(deciSeconds(), 0, 59, 0, -pi) + y + 900;


        /* y points */
                                                          /* 9 -- speed to cross */    /* var -- radius */
        var y1 = Math.sin(map_range(deciSeconds(), 0, 59, 0, 3))                       * (milliseconds),
            y2 = Math.cos(map_range(deciSeconds(), 0, 59, 0, 5))                       * (seconds),
            y3 = Math.sin(map_range(deciSeconds(), 0, 59, 0, 5))                       * (secondsMinutes),
            y4 = Math.cos(map_range(deciSeconds(), 0, 59, 0, 5))                       * (minutes),
            y5 = Math.sin(map_range(deciSeconds(), 0, 59, 0, 5))                       * (hours),
            y6 = Math.cos(map_range(deciSeconds(), 0, 59, 0, 3))                       * (milliseconds),
            y7 = Math.sin(map_range(deciSeconds(), 0, 59, 0, 5))                       * (minutes),
            y8 = Math.cos(map_range(deciSeconds(), 0, 59, 0, 5))                       * (days),
            y9 = Math.sin(map_range(deciSeconds(), 0, 59, 0, 5))                       * (seconds),
           y10 = Math.cos(map_range(deciSeconds(), 0, 59, 0, 5))                       * (secondsMinutes);

        /* Draw Points */

        var data = [

            [x1, y1],
            [x2, y2],
            [x3, y3],
            [x4, y4],
            [x5, y5],
            [x6, y6],
            [x7, y7],
            [x8, y8],
            [x9, y9],
            [x10, y10]

        ]

        /* Append Line */

        boundless.datum(data).attr('d', line.curve(d3.curveCatmullRomClosed.alpha(0)))
    }

    /* Render */

    function tick() {
        var now = new Date()
        render(now)
    }

    d3.timer(tick)

})()

/* Show current time */

var span = document.getElementById('span');

function time() {
    var t = new Date();
    var ms = t.getMilliseconds();
    var s = t.getSeconds();
    var m = t.getMinutes();
    var h = t.getHours();
    var d = t.getDate();
    var y = t.getFullYear();

    span.textContent = ms + ":" + s + ":" + m + ":" + h + ":" + d + ":" + y;
}

setInterval(time, 1);
