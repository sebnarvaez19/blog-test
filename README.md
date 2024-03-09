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
4. Functionality to create posts ✔️
5. Change beercss for Material UI ✔️
6. Change to Material 3 ✔️
7. Filters and Recent components ❌
8. Searchbar component ✔️
9. Support for comments ❌
0. Support for images ❌
