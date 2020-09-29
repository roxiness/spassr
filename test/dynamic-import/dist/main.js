import('./file.js').then(res => {
    document.getElementById('app').innerHTML = `<div id="status">${res.default.status}</div>`

    if (window.location.pathname !== '/timeout')
        dispatchEvent(new CustomEvent('app-loaded'))
})