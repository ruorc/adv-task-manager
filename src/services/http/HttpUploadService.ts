import { HttpBaseService } from './HttpBaseService';

import type { HttpTransactionOptions } from './HttpBaseService';

export type { HttpTransactionOptions };

/**
 * Abstract service providing robust multi-part binary and form payload transmission workflows over HTTP transport.
 */
export abstract class HttpUploadService extends HttpBaseService {
  /**
   * Dispatches binary and multi-part form payloads to specified API endpoints.
   */
  protected async upload<T>(
    endpoint: string,
    formData: FormData,
    options?: HttpTransactionOptions
  ): Promise<T> {
    const targetUrl = this.urlManager.resolve(endpoint).toString();

    try {
      return await this.request<T>(targetUrl, {
        method: 'POST',
        body: formData,
        signal: options?.signal,
        timeout: options?.timeout,
      });
    } catch (error) {
      throw await this.handleError(
        error,
        `Failed to upload data payload to endpoint: ${endpoint}`
      );
    }
  }

  /**
   * Performs partial updates using multi-part form payloads.
   */
  protected async patchForm<T>(
    endpoint: string,
    formData: FormData,
    options?: HttpTransactionOptions
  ): Promise<T> {
    const targetUrl = this.urlManager.resolve(endpoint).toString();

    try {
      return await this.request<T>(targetUrl, {
        method: 'PATCH',
        body: formData,
        signal: options?.signal,
        timeout: options?.timeout,
      });
    } catch (error) {
      throw await this.handleError(
        error,
        `Failed to patch data payload at endpoint: ${endpoint}`
      );
    }
  }
}
