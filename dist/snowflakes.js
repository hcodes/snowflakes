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

    var CSS = '.snowflakes_paused,.snowflakes_paused .snowflake__inner,.snowflakes_paused .snowflake__inner:before{-webkit-animation-play-state:paused;animation-play-state:paused}.snowflakes_body{position:fixed;left:0;top:0;width:100%}.snowflake{position:absolute;margin:-21px 0 0;width:18px;height:18px;-webkit-animation:snowflake_y 10s infinite linear;animation:snowflake_y 10s infinite linear;will-change:transform}.snowflake__inner{position:absolute;left:0;right:0;top:0;bottom:0;-webkit-animation:snowflake_x 1s infinite ease-in-out;animation:snowflake_x 1s infinite ease-in-out;-webkit-animation-direction:alternate;animation-direction:alternate;will-change:transform}.snowflake__inner:before{position:absolute;left:0;right:0;top:0;bottom:0;content:\'\';background-size:100% 100%;-webkit-animation:snowflake_rotate 2s infinite linear;animation:snowflake_rotate 2s infinite linear;will-change:transform}.snowflake__inner_use-rotate:before{-webkit-animation-name:snowflake_rotate;animation-name:snowflake_rotate}.snowflake__inner_use-rotate-reverse:before{-webkit-animation-name:snowflake_rotate-reverse;animation-name:snowflake_rotate-reverse}.snowflake__inner_num_0:before{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAspJREFUOI3Nk1tIVEEYx7+ZObddd4/tKi6ubkpkEZZYiBRBEnSDLlB0JSJKioqIKOxiLxHVQ9uViIKIHiIEe60gIioqtUgLsciKVFg1LV0ve3bP2TMzX0+K5dKz/6c/8w1/fv9vGICpJjJmFu0/8teg/lLU6HcwVwCsUAAeGgQHq08e5xPvNN68PO6Vf5ProlH/q7h7pWmQxwSi9sXi60t96nSBqB0+dT5w9Vzt/kxE9N+DL5bYebvHqW4e5lWWwGSxR3nX6wirYYgvv9Pj7Lt27sK2/1ZrjvPCrqQ4FLPFL42A2WbJdUEF5NNhPrvKVNsSAv1lPna9Ly3zyk2VE8Aba/L1+CQiv0rM5hF3oyNw/jDHFQU6+RZzMBFgtDclcSCik464K3e6iPPbE+6GOX7FmEg0vqPOhGAVpnoxIXHBjs5k5S6fGrQR9Uof7Xo1KkrbkgDdXEZqCz0XbYFPVALejNVudiQffLVkAQDYAGC4CIFRjuZvIcN5jH4HAAhpNJZCtEc5+lbmqm1bCo3xxY9XUwiJtKdkCACMsEY6LY7KsETqSgAbUc9SCC/20B6BEO5KyyKNksKMRG8G3MWjHGc1DboVp/udA3umqZ+702iUZbGBPkcGAADujrgzb0WMs5SQ3qU5WkOJyT5mCip6PZCuFwg/f6ax3EvJj35Xmn1caiGFDmUrhLkIgYhOOjRKtJIstinjq0UMqhR7WUtQJa1VAfWWADS9jHgfpcTcHJVmKwT0JdOUa/kG+1TkYS1hg6kTq7Ex0xRPxHevXvXCFrDgfp9d40j4VuJhz7cH1V8O4ssPlpiX4LCsPFt5cP7MyejjZ0+t2PtGmEQEALD3RI1VnMXurc3RWjbk6a35BlU7UmJGWKd8a0h/uzBb+VHqZ3WQQZP+2sHaY7G6aHT9oIue344MFXn1uMOxPlenI0GVpDYfrbEzBU09/QFQGkNlStnzKwAAAABJRU5ErkJggg==)}.snowflake__inner_num_1:before{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAA0dJREFUOI2tk01oXFUcxc//3vfuy3xmJpkXnDQxscGPBlsaLMYqonUjXVjoJt1VSsHqSmiTqivXNkQooq5ciCLYTcWgVOLCLkSqWQRLG2ia2iSGmWZM501e5uN93Pt3o9EZGlee1eX+z/1xzr1c4H8SAcDhN84+cDh7cWZwpa6vuIqOnZicWn6Q56eP3wcAWJ2DSzPTXduaTTNGrhbqp5uaS0Ri9PPp6UYQm0pGCWvi3FSr85zo3KgEnE0JOs6A2gyhVhta3vDjAgBklDxaCTi7a7WlbX0kKakCAJHmld9b5vWkpBHXEQs/bIaHXCUW+pR4sqn5XkLSh2mbCilJYqPFxbG8nNuppg3GbjTiM4Hm70Yz8mqPLfLLjXhvl6SUAB5LSxpeb2pV7JK+64jx+Wo0mJB06uGEnAPwDyhl4aMBR9bna9Hxq5sRDmZt5UdcnC23Rsdydn3eix7JK+HtIWRu+vG4r3m/64hLysInbdVuepFVZzrIjEcjxsu3/GigoIT60YsOBAZpzdgYz1lrmlEd7BJef0J84xDdbTJf25exwp3LbjH1VAPjVSPz0lojTsVAermhnygFnOqxabUWs7va1GMWsOdeYORvdXPg1rYuKaLetlfrtklWY9Ndj1nlbDFcj3mvNny/ZViOJGQdALY119ZaOp+zxTARcgboLQdG/Q2yACBk3jyct5PlgK9EjPWHHHnIMBf7QzaXK+GQa1H5mZy96EdspxX96to070XwMoLX2xLFhuym4WcX/fjYnUbcN5AQTUeg0GPT6smis5BXFPkRF4dS1sofLeP87MUvZCS9mFHCagOlLUyUWua9jEXhU1n7lx4ltryYl470qjtbmp2jrnMdAPI2yX0Z+XVkuLER6ne9EGfbqkmgMZKyzgwn2NPA7XLAQ4+nrWxSUikpyXUkXRtKWdVGzJWsorvP96rPugTNxcyFNtCJyakvAeDTCxdEYChRUFgUJC5XI97vxzzBjLXhpPi2FvJzglAOI7N18p234l3/2qvnzxsAcIi+yitRdhVx3qJktw3LkVRLSnxhMaLTHZCdRP/Wa29P1f9a+rMXZ77vT8hJwXT9lTfPrXV6d03UqfuBXu9zxActxtJ/+QDgT33VfrndnbTiAAAAAElFTkSuQmCC)}.snowflake__inner_num_2:before{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAA5BJREFUOI2tU21sU2UUPu97721v27Vrt4zaCJPBhstMFFgc1jmiZA5BSAYxIzrEqPFHN6KhpAMEnR/JlFWsf1Q+lD9GOhDRSDIDopjgKt2C4rKFOYobsG4D6fft173vh7+YK85/PMlJ3uSc58k5zzkvwF0Cuv1wutz/SR7u7talCGweSZGWFTbxS0q5/+VdO8iddb9++iGIc6l7393bnmNws0hAJwcT2sNdE9nVXsk4urRY/Krr7b0vmUSUem13h382B88ldDPP6raGlGMAAItM4uflIgY9QofiGgiukHIgqrLl/zva5SRdGqe8ySqhAcJ538GruZ9Xlep6Q2lyfls498Pp+4sezHP+SihNa56y69bKGLUqGjhK9Oi7ew14aEbxm3C+bWUwwbcNKT9dUagjGCXNTf0J7h1NH6kOxPgX13OfrQwm+LmItu6KQh2eYeVCU3+C/3JLay8YrdYmXnx2nnR8WmWVDX8kw5dSZMOjFmFEFpC10SwNqpQvWVUsjJyPqC1PDyYno4SXttr1PeVG/DsA/Gv2pu2eAAAE/F6v2TeePfZ+OLtljUU6+4hVHJYFWmKT8NjlDJN7ourz64t1Pa9WyC+2bPfk9t/p0UehzL64xuVyI6YaA3Oe8RKFcFhkFNT5BkH3V4ZCOEc1m4gsHEECAwpN5ZjFIKDEjiXG12c6SjP+0LU8s8UJv56kfEGlAU+USFiJEaazM5w1i0iyiTg/nmVShLAaE0ZSmvGqhQY8VeDRlvnyuksHOmvbFsob6yxC79Gotmw8x6ru0Qt4Ms8qRATh/iSpHkiTZQ02qTf4yZvNQ/s7H9jo0K8tXL9CnzgxmX/yzwxtOJzSHttZqh9YbMRMh9DYxRS5r8KA/waAsrEsA19MdW4uEk/VWcTQGrv+66oi4exMR1cztOHHuLbrBmHWbxebGjc55N0Hp/Mrohoru5CmzhTlpu8j2vJnHHpPT4VpPeVQc/yW1p4j4Cy4zEBEe7wvQrqCUdLsdLnBF8qc8Y6mj/hCmUY4F+V9Ea3eF8qc8Qyn/U6XG0aS1H3qhnqoL6LVFwg5Xe6ZOBHOd1cHYnxcoeajE7napv4EPz2tVv4WI/OqAzF+ckrdM5oi+HZ9gdmzYZGQ8tYCw3sCBs0q4Q3XCAOM4bkyPUq22fUfK4RlX+joYLM5c/7+Nzp3vgMAUL/PKwsI1NZS3ZiMURYAwP/Bnq1zce4a/gGCkrQajiK5nAAAAABJRU5ErkJggg==)}.snowflake__inner_num_3:before{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAA3NJREFUOI2VlH1o1HUcx9/f7+/hnrzd026xjTkaNmGBbSQMjSTQWYiUWYtwRWWrJRdYOO9GSxOTbd6p0ODKm6KjUUpNZHgE5YQelkE2ZiZjNOaJZ3eM7W633XZ3v6fvtz+iUYxb9Pn7xYs3nyeCfQdQrH7pPi6eSSm7IicODxaFPjkJAKBFAQDRReN0ZJ6fO3uk5+Bq3Kqir7uCu45kjB0vO4RC64z29nBXcOP/FvW8371zMKPtAKANZHQvgNxnc+qrLe3HthUTkZ/mme1CWukY1bjxtFWQlziko7F8O2QaD1db3vHdL3zeU2F6viOWuwJK+Klqy1GNczm6ZJjXSSR5vsYSAgBRYdzWO886vGZMBxJqZbBS7n+uXB4wU1LhpJhsKKGxKpFMwG2aCqwhX91Vjc29s/oWr51mf8ghByAEAAT7DuCbruDe7bF8GJybIdBEdK3pBYkQr8J45cii7mp2yjPzjI/eUVjdm/FCHwQigyL1fbV1zxYXvQoAIgA8IOG3zlLpi3sam80wKDuTaqjbIVyK5gxfFYH6cUpJ15sE9/45ffdrHvFQmqF2q1WQy2V+51/NfuSg/8ZtlakDM1rzK07pbtgtHvo1b7zxo4a1F7Os9rKCxp8LxtagS3jrMZuIoRm12SGSGw+1+6dWTE3k3AadVd1TWQVAHLcMngcAGJwAwJjGtIctgv2+xtZD446Eykwrxn87FCzXCVn6tNZ2Nq6x331zenOTWbjppIQ0lNDFx0WebJTp1LmUuneTTYwer7EMJjXmnAgF7ctBAOC7LNs0tGC8NLRgmKDz1nfLpJa2UinumNNnMzoK60yCqcZMw5GU1vbkZO4yRMJBkWr1kEsAbgIAPfNBt8s3rUTqrGQCGiP7y6R+iaDmWtZoWS/TyLDCmjwC6bue1U9tttDYoyV0BIDiNZPsi4n8+eVEjXaBNC3Q62UCsW0ro1drTVTxTeY+/GshzV+O53jdH3bm6IoXdoOSZ8MPWvo2yEY6ZnCbB0iM/73Z/7z+WyeCbitBrnda7RxW2EYArvEF1viES7j2rQrtpEMYesYt9uc4rBva/WkAy9dPir2RyOGePW1J5XSDjZCxPC8EvdJT/mPvja4A/+uNNK4hF193CiNjS0wLuMUL20uEsWLsqqJ6f4B1lpv8naXylVaP9FG9P8BWE/0JoFZ9rudnUXgAAAAASUVORK5CYII=)}.snowflake__inner_num_4:before{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAA5hJREFUOI21k21sU2UUx8/z3Nd2dO2td9R2FZhEE4RFtjkTlizRGkGNizgIhhHRhUhiNEMlDGS8ZBjm2BXiPgDxbckMZsGZ6MgSEt8yNEh0qQwdg23qunXZqOnK2rW97X3u8zx+0cUKftP/13POL/9z/jkA/5EQAMC6F1+7pXDGMPxD8/bzY1m7qsItDTygSX11u3ZH/9l36fQJAADAt6P3GIZLQuD0ynjuXII8oSBkTWYobzn0pvZvjhZBZwzDDwCw92B7/eHx7PWLCbJRl7EecosJjEG/kWdbe2/kx7btPrIZAOBkW8fSW0CvtLRVDcStHT2GUasK4J4mjAIAREz7zukc902Z9O4MYQvThJtrPYrv7HGjZjRtP9V6uL28AFSqCiFjJvdG/+/Ws5SDvjOgPI0RrJEwGutOEdEj4ogsoLVHVjq3IoCln83mG1qj5rt5zrf8BRIBANKUm/uDjrcGEiQ0lLJ3BFTUv15XPh9P26FHHEJyZIHU3OeSvrsQt5p/M9mTDGDoVb/ajhFKFaT2c5IWuQSo/OEmWT2YspuMhLXqZY98PWax0nudOHUty+7QRBT7IEWWN3nkqTVLhGMPl8iDOQoj5W4hswi6fJM+2jOTOx1U0TslMp6fI7z607i18QW/csGnYDqatr29cfLgBk3q9YjocsRkmHDe2BBw7KvQhC8Wb2RxXhTO2Ho0xysBAJwC5HQB6QQgGc0xhw0ooguo2CkgDgDzmgg1wxm6eo4wT8Fq0SxV43mojZq0ZHiBPPNV0l7nFZDqxMhRVSwMhlO0eoFx+0qe5rdp0qUar/xxmRPHGMCXq1yitehoNM3qYhYNjqfJoStpWheUENoeUDqXqyh8fo5UljnQL40B5b3HXdLsaJZt+DpOWiayzLdAYFNB/DbnvraI2ZVkfLRphfPDA/cUbQEA9/0uqe+8SZW7VOGjLOXSrjLH9sZS9bhHhKsHJ7JdJuNlBfEXiSiyWZdO1nqVPsK5/slM7iWvhMcDKnaudwggC2gF43DtVMQ8Vu9XTjSUqucoh19nc+ynAkfNB/b2P+ZTTukKfJuxuas7bm3SRDSpKbi4comQ9Ct4qljC+GySPBTPsWUW5xdDJXJn59HX+wscAQA8t2fPCABAd0fH+63LHOGKYokyxDNjJttZL+FpTUA/dq0s+qa1dd/3f45M3vZpF4HNzezto/vDGEPsaoqWB2U8PJGxqzUVz/0N8v/pD1AMlnyOK7hsAAAAAElFTkSuQmCC)}.snowflake__inner_num_5:before{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAA5hJREFUOI2tk1tsVFUUhtfeZ59z5syt05keW4otZOpASRCppBVN7EOt8ZIgiSamEqEJgQeMMQbb0TahimCoHeRBRLBNWoPyYjQhIDFeixBTicHSgEp6oyPTNp3a6XRu57YvPtFkoI+s17X+L19W8gPcp0EAAI/v27/isvdIrPP4VOHtjoj7zR1t7QMr3QydPAYAAOSecHfMk6W8vsBAnzJoRW/W8W/L0LrOrm42Y7Bbjbp8ZXc0aq9oNJqluDUa5f09PcpQyjn6W5q+ECKYChB2Y1D+6cf/nO0qhnzS5vpzZUrfJp/URSTEAQDW+QhfNrowZzf1Hok1ZBzx958Z9nRzUP4AAPzDGbav1kP6L6Wc5no/+dgv45qLKac57CHXMzaPTOTYIABcXgYxIXoevr5UFw2qEwmbezCCR5MWXxPW8JVvk1bZRi8ZmbZ4iyyhhbjJKr6etQ59mbbDB1e7ngeArcuglypdxw0OByJuMtkUkg+MZJx3q1ySphFkBBXckLK54pelhdsGI6+v0V6ZKrBj5bJCG0PyiTs/wgAAMyYf3ewjib5Zc3Pa4dvXe8lHMka/PuQmV8sVbFa5pEmC0HBdQO77Y9F58ZukFQl7yVg8z4eKQFfTzhOXFmlgf7UW+9fk+m2DvVWpSUpQRedu5uhICUFnZAQl19LOa9OWqGx5QO08N2fXcgRPFoG8BFV5sFjSVbxQoLyWClBylPOCI0gJwTUCg+0IYWaYUAIy6Gs9ZCkgo/mpPA0Xger8yvl1HkJPThkdq1zSeFBBZ2wOpiPg5Wo3WqAMXlUwQpt88mkFIPneROFwvZ/4ShV89g6IAABQEIt5LrTGUhJ/SlcOf5e096QEXwsgQqtUSZ616COLjjAAQG3S1agq2ScogFrjJrkio99T9vt748Zj4warPThe+FlXcGXCYvqMyacvp+zv81QsTeZpkHERHkiYF+ZsvmXXrcIzw2mnq8hotUu68Vm1NlfrI2M/zFt7soxf1GWsJUy2a1uFK/3LvFW93ku+KpVxhZbnka0B+dTnbhIJKXisCLTRL72jIOJJOULLU2i4lmF7mQA5z4XuwWjLqMHLpy3RkmMCb3DjGxv80qdISGqBQaYI1BqNcgDIAkD2i6Ox3f1xc0edn5SZQjzY+k/2VEeVdjrHRPJmjsWfLXcN7Gxrz99d2nvav7OtPQUAnwwCQPehDzuzXECVW/rrjc5oDwDA4N2B+z3/A4d8pjJSam1BAAAAAElFTkSuQmCC)}.snowflake__inner_num_6:before{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAA6NJREFUOI2tk1lMXFUYx79z7rnn3nFg5g50hmHpguuQFpeydaqmjUgTm5jUGIPVxDcbQU0jakRNi6Z9qBKbamNMSdSIDQluAZe0QX2ytlaqoMSqUxA6wDBD2pkOM8zdzuITxMHX/p++l/8v3y/fOQDXO9GOLoh2dEEsx/C8KbYMJezWiSz3xnIM98et3mhHF/yaYaGhhN06leeVsRzDKx0AALIWiBBqAACzhOCyU4v2MYpg6bIlorv3Hzr6TcqG1iD98oojfQDgA4C/V3p4Lehs2tkykWVeHUPIr6D+SVPcfybPohRDpMVQPyQY3Th+zQ0t2qKlaIGVYSTp1G/y4j8G5uzjbSH6Zl/cmqzV0U9b/fS9uMV31ujK6eGU/cY6ity2ctqedMQTjT7l5TlL1u0K04lVNYxR5PSic7ggYPOlPC+J+pUjpoBo0uZGkCIeN9lNLX5l2lDxhaQjei9kWZ3J5bpmgw4AwMSq2gYP+twRcv0PObfK4pLsDmunPBilKnUlX2AytMFDpm4gWGwvU9+fXGbG6DIL6hjpna+8+G2R2lcL9jtpV4whQO0hintmLf42RWg6Ukpemymw7pu95MBoxvkgQPHUeo8yGC/wpyXAiEdBDXuqtKdW1cooHjyXYXcRJCs8WH0AA3xdV0qmhlPW9wCg/Zln2+70qc/ETf5QCcFN57OsekcZvbrZpwwWXY0gdKVKx7dfY8CSNm8mGOaZlAs5BrhWV7RljtxKXZnTMMpdXHLr81z6UzZvSjsyUQQ6n3Ge3eonA9sNMtMcoM9lXfnkrMnbH6/WO3Nc/rxvo75/POt2O0LesSesH73HUH+v0PB359LOvqIHGfGSY2fTzicTeVERdeXBbQF6PGHxHQGKYgqCv6bzfNajoMpmg771RdI6cXFZ1DT6FH9rUHukCFSiopo8k8sFIUtNISv+KfDcgsUjcZN33lZCtN+y7kFNQfZlk5cCAOSELPOr2NUR3AIA46tqBQ7BB8P63iYfGQSAIx8lrM+yrlAiXnJiyZXz9T713VhB3No3b/VSjF69L6B+HKb4+TSTm4o2OtDz0qcAAHtfOByLeEnKr6I+BcHYmYzT/2OO195dqrTsKqeHTCHuBYCMkDDa83r3JABMFoFW0mioo0EN6wUhh5MW35nlkNQxEEDgzJisusFQT1KMkKGg0f/2/vdpqzT8CwCAglB1gOKhtnL1sTZDHXk0rD3MJYxdteXGCooyloRLa7vXJf8CRZueiIgMHEAAAAAASUVORK5CYII=)}.snowflake__inner_num_7:before{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAzBJREFUOI2tUktolFcY/e53539O0jGZPCbTdGIeNkQEU4vUFGwp2p0PaLUQu5Ai1YpdFaMDatq6KW3aUttFkZoWSgmklMGVRSq2YtQUDSo6iWge/WMmJJhJ5vX/M/P/9+EqocwEV57V4Z57DvccLsBzAlkmXYc/KRMHv+5r/euJ2721Ro3t7+kZLdVv/PjtCveViid6v6iyuWx5vVqJ/znvvmYV+EehHC/+/k3f5FiGr2sw6OTBaI9d6sPSAwlkZ2zevTmU9I7UabQw50rmCZiwHHGgP1G4ez/j7XtmtbOT+a3NJk1Vaah9Ou4MbjCprFMhcz3DOzaYeHeRgTHjirovXzYPWLZ4OOXwhkMtxtWyanGb/7bIxM2ggrG3AvTfFJdbpgsQ2lGj/HQnw/cIIXmnieNzRdn5wGaHHuT4JgB4qSyoViW/PHLEtksu+26Tny6ENZxuMwibLYr1GyvpeIZJd7Yowmes/Kk1lIw2G9i/6kaHm83+9xq0nwFArVPIrSVP6AUplyxHbEYAd8kTwSaDDqW5zL4dVAa6G/XvV92odyw3nOXg+AgEAIhCAEwksgaBVKooHYeTeR1ldpEBKgTsSgp4uqNiS1m1R3kRBgCoVXA+ogPjEpJ5AfVpJqWKAEEFkgAEUkzinCsapyQoq1Y73ebf1R3So0zIkCdh8nFR6gEfjmgIuRd1Gk96EAz4cDzNZHhXrXrmq3b/tv8HrbxoJMMaR9Js5xyTNS8wiLSbmAgo6M0WxYSGJNXhx9xUnrcucBEeTrPtySKzAGDlt69stP92NlGtECuk4j82F68oSNoLQkJEp4MTjtgLAGBS6XVU+IbjWdZ53+FNsVcD1WVB52fdd3SERJWKqbPT+XMVlER0JN7jIldbDMQsA7SFdKOt5gcAkPv7ibvuYLMxsOyny8Ry7LErVy4l3nhz+7sXku6R7gbth6BCLsRtvrtrje9Ym+mbiC26u5sUvBftjf5x59rlezO3bpRvtAyVwsWPG433u4LK1aEFb/NaHWfqNeqvVfHch/Xaw4hJr5V6Vg06evK4BQAWAMCvfX2hsRwZTXnyv88/OzYDAAOl9587ngLgaG3vbxuGIgAAAABJRU5ErkJggg==)}.snowflake__inner_num_8:before{background-image:url(8.png)}@-webkit-keyframes snowflake_y{from{-webkit-transform:translateY(0px);transform:translateY(0px)}to{-webkit-transform:translateY(103vh);transform:translateY(103vh)}}@keyframes snowflake_y{from{-webkit-transform:translateY(0px);transform:translateY(0px)}to{-webkit-transform:translateY(103vh);transform:translateY(103vh)}}@-webkit-keyframes snowflake_x{from{-webkit-transform:translateX(0px);transform:translateX(0px)}to{-webkit-transform:translateX(50px);transform:translateX(50px)}}@keyframes snowflake_x{from{-webkit-transform:translateX(0px);transform:translateX(0px)}to{-webkit-transform:translateX(50px);transform:translateX(50px)}}@-webkit-keyframes snowflake_rotate{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes snowflake_rotate{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes snowflake_rotate-reverse{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(-360deg);transform:rotate(-360deg)}}@keyframes snowflake_rotate-reverse{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(-360deg);transform:rotate(-360deg)}}';

    function Flakes(params) {
        this._injectStyle();

        if (this instanceof Flakes) {
            params = params || {};
            this.params = {
                container: params.container || document.body,
                count: params.count || 50,
                speed: params.speed || 1,
                useRotate: typeof params.useRotate === 'undefined' ? true : params.useRotate,
                useScale: typeof params.useScale === 'undefined' ? true : params.useScale,
                width: params.width,
                height: params.height
            };

            this._flakes = [];
            this._isBody = this.params.container === document.body;

            var container = document.createElement('div');
            container.classList.add('snowflakes');
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
        flakeCount: 8,
        start: function() {
            this._container.classList.remove('snowflakes_paused');
        },
        stop: function() {
            this._container.classList.add('snowflakes_paused');
        },
        getRandom: function(from, max) {
            return from + Math.floor(Math.random() * (max - from));
        },
        createFlake: function() {
            var flake = document.createElement('div'),
                innerFlake = document.createElement('div'),
                size = (this.params.useScale ? this.getRandom(this.flakeMinSize, this.flakeSize) : this.flakeSize) + 'px';

            flake.classList.add('snowflake');
            this.setStyle(flake, {
                animationDelay: (Math.random() * 10) + 's',
                left: (Math.random() * 100) + '%',
                width: size,
                height: size
            });

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
        setStyle: function(elem, props) {
            Object.keys(props).forEach(function(key) {
                elem.style[key] = props[key];
            }, this);

            return this;
        },
        destroy: function() {
            this._flakes.forEach(function(flake) {
                flake.parentNode && flake.parentNode.removeChild(flake);
            });

            delete this._flakes;

            this._removeStyle();
        },
        _injectStyle: function() {
            if (!Flakes._styleNode) {
                var styleNode = document.createElement('style');
                styleNode.innerText = CSS;
                document.body.appendChild(styleNode);
                Flakes._styleNode = styleNode;
                Flakes._count = (Flakes._count || 0) + 1;
            }
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
