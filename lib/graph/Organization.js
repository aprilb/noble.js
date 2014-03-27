// dependencies
var Vertex = require("./Vertex");
var each = require("each");

/**
 * Represents an organization vertex
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function Organization(client, id) {
    Vertex.call(this, client, id);
}


// inheritance
Vertex.extend(Organization);


// override for Vertex#base
Organization.prototype.base = "organizations";

/**
 * Retrieves a list of users for this Organization
 *
 * Available `query` options:
 *  - limit {Number}
 *  - offset {Number}
 *  - statuses {Array:Number}  Each item is a status type
 *
 * @param {Object} [query]
 * @param {Function} callback
 */
Organization.prototype.users = function (query, callback) {
    if (typeof query === "function") {
        callback = query;
        query = null;
    }

    return this.related("users", query, function (err, list) {
        if (err) return callback(err);
        each(list, function (row) {
            translate(row, "vertex_types", "type_id");
            if (row.type) {
                translate(row, row.type.toLowerCase() + "_types", "subtype_id");
            }
        });
        callback(null, list);
    });
};

/**
 * Create a submission object for this org
 *
 * @param {String} [id]  Optional ID for the submission
 * @returns {Submission}
 */
Organization.prototype.user = function (id) {
    return this.client.user(id).belongsTo(this);
};


// single export
module.exports = Organization;
