# Media type middleware

A simple Express middleware to check incoming media type.

### Usage

```javascript
const express = require('express');
const MediaType = require('media-type-express');

const mediaType = MediaType({
    allowedMediaTypes: [ 'application/json' ]
});

const router = express.Router();

router.use(mediaType);
```

### Notes
If the media type is not allowed a Http error 415 (Unsupported media type) will be answered.
