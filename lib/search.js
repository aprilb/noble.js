var extend = require("extend"),
    map = require("map"),
    utils = require("./utils"),
    types = {
        news:                    0,
        groups:                  1,
        organizations:           2,
        opportunities:           3,
        "offline organizations": 4,
        events:                  5,
        customers:               6,
        users:                   7,
        resources:               8
    };

/**
 * Perform a general entity search via the API. Most params are just piped
 * right on through via the querystring.
 *
 * Geospatial searches are triggered whenever 'lat' and 'lon' are included
 * in the params.
 *
 * @param {Object} options
 *  - geojson {Boolean}  Whether to retrieve data as GeoJSON (default: false)
 *  - types   {Array}    Entity types
 *  - terms   {String}   Keyword search terms
 *  - lat     {Number}   Latitude
 *  - lon     {Number}   Longitude
 *  - limit   {Number}   Number of rows to return
 *  - deleted {Boolean}
 *
 * @param {Function} callback
 */
module.exports = function (params, callback) {
    var req = this.request("graph/search");

    if (params.geojson) {
        req.query("return=geoJSON");
        delete params.geojson;
    }

    if (params.types) {
        params.types = map(params.types, typeId);
    }

    req.query(params);

    return req.end(utils.easy(callback));
};

function typeId(type) {
    return typeof type === "string" ? types[type] : type;
}