# blog-test

In this repo I will create a blog website. The posts must to be loaded from a DB and there has to be support for images.

## Schemas
for the posts the schema should be:
```json
{
    "id": UUID,
    "author": String
    "title": String
    "tags": Enum Array
    "body": String (Should be Markdown)
    "attachments": (IDK how to implement this, but here will be the images)
}
```

The authors schema should looks like this:
```json
{
    "id": UUID
    "username": String LINKED TO post.author
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
1. Create the mock data
2. Create the blog client
    1. Create the main page
    2. Create a blog page
    3. Create an user page
3. Create the DB
4. Create the API to work with data
5. Support for images


