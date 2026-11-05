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

export interface SourcesResponse {
    status: string;
    sources: NewsSource[];
}

export interface NewsSource {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface Article {
    source: Pick<NewsSource, 'name'> & { id: string | null };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface ArticlesResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}
