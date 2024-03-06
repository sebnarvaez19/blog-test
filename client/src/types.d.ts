export interface PostProps {
    post: {
        id: string,
        created_at: string,
        author_id: string,
        title: string,
        body: string,
        tags: string,
        author: {
            id: string,
            created_at: string,
            username: string,
            email: string,
        }
    }   
}

export interface FeedProps {
    posts: PostProps[]
}

export interface submitLoginProps {
    username: string,
    password: string,
    setErrorMessage: (message: string) => void,
    setToken: (token: string) => void,
}

export interface submitRegisterProps extends submitLoginProps {
    email: string
}

export interface TitleFieldProps {
    title: string
    setTitle: (title: string) => void
}

export interface TagsFIeldProps {
    tags: string
    setTags: (tags: string) => void
}

export interface BodyFieldProps {
    body: string
    setBody: (body: string) => void
}

export interface PublishPostFormPops extends TitleFieldProps, TagsFIeldProps, BodyFieldProps {
    submitHandler: () => void
}

export interface publishPostProps {
    title: string,
    tags: string,
    body: string,
    token: string,
    setErrorMessage: (message: string) => void,
}

export interface UserProps {
    user: {
        id: string,
        username: string,
        email: string | null,
        created_at: string,
        avatar: string | null,
        posts: {id: string, title: string, author_id: string, body: string}[]
    }
}