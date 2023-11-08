# Errors
Here you will find a description of the errors and possible reasons why such a response was sent. In all cases when and error response is send, the `content` property will be an empty object.

## 400 - Bad Request
This one means you probably didn't send json formatted information within the body of the request. The app doesn't check the headers, whether the type it's `application/json` or anything. This just runs the body through a parser and if it throws an error then a 400 is sent. Meaning, maybe you did send a json (and the `content-type` header is set correctly) but the parser failed to read it. In this case you should check if the body is syntax correct json content, check for missing comas, missing quotes, etc.

###### Example response of a bad request:
```json
{
  "code": 400,
  "message": "Bad Request.",
  "content": {},
  "description": "Only JSON requests are admitted.",
  "documentationURL": "https://github.com/apacha01/sapi/blob/master/src/docs/ERRORS.md#400---bad-request"
}
```

## 401 - Unauthorized
This error means that the request was send without a `token` (obtained at login) or maybe that token has already expired. For this you would just need to login once again. Another reason this error may be send its if, upon logging in, the wrong credentials (user name and password) are provided.

###### Example response of an unauthorized request:
```json
{
  "code": 401,
  "message": "Unauthorized.",
  "content": {},
  "description": "Wrong name or password.",
  "documentationURL": "https://github.com/apacha01/sapi/blob/master/src/docs/ERRORS.md#401---unauthorized"
}
```


## 403 - Forbidden
When this error occurs, it means the user doesn't have the privileges or the access right to a certain service. So you'll most likely need an `admin` user to access the endpoint you are requesting to.

###### Example response of forbidden request:
```json
{
  "code": 403,
  "message": "Forbidden.",
  "content": {},
  "description": "Permission denied.",
  "documentationURL": "https://github.com/apacha01/sapi/blob/master/src/docs/ERRORS.md#403---forbidden"
}
```

## 404 - Not found
Resource requested wasn't found in the database.

###### Example not found response:
```json
{
  "code": 404,
  "message": "Not found.",
  "content": {},
  "description": "User with name or id '5548e8e1d920da8f5cba5057' not found.",
  "documentationURL": "https://github.com/apacha01/sapi/blob/master/src/docs/ERRORS.md#404---not-found"
}
```

## 409 - Conflict
This errors is the result of either a POST or a PUT request trying to create a resource or update an existing one with a name that already exists. Every endpoint has a name uniqueness restriction to it, from foods to pets to toys. If you make a POST request creating a resource with a name already in database, a conflict response will be send. If you make a PUT request updating an existing resource and changing it's name for one that is already in used by another resource, a conflict response will be send.

###### Example not found response:
```json
{
  "code": 409,
  "message": "Conflict.",
  "content": {},
  "description": "Food with name 'honey' already exists.",
  "documentationURL": "https://github.com/apacha01/sapi/blob/master/src/docs/ERRORS.md#409---conflict"
}
```

## 422 - Insufficient information
A response with this error means that the resource sent in the body didn't pass validation. There are probably some fields missing, with the wrong pattern or format, so you should check the `description` property to see a better explanation of what it's missing/wrong.

###### Example not found response:
```json
{
  "code": 422,
  "message": "Insufficient information.",
  "content": {},
  "description": "All properties must contain valid data.\n[\n\tERROR: /name: pattern must match pattern \"^[a-z_]*$\",\n\tERROR: /sources/0/url: format must match format \"uri\",\n\tERROR: /sources/5 must have required property 'url'\n]",
  "documentationURL": "https://github.com/apacha01/sapi/blob/master/src/docs/ERRORS.md#422---insufficient-information"
}
```

## 500 - Server error
If this error comes up in a response, it means there was an error internally and it may be a bug. You can raise an issue [here](https://github.com/apacha01/sapi/issues)

###### Example not found response:
```json
{
  "code": 500,
  "message": "Server Error.",
  "content": {},
  "description": "There was an unexpected error.",
  "documentationURL": "https://github.com/apacha01/sapi/blob/master/src/docs/ERRORS.md#500---server-error"
}
```