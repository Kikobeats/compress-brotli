const mergeOptions =  (defaultOptions = {}, options = {}) => ({
    ...defaultOptions,
    ...options,
    params: {
        ...defaultOptions.params || {},
        ...options.params || {}
    }
})

module.exports = {
    mergeOptions
}
