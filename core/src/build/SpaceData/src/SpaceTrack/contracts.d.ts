export interface Options {
    class: string;
    emptyresult?: string;
    metadata?: boolean;
    format?: string;
    controller?: string;
    action?: string;
    query?: Array<string>;
    predicates?: Array<string>;
    favorites?: Array<string>;
    orderby?: Array<string>;
    limit?: number;
    offset?: number;
    distinct?: true;
}
export interface Credentials {
    identity?: string;
    password?: string;
}
