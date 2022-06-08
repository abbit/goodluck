export const encodeContent = (content) => encodeURIComponent(JSON.stringify(content))

export const decodeContent = (content) => JSON.parse(decodeURIComponent(content))
