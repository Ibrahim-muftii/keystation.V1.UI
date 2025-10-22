(The file `e:\Key_Station_mine\Frontend\keystation.ui\Readme Folder\Authentication.md` exists, but is empty)
# Authentication — project documentation

This document describes how authentication is implemented in this Next.js + Redux (RTK) application, where related files live, and how the client-side flows are wired to the server API.

Summary of key pieces
- Services: `src/services/Authentication.services.ts` — functions that call backend endpoints to register and login.
- Redux slice: `src/slicer/user.slicer.ts` — stores the current user (and a placeholder action for access token).
- Store & persistence: `src/store/store.ts` — Redux store configured with `redux-persist` to save the `user` slice to localStorage.
- Interceptor: `src/lib/interceptor.ts` — Axios instance (`api`) with request/response interceptors (401 refresh logic scaffolded but commented).
- Components: Login and Register forms live in `src/app/(authentication)/...` and call the service functions.
- SSR guard: `src/app/SsrWrapper.tsx` — server-side redirect guard that checks `AccessToken` cookie and redirects to `/login` if absent.
- Local storage helper: `src/utilities/localStorage.tsx` — small helper to save user and token to localStorage (currently minimal).

What the code does (flow)
1. Register
	- `src/app/(authentication)/register/RegisterComponents/RegisterForm.tsx` collects first name, last name, email, password and confirm_password.
	- It calls `registerUser(registeration)` from `src/services/Authentication.services.ts`.
	- `registerUser` builds the URL using `process.env.NEXT_PUBLIC_SERVER_URL + '/authentication/register'` and POSTs the data using axios.
	- On success the response is expected to contain at least: `{ user, access_token, message }`. The form dispatches `setUser(response.user)` and `setAccessToken(response.access_token)` then navigates to `/`.

2. Login
	- `src/app/(authentication)/login/LoginComponents/LoginForm.tsx` collects email and password and calls `loginUser(login)`.
	- `loginUser` posts to `process.env.NEXT_PUBLIC_SERVER_URL + '/authentication/login'`.
	- On success the expected response shape is `{ user, access_token, message }`. The component dispatches `setUser(response.user)` and `setAccessToken(response.access_token)`, then navigates to `/`.

3. Token & persistence
	- The `user` slice is persisted to `localStorage` via `redux-persist` (see `src/store/store.ts`). The persisted key is `root` and the reducer saves the entire `user` slice.
	- The `user.slicer.ts` stores the user object in redux. `setAccessToken` currently is a no-op (it logs state and returns state). The code still dispatches it — a place to extend to actually store tokens (in memory, cookie or localStorage).
	- There's also `src/utilities/localStorage.tsx` with `saveUserToLocalStorage(user, accessToken)` which writes `AccessToken` and `User` to `localStorage`. It's not currently used by the forms.

4. SSR guard
	- `src/app/SsrWrapper.tsx` runs on the server to check cookies (Next.js app router). It reads `AccessToken` cookie and redirects to `/login` when missing. If token exists and user attempts to open `/login` or `/register`, it redirects to `/`.
	- This relies on a cookie named `AccessToken` being set by the backend. The client-side code currently sets tokens in redux (and optionally localStorage) but does not set cookies — cookie setting must be performed by the server response (Set-Cookie) or by additional client code.

5. Axios interceptor and refresh token
	- `src/lib/interceptor.ts` defines `api = axios.create({ baseURL: serverUrl, withCredentials: true })`.
	- Response interceptor checks for 401 and contains scaffolded refresh-token logic (commented). If you plan to support refresh tokens, this is the place to implement calls to a refresh endpoint and retry the original request.

Expected API contract (client assumptions)
- POST /authentication/register
  - Request body: { first_name, last_name, email, password, confirm_password }
  - Success response: { user, access_token, message }

- POST /authentication/login
  - Request body: { email, password }
  - Success response: { user, access_token, message }

Notes about implementation details & gaps
- Access token storage is inconsistent:
  - Redux slice only stores `user`. `setAccessToken` action doesn't save the token anywhere.
  - `localStorage.saveUserToLocalStorage` exists but is unused; it also stores `User` as-is (should stringify).
  - SSR guard expects a cookie `AccessToken` to exist. The current client code doesn't set cookies. For SSR/edge-safe auth, prefer server-set HttpOnly cookies.

- Error handling:
  - Services unwrap axios errors and throw Error objects with messages from `error.response?.data.message` or a fallback string. Components show these via `toast`.

- Interceptor refresh flow is commented out. If your backend supports refresh tokens, implement the refresh endpoint call and retry logic there. On failing refresh, clear persisted auth and redirect to login.

Files and purpose (quick reference)
- `src/services/Authentication.services.ts` — registerUser, loginUser. Uses axios and process.env.NEXT_PUBLIC_SERVER_URL.
- `src/slicer/user.slicer.ts` — Redux slice: actions { setUser, setAccessToken, clearUser }. Persists user state.
- `src/store/store.ts` — Configure store with `redux-persist` and export `store`, `persistor`.
- `src/app/(authentication)/register/RegisterComponents/RegisterForm.tsx` — register form UI and client logic.
- `src/app/(authentication)/login/LoginComponents/LoginForm.tsx` — login form UI and client logic.
- `src/lib/interceptor.ts` — axios instance with interceptor scaffold.
- `src/utilities/localStorage.tsx` — helper to save token and user to localStorage (needs improvement).
- `src/app/SsrWrapper.tsx` — server-side check for `AccessToken` cookie and redirects.

Recommended improvements / next steps
1. Decide token storage strategy
	- Server-set HttpOnly cookie (recommended): Set tokens as cookies from server responses (Set-Cookie). This works best with SSR and reduces XSS risk.
	- If using localStorage: store access token safely and be aware of XSS risks. Keep refresh tokens only in HttpOnly cookies.

2. Make `setAccessToken` persist the token in redux or localStorage (or remove if token is cookie-only).

3. Use `saveUserToLocalStorage` properly (JSON.stringify user) or remove it to avoid inconsistent storage.

4. Implement refresh token flow in `src/lib/interceptor.ts`. On 401 try refresh endpoint, update storage, and retry original request. On failure, clear persisted store and redirect to login.

5. Add unit tests for services (mock axios) and e2e test for login and register flows.

6. Small fixes found in code
	- `saveUserToLocalStorage` stores `User` without JSON.stringify — that will coerce to [object Object]. Fix by stringifying the user object.
	- Consider renaming `RegisterationIt` to `RegistrationIt` for spelling consistency (optional).

How to validate locally
1. Ensure NEXT_PUBLIC_SERVER_URL is set in your environment (.env.local) e.g.:

	NEXT_PUBLIC_SERVER_URL=http://localhost:4000

2. Start the Next.js dev server and the backend. Then try registering and logging in via the UI.

3. Use browser devtools to inspect cookies and localStorage to confirm where the token is being stored. If your server returns Set-Cookie, you should see an HttpOnly cookie (not accessible by JS) and `withCredentials` must be used on requests.

4. To test axios interceptor refresh, mock a 401 from the server and verify the refresh path in `src/lib/interceptor.ts` runs and retries the original request.

Quick code snippets (fixes to consider)
- saveUserToLocalStorage (fix stringify):

  export const saveUserToLocalStorage = (user:any, accessToken:string) => {
		localStorage.setItem("AccessToken", accessToken);
		localStorage.setItem("User", JSON.stringify(user));
  }

Completion
This file was generated from the current codebase files in `src/` and reflects the existing behavior and gaps. If you'd like, I can: implement the small fixes (stringify localStorage), wire setAccessToken to persist token, or implement the refresh-token flow in the interceptor and add tests. Tell me which next step you'd like me to take.
