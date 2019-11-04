const validate = require('validate.js');

const zipPattern = /\d{5}(-\d{4})?/;
const phonePattern = /(^1-)?\d{3}-\d{3}-\d{4}( x\d{3,5})?/; 


const constraints = {
    "users": {
        "id": {
            numericality: { onlyInteger: true }
        },
        "name": {
            presence: { allowEmpty: false },
            type: "string", 
        },
        "username": {
            presence: { allowEmpty: false },
            type: "string",
            format: {
                pattern: "[0-9a-z]+",
                flags: "i", 
                message: "has illegal characters."
            },
        },
        "email": { 
            presence: { allowEmpty: false },
            email: true,
        },
        "address.street": {
            presence: { allowEmpty: false },
            type: "string"
        },
        "address.city": {
            presence: { allowEmpty: false },
            type: "string"
        },
        "address.zipcode": {
            presence: { allowEmpty: false },
            type: "string",
            format: { 
                pattern: zipPattern,
            },
        },
        "geo.lat": {
            type: "string"
        },
        "geo.lng": {
            type: "string"
        },
        "phoneNumbers": 
            function (value, attributes, attributeName, options, constraints) { 
                if (value.length == 0) { 
                    return { length: { minimum: 1,
                                        message: "must contain at least one phone number." 
                }}};
                for( const num of value ) {
                    if (!phonePattern.test(num)) {
                        return { format: 
                            { 
                                pattern: phonePattern,
                                message: function(num) 
                                { 
                                    return validate.format("^%{number} must contain only valid phone numbers", 
                                    { number: num});
                                } 
                            } 
                        } 
                    } 
                }
            },
        "website": { 
            type: "string",
        }
    },
    "posts": {
        "userId": { 
            type: "number",
            presence: {allowEmpty: false}
        },
        "id": {
            type: "number",
        },
        "title": {
            type: "string",
            presence: {allowEmpty: false}
        },
        "body": {
            type: "string",
            presence: {allowEmpty: false}
        }
    },
    "comments": {
        "postId": { 
            type: "number",
            presence: {allowEmpty: false}
        },
        "id": {
            type: "number",
        },
        "name":  {
            type: "string",
            presence: {allowEmpty: false}
        },
        "email": {
            email: true,
            presence: {allowEmpty: false}
        },
        "body": {
            type: "string",
            presence: {allowEmpty: false}
        }
    }
}
const leanne = {
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phoneNumbers": ["1-770-736-8031 x56442", "1-771-736-8032"],
  "website": "hildegard.org"
};
const post14 = {
    "userId": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
};
const comment87 = {
    "postId": 1,
    "name": "id labore ex et quam laborum",
    "email": "Eliseo@gardner.biz",
    "body": "laudantium enim quasi est quidem magnam voluptate ipsam \n skdfjb"
}

module.exports = { 
    "validate": validate,
    "constraints": constraints
};
