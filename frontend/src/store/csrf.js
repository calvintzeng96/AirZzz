import Cookies from "js-cookie";


export async function csrfFetch(url, options = {}) {
    //if no method, method = "GET"
    //if no header, header = {}
    options.method = options.method || "GET";
    options.headers = options.headers || {};

    //if method !== "GET", autoset "Content-Type" = "application/json"
    //also sets "XSRF-TOKEN" header to the "XSRF-TOKEN" cookie value
    if (options.method.toUpperCase() !== "GET") {
        options.headers["Content-Type"] =
            options.headers["Content-Type"] || "application/json";
        options.headers["XSRF-Token"] = Cookies.get("XSRF-TOKEN");
    }

    //call window.fetch, and test out res, see if status >=400 or not
    const res = await window.fetch(url, options);

    if (res.status >= 400) throw res;

    return res;
}


export function restoreCSRF() {
    return csrfFetch("/api/csrf/restore");
}
