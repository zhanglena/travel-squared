### Get Locations

- Endpoint path: /locations
- Endpoint method: GET
- Query parameters:

  - location: get places in this location
  - category: get places in this category

- Headers:

  - Authorization: Bearer token

- Response: A list of reviews
- Response shape:
  ```json
  {
      "locations": [
          {
              "added_by": {
                              username: string,
                              name: string
                          },
              "address": string,
              "picture_url": string,
              "name": string,
              "loved_by": array of users,
              "associated_reviews": reviews(string)
          }
      ]
  }
  ```

### Create Location

- Endpoint path: /locations
- Endpoint method: POST

- Headers:

  - Authorization: Bearer token

- Request body:

  ```json
  {
      "name": string,
      "picture_url": string,
      "address": string
  }
  ```

- Response: Success or failure
- Response shape:
  ```json
  {
      "success": boolean,
      "message": string
  }
  ```

### Love a Location

- Endpoint path: /locations/{location}
- Endpoint path: PUT

- Headers:

  - Authorization: Bearer token

- Request body:
  (Have the backend increment loves by 1 on request)

- Response: Success or failure
- Response shape:
  ```json
  {
      "success": boolean,
      "message": string
  }
  ```

### Get Reviews

- Endpoint path: /reviews
- Endpoint method: GET

- Headers:

  - Authorization: Bearer token

- Response: A list of reviews
- Response shape:
  ```json
  {
      "reviews": [
          {
              "user": {
                          username: string,
                          name: string
                      },
              "picture_url": string,
              "date_posted": date,
              "loved_by": array of users,
              "name": string,
              "text": string
          }
      ]
  }
  ```

### Create Review

- Endpoint path: /reviews
- Endpoint method: POST

*Headers:
*Authorization: Bearer token

\*Request body:
`json { "name": (place_id)number, "picture_url": string, "text": string } `

### Like Review

- Endpoint Path: /reviews/{review}
- Endpoint method: PUT

- Headers:

  - Authorization: Bearer token

- Request body:
  (Have backend increment likes
  by 1 on request, add their user
  to liked array)

- Response: Success or failure
- Response shape:
  ```json
  {
      "success": boolean,
      "message": string
  }
  ```

### Get User's Profile (Reviews tab showing as default)

- Endpoint Path: /{username}
- Endpoint method: GET

- Headers:

  - Authorization: Bearer token

- Response: A list of Reviews
- Response shape:
  ```json
  {
      "username": string,
      "avatar_url": string,
      "reviews": [
          {
              "username": string,
              "location": string,
              "description": string,
              "picture_url": string,
              "date_posted": date,
              "num_loves": number,
          }
      ]
  }
  ```

### Get User's Profile (Locations as selected tab)

- Endpoint Path: /{username}
- Endpoint method: GET

- Headers:

  - Authorization: Bearer token

- Response: A list of Locations
- Response shape:
  ```json
  {
      "username": string,
      "avatar_url": string,
      "locations": [
          {
              "username": string,
              "location": string,
              "description": string,
              "picture_url": string,
              "date_posted": date,
              "num_loves": number,
          }
      ]
  }
  ```

### Get User's Profile (Followers as selected tab)

- Endpoint Path: /{username}
- Endpoint method: GET

- Headers:

  - Authorization: Bearer token

- Response: A list of Followers
- Response shape:
  ```json
  {
      "username": string,
      "avatar_url": string,
      "followers": [
          {
              "username": string,
          }
      ]
  }
  ```

### Get User's Profile (Following as selected tab)

- Endpoint Path: /{username}
- Endpoint method: GET

- Headers:

  - Authorization: Bearer token

- Response: A list of Following
- Response shape:
  ```json
  {
      "username": string,
      "avatar_url": string,
      "following": [
          {
              "username": string,
          }
      ]
  }
  ```

### Get other user's profile page

- Endpoint path: /username
- Endpoint method: GET

- Headers:

  - Authorization: Bearer token

- Response: A list of Reviews
- Response shape:
  ```json
  {
    "username": string,
    "avatar_url": string,
    "reviews": [
      {
        "username": string
        "location": string,
        "description" : string
        "picture_url": string,
        "date_posted": date,
        "num_loves": number
      }
    ]
  }
  ```

### Get List of Followers

- Endpoint path: /{username}/followers
- Endpoint method: GET

- Headers:

  - Authorization: Bearer token

- Response: A list of followers
- Response shape:

  ```json
  {
    "followers": [
      {
        "username": string,
         "avatar_url": string,

      }
    ]
  }
  ```

### Get List of Followings

- Endpoint path: /{username}/followings
- Endpoint method: GET

- Headers:

  - Authorization: Bearer token

- Response: A list of followers
- Response shape:

  ```json
  {
    "followings": [
      {
        "username": string,
         "avatar_url": string,

      }
    ]
  }
  ```

### LogIn

- Endpoint path: /token
- Endpoint method: POST

\*Request shape(form):
username: string
password: string

- Response: A list of reviews
- Response shape:
  ```json
  {
      "reviews": [
          {
              "profile_name": string,
              "username": string,
              "picture_url": string,
              "date_posted": date,
              "num_loves": number,
          }
      ]
  }
  ```

### Log out

- Endpoint path: /token
- Endpoint method: DELETE

- Headers:

  - Authorization: Bearer token

- Response: Always true
- Response shape (JSON):
  ```json
  true
  ```
