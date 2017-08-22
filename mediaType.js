const HttpError = require('http-error');

function isEmpty(obj) {
    // null and undefined are "empty"
    if (obj === null || obj === undefined)
        return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)
        return false;
    if (obj.length === 0)
        return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (let key in obj) {
        if (hasOwnProperty.call(obj, key))
            return false;
    }

    return true;
}

module.exports = function mediaType(options) {
    options = options || {};
    options.allowedMediaTypes = options.allowedMediaTypes || [];
    options.onlyWithBody = options.onlyWithBody || true;

    return function middleware(req, res, next) {
        let contentType = req.headers['content-type'];

        if (options.onlyWithBody && isEmpty(req.body)) {
            return next();
        }


        for (let i in options.allowedMediaTypes) {
            if (contentType.indexOf(options.allowedMediaTypes[i]) === 0)
                return next();
        }

        throw new HttpError(415, "Unsupported media type");
    };
};

