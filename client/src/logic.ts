import { PostProps, UserProps, publishPostProps, submitLoginProps, submitRegisterProps } from "./types"; 

export function decodeJWT(token: string) {
    const base64Url = token.split(".")[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(atob(base64).split("").map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(""))

    return JSON.parse(jsonPayload);
}

export async function getPosts(): Promise<PostProps[]> {
    const requestOptions = {
        "method": "GET",
        "headers": {"Content-Type": "application/json"},
    }

    const response = await fetch("/api/posts", requestOptions)
    const data = await response.json()

    return data
}

export async function getPost(postId: string): Promise<PostProps> {
    const requestOptions = {
        "method": "GET",
        "headers": {"Content-Type": "application/json"},
    }

    const response = await fetch(`/api/posts/id=${postId}`, requestOptions)
    const data = await response.json()

    return data
}

export async function submitLogin(props: submitLoginProps): Promise<void> {
    const { username, password, setErrorMessage, setToken } = props
    
    const requestOptions = {
        "method": "POST",
        "headers": {"Content-Type": "application/x-www-form-urlencoded"},
        "body": JSON.stringify(`grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`),
    }

    const response = await fetch("/api/token", requestOptions)
    const data = await response.json()

    if (!response.ok) {
        setErrorMessage(data.detail)
    } else {
        setToken(data.access_token)
    }
}

export async function submitRegister(props: submitRegisterProps): Promise<void> {
    const { username, email, password, setErrorMessage, setToken } = props

    const requestOptions = {
        "method": "POST",
        "headers": {"Content-Type": "application/json"},
        "body": JSON.stringify({"username": username, "email": email, "password": password}),
    }

    const response = await fetch("/api/users", requestOptions)
    const data = await response.json()

    if (!response.ok) {
        setErrorMessage(data.detail)
    } else {
        setToken(data.access_token)
    }
}

export async function publishPost(props: publishPostProps) {
    const { title, tags, body, token, setErrorMessage } = props

    const requestOptions = {
        "method": "POST",
        "headers": {"Content-Type": "application/json", "Authorization": "Bearer " + token},
        "body": JSON.stringify({"title": title, "tags": tags, "body": body}),
    }

    const response = await fetch("/api/posts", requestOptions)
    const data = await response.json()

    if (!response.ok) {
        setErrorMessage(data.detail)
    } else {
        return data.id
    }
}

export async function getUser(userId: string): Promise<UserProps> {
    const requestOptions = {
        "method": "GET",
        "headers": {"Content-Type": "application/json"},
    }

    const response = await fetch(`/api/users/id=${userId}`, requestOptions)
    const data = await response.json()

    return data
}