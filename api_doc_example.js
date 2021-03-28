/**
  *
  * @apiDefine apiUrl https://localhost:8000/
  * */

/**
 * 
 * @api {get} /user/:id Get user by id 
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiDescription Method to get basic user information
 *
 * @apiExample {curl} Example usage:
 *    curl -i http://localhost:8080/user/2
 *
 * @apiParam {Number} id Users unique ID
 *
 *
 * @apiSuccess {String} first_name Firstname of the user
 * @apiSuccess {String} last_name Lastname of the user
 *
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "first_name": "Ricardo",
 *    "last_name": "Cuanalo"
 *  }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }


 * 
 *
 * */

/**
 *
 * @api {post} /user Create user
 * @apiGroup User
 * @apiDescription Method to create an user
 *
 * @apiExample {json} Example body:
 * {
 *  "email": "cuanaloricardo@gmail.com",
 *  "password": "12ACB1!"
 * }
 *
 *
 * @apiParam {String} email User email
 * @apiParam {String} password Password must contain one mayus and one number
 * @apiParam {String} [role="admin"] User role
 *
 *
 * @apiHeader {String} token String provided in any request
 *
 * @apiSuccessExample Success Response
 * HTTP/1.1 200 OK
 * {
 *  "result": {
 *    "items": [
 *      {
 *        "id": 1,
 *        "email": "cuanaloricardo@gmail.com"
 *      }
 *    ],
 *    "created_on": "12-12-2021"
 *  }
 *
 * */



