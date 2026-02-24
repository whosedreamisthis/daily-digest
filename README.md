# 📰 Daily Digest News Portal

A modern, high-performance news aggregation platform built with **Next.js 15**, featuring dynamic routing, localized search, and native mobile sharing capabilities.

## 🚀 Features

-   **Dynamic Category Routing**: Optimized server-side filtering for various news segments (Technology, Science, Business, etc.).
-   **Advanced Search System**: A persistent search experience using `URLSearchParams` and `router.replace` to manage browser history efficiently.
-   **Robust Image Handling**: Custom `SafeImage` component with Base64 SVG fallbacks to prevent broken layouts from external API images.
-   **Native Web Share**: Integration with the Web Share API for mobile users and "Click-to-Clipboard" functionality for desktop.
-   **Smart Pagination**: Synchronized server-side pagination math to ensure consistent data slicing across mock and live environments.
-   **SEO Ready**: Dynamic metadata generation for improved search engine indexing and social media previews.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **State Management**: [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **UI Components**: [Radix UI](https://www.radix-ui.com/) / Shadcn UI

## 📦 Installation

1. **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/daily-digest.git](https://github.com/your-username/daily-digest.git)
    ```

## 📖 Usage

### Running Locally

1. Start the development server: `npm run dev`
2. Open [http://localhost:3000](http://localhost:3000) with your browser.
3. Use the sidebar to filter news by categories like **Technology**, **Business**, or **Science**.

### Search Functionality

Type any keyword into the search bar. The app will update the URL in real-time.

-   Pressing **Enter** on desktop or **Search** on mobile will commit the search to the history stack.
-   Navigating pages will update the `?page=` parameter without refreshing the entire application state.

## 📂 Project Structure

```text
├── app/
│   ├── (auth)/           # Authentication routes (Login/Signup)
│   ├── article/[id]/     # Dynamic article detail pages
│   ├── news/[category]/  # Dynamic category listing
│   ├── search/           # Search results page
│   ├── layout.tsx        # Global providers and navigation
│   └── page.tsx          # Homepage (Featured/Trending news)
├── components/
│   ├── ui/               # Base Shadcn/Radix components
│   ├── NewsCard.tsx      # Main article preview component
│   ├── SafeImage.tsx     # Image fallback wrapper
│   └── Pagination.tsx    # Logic for page switching
├── hooks/                # Custom React hooks (useScroll, etc.)
├── lib/                  # Utility functions and API clients
└── stores/               # Zustand state management
```

## 🧩 Key Component Logic

### 1. Robust Image Handling (`SafeImage.tsx`)

To handle inconsistent image data from third-party APIs, the app uses a `SafeImage` wrapper. This prevents `404` and `400` errors in the console by pre-validating sources and providing an encoded Base64 SVG fallback that works even without local assets.

```tsx
// Key Logic: Client-side error interception
const [imgSrc, setImgSrc] = useState<string>(src || FALLBACK_IMAGE);

const handleError = () => {
	setImgSrc(FALLBACK_IMAGE);
};

return (
	<Image
		src={imgSrc}
		onError={handleError}
		unoptimized={imgSrc.startsWith('data:')}
		{...props}
	/>
);
```

### 2. Search History & State Management

The search bar implements a "Smart History" logic to distinguish between a **context shift** (moving from Home to Search) and a **query refinement** (adjusting keywords while already on the Search page). This prevents "history bloating," ensuring the user doesn't have to click the browser's back button dozens of times to return to the homepage.

#### Implementation Logic:

We check the current `pathname`. If the user is already on the `/search` route, we use `router.replace` to overwrite the current history entry. If they are anywhere else, we use `router.push` to create a new entry.

```typescript
const handleSearch = (e: React.FormEvent) => {
	e.preventDefault();

	// Ensure the query is URL-safe
	const url = `/search?q=${encodeURIComponent(query)}`;

	// Smart Navigation Logic:
	// 1. If already on search page: 'replace' the URL to avoid history clutter.
	// 2. If on home/category page: 'push' the URL to allow going back to home.
	if (window.location.pathname === '/search') {
		router.replace(url);
	} else {
		router.push(url);
	}
};
```

## 📦 Installation & Setup

Follow these steps to get your local development environment running.

### 1. Clone the Repository

Start by cloning the project to your local machine:

```bash
git clone [https://github.com/your-username/daily-digest.git](https://github.com/your-username/daily-digest.git)
cd daily-digest
```

### 2. Install Dependencies

This project uses **npm**, but you can also use **yarn** or **pnpm**:

```bash
npm install
```

### 3. Environment Configuration

The app requires an API key from your news provider.

1. Create a `.env.local` file in the root directory.
2. Add your API key and site URL:

```env
# .env.local
NEWS_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Start the Development Server

Run the following command to start the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the live results.

### 5. Build for Production

To create an optimized production build:

```bash
npm run build
npm run start
```

---

## 🛠 Troubleshooting

-   **API Limits**: If news content fails to load, check if your API key has reached its daily request quota.
-   **Image 404s**: If images are missing, ensure the external domains are added to `remotePatterns` in your `next.config.ts`.
-   **Hydration Errors**: Ensure that `SafeImage` uses `useEffect` for state changes to prevent mismatches between server and client.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

_Built with ❤️ for a faster, cleaner news experience._
