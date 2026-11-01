import { Callback, Endpoint, FetchGetParams, HttpMethod, RequestParams } from './loader.dto';

class Loader {
    private baseLink: string = '';
    private options: Readonly<Pick<FetchGetParams, 'apiKey'>>;

    constructor(baseLink: string, options: Readonly<Pick<FetchGetParams, 'apiKey'>>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T>(
        { endpoint, options = {} }: RequestParams,
        callback: Callback<T> = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>('GET', endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    typedKeys<T extends object>(obj: T): Array<keyof T> {
        return Object.keys(obj) as Array<keyof T>;
    }

    makeUrl(options: Partial<FetchGetParams>, endpoint: string): string {
        const urlOptions: Partial<FetchGetParams> = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        const keys = this.typedKeys(urlOptions);

        keys.forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load<T>(method: HttpMethod, endpoint: Endpoint, callback: Callback<T>, options: Partial<FetchGetParams>): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
