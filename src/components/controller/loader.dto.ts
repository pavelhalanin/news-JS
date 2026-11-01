export interface RequestParams {
    endpoint: Endpoint;
    options?: Partial<FetchGetParams>;
}

export interface FetchGetParams {
    apiKey: string;
    sources: string;
}

export type HttpMethod = 'GET';

export enum Endpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export type Callback<T> = (data: T) => void;
