import('./file.js').then(res => {
    document.getElementById('app').innerHTML = `<div id="status">${res.default.status}</div>`
    dispatchEvent(new CustomEvent('app-loaded'))
})