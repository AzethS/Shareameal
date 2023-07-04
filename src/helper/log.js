module.exports = new (require('tracer-debug'))({
    displayWhen: process.env.NODE_ENV !== 'testing'
})