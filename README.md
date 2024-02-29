# blog-test

In this repo I will create a blog website. The posts must to be loaded from a DB and there has to be support for images.

## Schemas
for the posts the schema should be:
```json
{
    "id": UUID
    "author": UUID LINKED TO user.id
    "title": String
    "tags": Enum Array
    "body": String (Should be Markdown)
    "date": Date
    "attachments": (IDK how to implement this, but here will be the images)
}
```

The authors schema should looks like this:
```json
{
    "id": UUID LINKED TO post.author
    "username": String
    "password": String
    "email": String
    "bio": String
    "profile_picture": UUID LINKED TO images.id
    "date_created": Date
}
```

Also, there should be a DB for the images, discussing with Andrés, the images should be placed in a Cloud Storage, he recomends Supabase:
```json
{
    "id": UUID
    "image": String (image path)
}
```

## TODO
1. Create the mock data ✔️
2. Create the API to work with data ✔️
3. Create the blog client ✔️
    1. Create the main page ✔️
        1. Header component ✔️
            1. Link to Home ✔️
            2. Search bar ✔️
        2. Feed component ✔️
            1. List of posts ✔️
                1. Post banner ✔️
                    1. Title ✔️
                    2. Authot ✔️
                    3. Date ✔️
                    4. Tags ✔️
                    4. Body _rounded_ ✔️
        3. Filter component ✔️
            1. Tag filter ✔️
                1. List of tags ✔️
                    1. Tag ✔️
            2. User filter ✔️
                1. List of users ✔️
                    1. User ✔️
        4. Recent component ✔️
            1. List of posts ✔️
                1. Mini-post ✔️
    2. Create a blog page ✔️
        1. Back button ✔️
        2. Post component ✔️
            1. Title ✔️
            2. Authot ✔️
            3. Date ✔️
            4. Tags ✔️
            4. Body ✔️
    3. Create an user page ✔️
        1. User component ✔️
            1. Profile component ✔️
                1. Profile picture ✔️
                2. username ✔️
                3. email ✔️
                4. date created ✔️
            2. Bio component ✔️
4. Functionality to create posts ❌
5. Support for images ❌
6. Change beercss for Material UI ❌
