export interface UserProps {
    id: string,
    username: string,
    email: string | null,
    created_at: string,
    avatar: string | null,
    posts: {id: string, title: string, author_id: string, body: string}[]
}

export interface CommentProps {
    id: string,
    body: string,
    created_at: string,
    author: UserProps,
}

export interface PostProps {
    id: string,
    created_at: string,
    author_id: string,
    title: string,
    body: string,
    tags: string,
    author: UserProps,
    comments: CommentProps[],
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
    width: string
}

export interface TagsFIeldProps {
    tags: string
    setTags: (tags: string) => void
    width: string
}

export interface BodyFieldProps {
    body: string
    setBody: (body: string) => void
    width: string
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

export interface SearchFieldProps {
    query: string,
    setQuery: (newQuery: string) => void,
}

export interface SearchBarProps extends SearchFieldProps {
    submitHandler: () => void
}

export interface CommentSectionProps {
    postId: string,
}

export interface CommentSectionButtonProps {
    allowComments: boolean,
}

export interface CommentSectionFieldProps {
    allowComments: boolean,
    comment: string,
    setComment: (newComment: string) => void,
}

export interface CommentSectionFormProps {
    allowComments: boolean,
    postId: string,
}