/**
 * @typedef {Object} ApiMeta
 * @property {number} page
 * @property {number} limit
 * @property {number} total
 * @property {number} totalPages
 */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {string} message
 * @property {any} data
 * @property {ApiMeta} [meta]
 * @property {Object} [error]
 * @property {string} error.code
 * @property {any} [error.details]
 */

/**
 * @typedef {Object} Event
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} category
 * @property {string} venue
 * @property {string} startsAt
 * @property {string|null} endsAt
 * @property {string|null} bannerUrl
 * @property {boolean} isFeatured
 * @property {number|null} capacity
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} Registration
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} collegeYear
 * @property {string} phone
 * @property {string} eventId
 * @property {string} createdAt
 */

export default {};
