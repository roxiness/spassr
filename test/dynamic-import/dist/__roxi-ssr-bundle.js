(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}((function () { 'use strict';

    Promise.resolve().then(function () { return file$1; }).then(res => {
        document.getElementById('app').innerHTML = `<div id="status">${res.default.status}</div>`;
        dispatchEvent(new CustomEvent('app-loaded'));
    });

    var file = { status: 'imported' };

    var file$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        'default': file
    });

})));
