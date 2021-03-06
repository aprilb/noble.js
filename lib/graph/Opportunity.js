// dependencies
var Vertex = require("./Vertex");

/**
 * Represents an opportunity vertex
 *
 * @constructor
 * @param {Client} client  The API client object (passed around internally)
 * @param {String} id      UUID
 */
function Opportunity(client, id) {
    Vertex.call(this, client, id);
}


// inheritance
Vertex.extend(Opportunity);


// override for Vertex#base
Opportunity.prototype.base = "opportunities";


// single export
module.exports = Opportunity;
