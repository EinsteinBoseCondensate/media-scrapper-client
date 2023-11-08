export interface MediaSearchResult<T> {
    items: T[],
    continuationToken: string
}