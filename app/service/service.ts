type HTTP = {
  get<T>(url: string, config?: RequestInit): Promise<T>;
  delete<T>(url: string, config?: RequestInit): Promise<T>;
  head<T>(url: string, config?: RequestInit): Promise<T>;
  options<T>(url: string, config?: RequestInit): Promise<T>;
  post<T>(url: string, data?: unknown, config?: RequestInit): Promise<T>;
  put<T>(url: string, data?: unknown, config?: RequestInit): Promise<T>;
  patch<T>(url: string, data?: unknown, config?: RequestInit): Promise<T>;
};

class Service {
  public http: HTTP;

  private baseURL: string;

  private headers: Record<string, string>;

  constructor() {
    this.baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}`;
    this.headers = {
      "Content-Type": "application/json",
    };
    this.http = {
      get: this.get.bind(this),
      delete: this.delete.bind(this),
      post: this.post.bind(this),
      put: this.put.bind(this),
      patch: this.patch.bind(this),
      head: this.head.bind(this),
      options: this.options.bind(this),
    };
  }

  private async request<T = unknown>(
    method: string,
    url: string,
    data?: unknown,
    config?: RequestInit,
  ): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}${url}`, {
        method,
        headers: { ...this.headers, "Content-Type": "application/json", ...config?.headers },
        body: data ? JSON.stringify(data) : undefined,
        ...config,
      });

      if (!response.ok) {
        throw new Error(`Network response error: ${response.statusText}`);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error: unknown) {
      console.error(error);
      throw error;
    }
  }

  private get<T>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>("GET", url, undefined, config);
  }

  private delete<T>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>("DELETE", url, undefined, config);
  }

  private post<T>(url: string, data?: unknown, config?: RequestInit): Promise<T> {
    return this.request<T>("POST", url, data, config);
  }

  private put<T>(url: string, data?: unknown, config?: RequestInit): Promise<T> {
    return this.request<T>("PUT", url, data, config);
  }

  private patch<T>(url: string, data?: unknown, config?: RequestInit): Promise<T> {
    return this.request<T>("PATCH", url, data, config);
  }

  private head<T>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>("HEAD", url, undefined, config);
  }

  private options<T>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>("OPTIONS", url, undefined, config);
  }
}

export default Service;
