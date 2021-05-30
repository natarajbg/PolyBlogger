export interface IBlogs {
    id: number,
    user_id: number,
    user_name: string,
    title: string,
    updated_at: Date,
    created_at: Date,
    body: string,
    deletePost: boolean
}