/*! Snowflakes | © 2017 Denis Seleznev | MIT License | https://github.com/hcodes/snowflakes/ */
(function(global, factory) {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        global.Snowflakes = factory();
    }
}(this, function() {
    'use strict';

    var CSS = '.snowflakes_paused .snowflake,.snowflakes_paused .snowflake__inner,.snowflakes_paused .snowflake__inner:before{-webkit-animation-play-state:paused;animation-play-state:paused}.snowflakes_body{position:fixed;left:0;top:0;width:100%}.snowflake{position:absolute;margin:-21px 0 0;width:18px;height:18px;-webkit-animation:snowflake_y 10s infinite linear;animation:snowflake_y 10s infinite linear;will-change:transform}.snowflake__inner{position:absolute;left:0;right:0;top:0;bottom:0;-webkit-animation:snowflake_x 1s infinite alternate ease-in-out;animation:snowflake_x 1s infinite alternate ease-in-out;will-change:transform}.snowflake__inner:before{position:absolute;left:0;right:0;top:0;bottom:0;content:\'\';background-size:100% 100%}.snowflake__inner_use-rotate:before{-webkit-animation:snowflake_rotate 2s infinite linear;animation:snowflake_rotate 2s infinite linear;will-change:transform}.snowflake__inner_use-rotate-reverse:before{-webkit-animation:snowflake_rotate-reverse 2s infinite linear;animation:snowflake_rotate-reverse 2s infinite linear;will-change:transform}.snowflake__inner_num_0:before{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAB+UlEQVR4AdVTA7DdSgC9/9e2bWNc225HtW3btm3btm1f28/J3Y0zaU4xeh6/mEd71pBxFi+nZv8Qr5R+G68M/RivFP2ZIGdOF4CLqHmOeYX953zi4tNeYeViEzH+uz7jE3alGeh2WBrf7A2jzf5BHx1w8fMPu4UjW+3cjInfyLt2bxntbZzSJ0UA2LjoF9fip90Obtn4b+TLQiP51PB1Ajf7J32r3xv3Ovmxy8x08bWgNP96UCyQJJCFqDXnGYljnYWeXGOhb1ZZ6PmhnyPPOr1j7ZO+k1v6s5t4vtBErqy30o92opZIEuhuSKpzyS+ORT6GZ3HakE8Ra5+PrGexkTxr/ZbxYK/+Ml476hHWQZmHqpWSBNrl5M5N+U5e6vtDnGFl0KeIv/N75jcoduQGdVCabPD7XPxr2AAI7OHHHh/YIAKGMgDvdvAnkB3UXQqI15IEehErN9ZHbMhiI91heBKnjfgS+QFgBP1PEZ5jIGDNyqr1kwMqhzBXmukVfajdsKFb+KBb+wYr/+wi9E027n6yo4bw4BuMF3zinBk/yAf8iOBn/KBfcX/WK4xG2KgJ2p5sl74xai6A9PrAxPX/xN5eY+FWHnLxF9AdKINS2E9Ts1FM/ef7YAU7SomGoxYnPcIjzMF0zTdIR7eexMhz9XNl3OO5IcMsvwAC9cNmQgGkFwAAAABJRU5ErkJggg==)}.snowflake__inner_num_1:before{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAACSElEQVR4Ab1UA5BcQRSMbdu2U4jNQmzbZiG2C7Ft27a9tr3ff2aT6di8u1k/9EP3bKIEOT7lTf77QfLcwtOif51sFWiql1GS4kGQ5NBzpO01n3rOKsRa6zma+0VITQb/HwEBgHXQkXWS706AdN5hkS6eciu9AQRA+H+arOVofbsYK4eXiaPpWRfjWcIqljhoq1Vax4CG4fd1nzodQBqOlkHswyBt/BXQqwgdc8ajvD7qlFdgnBdhOod9P/MiQrdut0q3Md5Rh3zlXoAsRFcH7fKQUy7lLuK+2wszDtxikU5tMIsrUJ2N9HS+hrehwDKd4NlskTSwn3Yrs1jcYXSt42mWr4CwxLtBUg07ue4nmzaaxHcdTHrBhUY/48iIp5wDnaHQRY+y63WUdGcrqA1SvlvwGZdSjFVbu8sq7V1rEm+hi54Po+rM17wBn3M1vIIu4WdjLUQ8CPgKCIbdNqnqAbu8GbMDZLGGf9XxfiSGZABNfcl5MSr8KMg+a173qwW/AkKLEN2H0ebssspnAICx2t+PRIY8jlqxfEjhWkBdjtFuB0hJrOQroKdhmhbOzWZpJ+hmizy83yY5MRZ2xboxABj7O+SQVyEG5HwnTiNPe1/yKg6MhgDQvt4kXgHtWDKAAQQ7K9gCzCL+aYhO+QoISoY+wAT2hfGQDLoPOuT9jNEJ6AY6ghiZgKsjHg0g/7ujiZIkH8dE8J0g6QPKsTsoGd1CO9/t5kcHQLgmuPmoiB0BGL9hx+uf/0a0EVoJv//5YFRcXHT5u9i3dNhneobshdsAAAAASUVORK5CYII=)}.snowflake__inner_num_2:before{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAACZUlEQVR4AWKgC7j++Q/bKUDt1BQYWRYFe+3P5e/atjW2bds2Ytu2bdu27aT1jPTcGtuTtA6qjuoppTVeXVxCo1ZaXqcSn30ggpwRcWvKkDi/m5FfDOzh7D/KU+qi+3kr2OlD4oaiMWnxfRGF9fKeAANYrJS+m1Ck1iUNCJ9Xq+VX4E8YEIzvCG7WyF8R0IFmSv4bI+2uofKi+4Vj5i3Mf4rMsYtE6IrYKYi30/LqapV8pJcd/+wGovBefssfhWodIUhrpeS3C8ekWejEuIn2Qxfe3ZwL4tmj4jTE99dSpYhjDTcQdTHyL/btTPDiMk3XO7nKcY9OzvNUA1Vv3crEbaumKl072CzYhNgLxGsrtR2enZw/cLcdsYOSX9tZQ8UjGd1hH84dbAH2dqiOLoJ/fy3tj/3dlsCihTE9VU/bunWyVo7trLtVKxOp10hHBnRzwaT9SCKBSP0mOsShjUlC5yRHH/mGTYzeDUTnm+iUNRXa0l3VVAS+QeLQxvoClD4kBIT38aGwD9XS6esrtbXIwzdwNxBdabVJKz1Nqp79Ml/VhVFA4NvNFeJiKPBvkVpFujO+XrQ3EOHsaJMkZyuyx3QgwW6wUEgBo5J3Hn4jvqxck0BsG+BuIEoZEk7gnFNL1NURffy/5Ur5/+8LVDroBmfHCJOL1FzuqPhrQA8/DdeFH1q6gShvVPwrd1TSg35ggwAagiDRAQjgw8UQb9DIexIHBWf47/aIGOHMkAJ51r69/Ii8V6aU3oAfiscu74S/YUxydj0cgFQ9BzB8sLEX/25ur+JB/gAEwdlGuo1oaT9sxZP+uwCFuzKrma+YxAAAAABJRU5ErkJggg==)}.snowflake__inner_num_3:before{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAACaElEQVR4AZ2TQ6AeQRCEJ7Z9iS+xLzFPsW3btm3btm3bybPfb6+drtg67I5rur7uYaz/yF9+jwJ66r7RQiv0//j9bnFakrKJPeFDm5za6P8WOu83mrFXoq1ztOSiNv6S36j8z0LzktVGvWPlDRBgjzmL2rfdY6RVHaOl+r8Uuhs0Mw2JlWZWixCnzU9S5kxJVBayGwGL3QslrLZrLdhDToYwu0Vzd4LmkmT1/b4a4eISEv9i+ZrfyMueCVqeMCGJPeCsBcnK1paR4g66/dJup1amQrjwltri7I0UNTZBXkGXXoA47Xcj4m+sXfAbPQiqBBskmnzKp1cDoxNefeCYeHnSw6DZF4w2OLQuEKG9JnvGu2/4zQbfCD3njSoTE5TtBHZx40hpDnst3pmbpIwkuzHtIsUwsnBnebI6niJ4CDtNo6SNK2zq9kjBKPYDbCyCyyG33me1Xa0HARLUcXv2t5IBq2S7EkqBwAa2u7RBP80acdkDoIAJyCXDhKcQIisWhGh89rRPr43aQjIQ8Q9Cr3ijACLa4dI2Do+TOxDYvUPj5K0QINhc40gxCelHEsCOsnYQmQ7jjSzfCCECwIYNZA5itKkGSgEHiMcCSkAh8MP6J9gvQmb5z0IbHWoOTMIKux+yEAkyRZzWIe00fw/thHj5MNnpXSlMuIlLKf0xOPNZ6IVg5GwQIR4HTNQIBD4VJKDjrQHyp4LEOtk8XjtSvASrP30iEI0SjfSwA7iIBlZwiMCfXZyk9MM69v31o11v1zogGsCGdUT1X6//Gaen7BkjnWFPOB+eBsb/JYQvRjJLo+I/VfDvvneifIkJL9nhtAAAAABJRU5ErkJggg==)}.snowflake__inner_num_4:before{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAACjklEQVR4AWKgOQDUUg5gkitRFH5vbdu2bdu2bdu2bdu2rbHtaXfsZLJ1Pq/d7tSt/+KcSgRv5L0Yr8xdHSpcuGNTJzhVs+AvQ6J5I2OsYBR/bNdG1X1Di/j2oPQCNyxK1p+qAN9XEtVug724hNNx8nQ/2pg3P4iPf+rU5t20qjMHe7GOHeF8D8R5UnquLyBn4+XqB6OlBaSShqSNoc3fMbEAXbco2whUOx4nHzgXJ4/B9RdObXysaNQj6yPvWdWKn4DI4swyryhzR6S0D5kBJu/DmM1/T93mdYu64EqisuelS6v/0qkt3RYh7kA8SbT8ExA2HIuV1w/z5jxGeHPGomD+KjIfjpYukirotaHCLcBWhQhXsY64vVHSaiT9BOTHGOnRFsqfGcAH/vfcbU7w44N6erAsZtTNg5WG+3DRuD7Jj4/ZFyWNC+ONmtj3CciLMlrOChDCSckz0TtaJJXYz8TJ5x/b1TN7IsV7qGxdmLgfkHmBwgSS0AP7PgG9detdEDgzQDgN0KEYaVtvDzYJQyYtXwUY//FNQP3Whwqn2r5j5Ad2recnoDjRSAP6tUS1H+aAatAWFCNVvsI32iv+iqIXBfG3oWwIp7cL4vRUn4BAxuLGUCEYmeEXKEI2vUHmJcF8EKyAuWEdY0D8O7fe9wvVGr1lTKj10qUfIYNsio04IpAfHiN22I0B37Gq61F1zTe0CaN+Anru0jrAG2gPWXC+IC+qavWOMTErGHSqP/8IsVB4ebCw6Uy80uELd4fyRjnMCucKZoMVXri1rXMCefqBXV0Ez+R7SSVdTlDGhXJ6MmLOwt89cwiCs8NYowoZ6EAM+R2lD8N/0lbt37qNXEpQ1hEDvsd8PrmN/MvHR0IaU2gVzIibAAAAAElFTkSuQmCC)}.snowflake__inner_num_5:before{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAACm0lEQVR4Ab1TA7CkTQzc3zaOpbNt27Zt27Zt2zaebXNtPaw+4+1Nl8++qZoaJZ10J6P4IiPdLS+ZkOLz6Gh59Ps7e+RfogrEVgFOsf9dG79HEV7ox3rXJow4rGWbZ/uk71/rrPRJX2OF0QkDu2dsqk+/IJNWz8+ksgAyI50yYD8y2Zt3ycRtyHKL38IH8zmgnWqmHWjEFkq9pqVT2RdN3Hgy5wJM5ZVrAeSKiZv0yC5sXZRFx8UVSoMDnMIKZPgc0DYVnQQKcOyV6LVdNnMH92qYB4e07HkEOW3gLpI15KaVvz44yWuEXclIV9FRPRvzHBDEXJtLay+Z+CckasPNSvrBBSMXDMfQfHEJVsw9GuZ2ZIHY9LyJi92upHNyfdLw54DweNfKh7WN8zihwS0r3/aqmV8FujleeU5CobSViL0svEDstkvNbO+T6CkkwHef2IVyzwGRSPPnZ9Jp9+3C/C0q5ihoRRZIGyxsUTWAQifog3tidxF6jU72qR45hOfbApValU2Fx7mkMViJHgGPHcI6AAQ7xQlKSq5Cqrd2vZIOwITYszOoqENaZu1zQMkuuT00QZTDOvbkaSM7GlSyPPIGDSX1xQpg9NJWJX2hS7xXQ+zTSVHqPgcU75LqoQIn9WyAkZbLErCNqBTJ4gn0wXrGyN0mc2uiSypNpMD+EWmXis8BgbsitNC/NJsyoxlvWPjToIDsUH5SgKugTAJdJ32WCjvYoz2eAyKOW+CEUhMjLagd0bFTVmRTMciWtEMsGhSCoyigfcrAncb60hfRU/JvSS7p/1np1C0ISb5FPLIj+kzEivOYFF8iNFLT8t8aSi6Bf6l43YDRkix6GvrorIk7Vj/G7QdV6IP7553fcYBqpSiXn9BboPhS4xmjIGYLrJ829AAAAABJRU5ErkJggg==)}.snowflake__inner_num_6:before{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAChklEQVR4AbVTA7AdARCrRrVt27Zt27Zt27Zt27a/8Wyf0XZTP8wftWfsZZNsLtF/WyJ9ShID/6XkWaPY4INHTYH7/VphBd69dimZ8TyGUbPheYJAUYxaCUA3rXKn5VHcjrXR3KpxH5nHC8LZ1dgfO+S6z5xKEewJAu3T8v2umqUqD+3yiG2xfK2RH5h3lZ66vy6LZC9fN0ulnruU/nh+wST1DgmAItCdG8ZueuSQ8/R545PnhjEPzhul7htj+e1njVL7fm98UZM+MZ9RC7mf3XIyXPsBQcr6GO7c5E9s9F6NsG9rLLdgTTR3c3scP/yYXthC7ybRs+tHdcJiArk6+gOj2RbH73njUhsFmbwyin1d7amb2xrLH9JyanWcIWFPPH8KjACgZdUCs8OYp6jbpxGOBEm7YBLXwx8Uw6Md8fxTFMJUYrTnlUvJCUZgB8OJ2YkjOmEQTXGrHxD5UmP6Z3YkdXtzQi/O3RXPz3zuVLrNCGP0tNvmhjNhGD1J3HjJLE3CJMGSplzPDwidYSppf7EhhrsMduhM98adcbx30if2PWrIlyUrItn9g975PuE6KAbo9IsyXtL9Y8ig67YwHZ1hLppEedWykA2GyFng+AvCbBq7ASZDFvRHMmpxNMF7+IcpUaaeoQ6gSL8fENggN51eeb1gcFQvtqTzXYBcs0g7IAfxgC8Aav/KyxPwObALyhEmg9+CABo2e+4RAIzAwXxMklIe1vyFNwbv4SdYQnrIhCN4+Hi3hl8PwzHFBs89bjpfQcrhG+0VMPrAb4Mk4seFkUj3mI/MlRYvPR9mhzPn0AQxeeFSKgZICl7iGTUVgJBodL5oEtNhMvivIAmskO4gk//V8g3xiHr6hg5awwAAAABJRU5ErkJggg==)}.snowflake__inner_num_7:before{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAACPklEQVR4Ab1TA7AcQRC9YlRKyhXbViG2bdu2bdu2bdtfZ9ufuzuze8xlXlXK35rjTHe/7vf2jaxYlp1Gq5+1Smv0JFovz8VPPMGyN52B5g4xWvKURRq1WkOcT72hpdi/8oYaKrhomVwBPfaExg2P4/9edwQWP3CHBk1OEqz4/ZISnv3/fGq2ACfNUlt0/J0eadHrN29apqLGPQYaPyiOl9ZpyI85CpI0II736IRIL5ZXA/mZAs1TENt2Pb0DOrv19BqjZGZn7nM26RB+ZyUJjg0a8vljSnjVIZP4EPtMgTbr6IZJicLnzr84/1IVUe83ih/OW6U3W/X0DRP8E9u/wTkmZHlxyM8UKCUUq/jCF5rIgDLYRJdA57hFvD0tUeAAyPYJR8zSKTSCfkYaLZcpEAoXKsk71jVuqYrKodEKNclYpabRDVoiYA8waMXyviE/U6CR8bwdH6bHb4i8U09/AoAVRfCLPT6IIw/CZwpk4KNNHrlDoyAiREdn6ISpTlulH5johFm6Oj5BcIFalia94Qz2YZSuQ8wVavrrsEl8dskeeAiq7PcFdAKd3n+42HwleX7ESIZkCoRO4L5TL25jBc8366gZFjhpkbZjGnwYRQ1z/XloNSiOS8sUCO594Q21/pkWqQ0bwFcohh64JvASXG4g0Y7s0xJ+y9bh7/3had1+cbHHnuBmXIehcTx/0S5NvO0Mbmj5IyMGfWS5WV9Tw5UhOnyFKWFC5q85cemRCpgCcVleFyjgCeJByIpr/QPGtwVeeMoGzwAAAABJRU5ErkJggg==)}.snowflake__inner_num_8:before{background-image:url(8.png)}@-webkit-keyframes snowflake_y{from{-webkit-transform:translateY(0px);transform:translateY(0px)}to{-webkit-transform:translateY(103vh);transform:translateY(103vh)}}@keyframes snowflake_y{from{-webkit-transform:translateY(0px);transform:translateY(0px)}to{-webkit-transform:translateY(103vh);transform:translateY(103vh)}}@-webkit-keyframes snowflake_x{from{-webkit-transform:translateX(0px);transform:translateX(0px)}to{-webkit-transform:translateX(50px);transform:translateX(50px)}}@keyframes snowflake_x{from{-webkit-transform:translateX(0px);transform:translateX(0px)}to{-webkit-transform:translateX(50px);transform:translateX(50px)}}@-webkit-keyframes snowflake_rotate{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes snowflake_rotate{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes snowflake_rotate-reverse{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(-360deg);transform:rotate(-360deg)}}@keyframes snowflake_rotate-reverse{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(-360deg);transform:rotate(-360deg)}}';

    function Flakes(params) {
        this._addStyle();

        if (this instanceof Flakes) {
            params = params || {};
            this.params = {
                container: params.container || document.body,
                count: params.count || 50,
                speed: params.speed || 1,
                zIndex: params.zIndex || 9999,
                useRotate: typeof params.useRotate === 'undefined' ? true : params.useRotate,
                useScale: typeof params.useScale === 'undefined' ? true : params.useScale,
                width: params.width,
                height: params.height
            };

            this._flakes = [];
            this._isBody = this.params.container === document.body;

            var container = document.createElement('div');
            container.classList.add('snowflakes');
            this.setStyle(container, { zIndex: this.params.zIndex });

            this._isBody && container.classList.add('snowflakes_body');

            this.params.container.appendChild(container);
            this._container = container;

            for (var i = 0; i < this.params.count; i++) {
                this._flakes.push(this.createFlake());
            }
        } else {
            return new Flakes(params);
        }
    }

    Flakes.prototype = {
        flakeSize: 18,
        flakeMinSize: 8,
        flakeMinOpacity: 0.6,
        flakeCount: 8,
        /**
         * Start CSS animation.
         */
        start: function() {
            this._container.classList.remove('snowflakes_paused');
        },
        /**
         * Stop CSS animation.
         */
        stop: function() {
            this._container.classList.add('snowflakes_paused');
        },
        /**
         * Create flake.
         *
         * @returns {DOMElement}}
         */
        createFlake: function() {
            var flake = document.createElement('div'),
                innerFlake = document.createElement('div'),
                useScale = this.params.useScale,
                size = (useScale ? this.getRandom(this.flakeMinSize, this.flakeSize) : this.flakeSize),
                props = {
                    animationDelay: (Math.random() * 10) + 's',
                    left: (Math.random() * 100) + '%',
                    width: size + 'px',
                    height: size + 'px'
                };

            if (useScale) {
                props.zIndex = this.params.zIndex + size * 10;
                props.opacity = useScale ?
                    this.interpolation(
                        size,
                        this.flakeMinSize,
                        this.flakeSize,
                        this.flakeMinOpacity,
                        1) :
                    1;
            }

            flake.classList.add('snowflake');
            this.setStyle(flake, props);

            innerFlake.classList.add('snowflake__inner');
            innerFlake.classList.add('snowflake__inner_num_' + this.getRandom(0, this.flakeCount));

            if (this.params.useRotate) {
                innerFlake.classList.add('snowflake__inner_use-rotate' + (Math.random() > 0.5 ? '' : '-reverse'));
            }

            this.setStyle(innerFlake, {
                animationDelay: Math.random() + 's'
            });

            flake.appendChild(innerFlake);
            this._container.appendChild(flake);

            return flake;
        },
        /**
         * Get random number.
         *
         * @param {number} from
         * @param {number} max
         *
         * @returns {number}
         */
        getRandom: function(from, max) {
            return from + Math.floor(Math.random() * (max - from));
        },
        /**
         * Linear interpolation.
         *
         * @param {number} x
         * @param {number} x1
         * @param {number} x2
         * @param {number} y1
         * @param {number} y2
         *
         * @returns {number}
         */
        interpolation: function(x, x1, x2, y1, y2) {
            return y1 + (y2 - y1) * (x - x1) / (x2 - x1);
        },
        /**
         * Set inline style.
         *
         * @param {DOMElement} dom
         * @param {Object} props
         *
         * @returns {this}
         */
        setStyle: function(dom, props) {
            Object.keys(props).forEach(function(key) {
                dom.style[key] = props[key];
            }, this);

            return this;
        },
        /**
         * Destroy flakes.
         */
        destroy: function() {
            this._container && this._container.parentNode.removeChild(this._container);
            delete this._container;
            delete this._flakes;

            this._removeStyle();
        },
        _addStyle: function() {
            if (!Flakes._styleNode) {
                Flakes._styleNode = this._injectStyle(CSS);
                Flakes._count = (Flakes._count || 0) + 1;
            }
        },
        _injectStyle: function(style) {
            var styleNode = document.createElement('style');
            document.body.appendChild(styleNode);

            if (styleNode.styleSheet) { // IE
                styleNode.styleSheet.cssText = style;
            } else if ('textContent' in styleNode) {
                styleNode.textContent = style;
            } else {
                styleNode.innerHTML = style;
            }

            return styleNode;
        },
        _removeStyle: function() {
            Flakes._count--;
            if (Flakes._count <= 0) {
                Flakes._count = 0;
                if (Flakes._styleNode && Flakes._styleNode.parentNode) {
                    Flakes._styleNode.parentNode.removeChild(Flakes._styleNode);
                    delete Flakes._styleNode;
                }
            }
        },
        _height: function() {
            var p = this.params;

            return p.height || (this._isBody ? this._winHeight() : p.container.offsetHeight + this.flakeSize);
        },
        _winHeight: function() {
            var height,
                body = document.body,
                docElement = document.documentElement;

            if (window.innerHeight) {
                height = window.innerHeight;
            } else if (docElement && docElement.clientHeight) {
                height = docElement.clientHeight;
            } else if (body) {
                height = body.clientHeight;
            }

            return height;
        }
    };

    return Flakes;
}));
