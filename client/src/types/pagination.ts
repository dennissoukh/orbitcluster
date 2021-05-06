export type pagination = {
    page: number,
    perPage: number,
    pages: number,
    count: number,
    skip: number,
    // limit: number,
    pageCount: number,
}

export type paginationQuery = {
    endpoint: string,
    status: number,
    error: boolean,
    type: string,
    length: number,
    data: Array<any>,
    metadata: object
}
