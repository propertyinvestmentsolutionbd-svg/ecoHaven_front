// utils/fetchWithAuth.js
import { getNewAccessToken } from "./helper";

class FetchWithAuth {
  constructor() {
    this.retryCount = 0;
    this.maxRetries = 1;
  }

  async fetch(url, options = {}) {
    // Get access token from localStorage
    const accessToken = localStorage.getItem("accessToken");

    // Merge headers
    const headers = {
      ...options.headers,
      ...(accessToken && { Authorization: accessToken }),
    };

    const config = {
      ...options,
      headers,
      credentials: "include",
    };

    let response = await fetch(url, config);

    // Handle token refresh for 403 errors
    if (response.status === 403 && this.retryCount < this.maxRetries) {
      this.retryCount++;

      try {
        const newToken = await this.refreshToken();
        if (newToken) {
          // Retry the original request with new token
          headers.Authorization = newToken;
          response = await fetch(url, { ...config, headers });
        }
      } catch (error) {
        console.error("Token refresh failed:", error);
        this.redirectToLogin();
        throw error;
      } finally {
        this.retryCount = 0;
      }
    }

    // If still 403 after refresh, redirect to login
    if (response.status === 403) {
      this.redirectToLogin();
      throw new Error("Authentication failed");
    }

    return response;
  }

  async refreshToken() {
    try {
      const res = await getNewAccessToken();
      const newAccessToken = res?.data?.data?.accessToken;

      if (newAccessToken) {
        localStorage.setItem("accessToken", newAccessToken);
        return newAccessToken;
      }
      return null;
    } catch (error) {
      console.error("Refresh token failed:", error);
      this.redirectToLogin();
      return null;
    }
  }

  redirectToLogin() {
    localStorage.removeItem("accessToken");
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }

  // Convenience methods
  async get(url, options = {}) {
    return this.fetch(url, { ...options, method: "GET" });
  }

  async post(url, body, options = {}) {
    const isFormData = body instanceof FormData;

    return this.fetch(url, {
      ...options,
      method: "POST",
      body: isFormData ? body : JSON.stringify(body),
      headers: isFormData
        ? options.headers
        : {
            "Content-Type": "application/json",
            ...options.headers,
          },
    });
  }

  async put(url, body, options = {}) {
    const isFormData = body instanceof FormData;

    return this.fetch(url, {
      ...options,
      method: "PUT",
      body: isFormData ? body : JSON.stringify(body),
      headers: isFormData
        ? options.headers
        : {
            "Content-Type": "application/json",
            ...options.headers,
          },
    });
  }

  async delete(url, options = {}) {
    return this.fetch(url, { ...options, method: "DELETE" });
  }
}

export const fetchWithAuth = new FetchWithAuth();
