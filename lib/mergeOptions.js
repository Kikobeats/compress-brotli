const mergeOptions = (defaultOptions = {}, options = {}) => {
  const params = {
    ...defaultOptions.params || {},
    ...options.params || {}
  }

  return {
    ...defaultOptions,
    ...options,
    ...Object.keys(params).length
      ? {
          params
        }
      : {}
  }
}

module.exports = {
  mergeOptions
}
