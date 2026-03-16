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

The project follows the Next.js 15 App Router conventions. Below are the key components that power the Daily Digest experience:

```text
├── components/
│   ├── ArticleSummary.tsx  # Renders AI-generated summaries using react-markdown
│   ├── BackButton.tsx      # Client-side navigation with hover animations
│   ├── BrandSpinner.tsx    # Custom dual-ring loading animation (Daily & Digest)
│   ├── CategoryBar.tsx     # Horizontal scrollable navigation with drag-to-scroll
│   ├── HeroArticle.tsx     # Featured full-width article with gradient overlays
│   ├── NewsCard.tsx        # Responsive article card with line-clamping and badges
│   ├── NewsTicker.tsx      # Fixed bottom "Breaking News" scrolling banner
│   ├── Pagination.tsx      # Page navigation logic for categories and search
│   ├── SafeImage.tsx       # Next.js Image wrapper with Base64 SVG error handling
│   └── SearchBar.tsx       # URL-synced search input with history management
├── app/
│   ├── article/[id]/       # Dynamic article detail pages
│   ├── news/[category]/    # Server-rendered category news feeds
│   └── search/             # Keyword-based search results
├── stores/
│   └── useNewsStore.ts     # Zustand state for global search queries and article data
└── lib/
    ├── utils.ts            # Slug generation and Tailwind formatting helpers
    └── types.ts            # TypeScript interfaces for NewsAPI responses
```

## 🧩 Component Highlights

### 1. Drag-to-Scroll Category Bar (`CategoryBar.tsx`)

To provide a fluid, mobile-like experience on desktop, the `CategoryBar` uses a custom `requestAnimationFrame` implementation. This decouples the event frequency from DOM updates, allowing users to click and drag through news categories smoothly.

````typescript
const handleMouseMove = (e: React.MouseEvent) => {
  if (!isDragging || !scrollRef.current) return;
  e.preventDefault();

  requestAnimationFrame(() => {
    if (!scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  });
};
---

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
````

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

## 🧪 Testing Suite

Daily Digest implements a rigorous testing strategy focusing on component reliability, state synchronization, and performance optimizations.

### 1. Component & Integration Testing

We use **Vitest** to ensure UI components behave correctly across different states. Key test areas include:

-   **Navigation Logic**: Verifying that `BackButton` and `NewsCard` trigger the correct router events.
-   **Store Synchronization**: Ensuring that clicking a headline correctly populates the Zustand store.
-   **State Persistence**: Testing that search queries and article data persist correctly through the middleware.

### 2. High-Performance Image Mocking

To prevent Next.js's Image Optimization from breaking unit tests, we use a custom mocking strategy for `next/image`. This allows us to verify that critical performance props like `priority` and `fill` are passed correctly without the overhead of the Next.js loader.

```typescript
vi.mock('next/image', () => ({
	__esModule: true,
	default: ({ src, alt, priority, fill, ...props }: any) => (
		<img
			src={src}
			alt={alt}
			data-priority={priority ? 'true' : 'false'}
			data-fill={fill ? 'true' : 'false'}
			{...props}
		/>
	),
}));
```

## 🎭 End-to-End Testing (Playwright)

We use Playwright to simulate real user behavior across multiple browsers (Chrome, Firefox, Safari).

-   **Navigation Flows**: Testing the hand-off between Search results and Article details.
-   **Responsive Layouts**: Verifying that the `NewsTicker` and `CategoryBar` remain functional on mobile viewports.
-   **URL State**: Ensuring `URLSearchParams` are correctly updated and handled by the server.

```bash
# Run E2E tests
npx playwright test

# Open Playwright UI (Trace Viewer)
npx playwright test --ui
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

```

```
