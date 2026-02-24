import { Article } from '@/lib/types';

export const mockArticles: Article[] = [
	{
		source: { id: 'pbs-news', name: 'PBS News' },
		author: 'Adithi Ramakrishnan',
		title:
			'How horses whinny has long eluded scientists. A new study reveals the answer',
		description:
			'A new study reveals the unique dual-source vocalization technique that allows horses to produce their distinct neighs.',
		url:
			'https://www.pbs.org/newshour/science/how-horses-whinny-has-long-eluded-scientists-a-new-study-reveals-the-answer',
		urlToImage:
			'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=800',
		publishedAt: '2026-02-24T12:34:00Z',
		content: 'Horses whinny to find new friends...',
		category: 'Science',
	},
	{
		source: { id: 'cbs-news', name: 'CBS News' },
		author: 'CBS Staff',
		title:
			'Former U.K. ambassador Peter Mandelson arrested weeks after latest Epstein files release',
		description:
			"London's Metropolitan Police arrested the 72-year-old former diplomat...",
		url:
			'https://www.cbsnews.com/news/peter-mandelson-arrested-former-uk-ambassador-to-us-epstein-files/',
		urlToImage:
			'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800',
		publishedAt: '2026-02-23T16:00:00Z',
		content: 'Officers arrested the man in Camden on Monday...',
		category: 'Politics',
	},
	{
		source: { id: 'si', name: 'Sports Illustrated' },
		author: 'Jacob Punturi',
		title: 'Team USA Women Decline White House Invite',
		description:
			'After capturing gold at the 2026 Winter Olympics in Milan...',
		url:
			'https://www.si.com/onsi/breakaway/team-usa-women-decline-white-house-invite',
		urlToImage:
			'https://images.unsplash.com/photo-1580748141549-71748ddf0bdc?q=80&w=800',
		publishedAt: '2026-02-23T20:00:00Z',
		content: "USA Hockey cited 'timing...",
		category: 'Sports',
	},
	{
		source: { id: 'techmeme', name: 'Techmeme' },
		author: 'Lora Kolodny',
		title: 'Waymo opens its robotaxi service to 10 US cities',
		description:
			'Waymo is expanding operations to Dallas, Houston, San Antonio, and Orlando...',
		url: 'https://www.techmeme.com/260224/p4#a260224p4',
		urlToImage:
			'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=800',
		publishedAt: '2026-02-24T09:00:00Z',
		content: 'Waymo is opening service...',
		category: 'Technology',
	},
	{
		source: { id: 'reuters', name: 'Reuters' },
		author: 'Nikunj Ohri',
		title: 'Global Markets Rally as Inflation Hits 2-Year Low',
		description:
			'Stock indices across Europe and Asia saw a 2% jump today...',
		url:
			'https://www.reuters.com/business/markets-rally-inflation-data-2026-02-24/',
		urlToImage:
			'https://images.unsplash.com/photo-1611974717482-4828c3fc3b8c?q=80&w=800',
		publishedAt: '2026-02-24T10:15:00Z',
		content: 'Economists are optimistic...',
		category: 'Business',
	},
	{
		source: { id: 'the-verge', name: 'The Verge' },
		author: 'Andrew J. Hawkins',
		title: 'Apple Reveals "Glass Air" Augmented Reality Headset',
		description:
			'Apple has finally announced its long-rumored lightweight AR glasses...',
		url: 'https://www.theverge.com/2026/2/24/apple-glass-air-announcement',
		urlToImage:
			'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=800',
		publishedAt: '2026-02-24T08:00:00Z',
		content: 'The Glass Air headset...',
		category: 'Technology',
	},
	{
		source: { id: 'nat-geo', name: 'National Geographic' },
		author: 'Sarah Gibbens',
		title: 'New Species of Deep-Sea Octopus Found in Mariana Trench',
		description:
			'Marine biologists have captured footage of a "ghost-like" octopus...',
		url:
			'https://www.nationalgeographic.com/science/article/new-deep-sea-octopus-2026',
		urlToImage:
			'https://images.unsplash.com/photo-1545331506-6248558b8a06?q=80&w=800',
		publishedAt: '2026-02-23T14:20:00Z',
		content: 'The creature, nicknamed...',
		category: 'Science',
	},
	{
		source: { id: 'espn', name: 'ESPN' },
		author: 'Jeff Passan',
		title: 'MLB Implements Fully Automated Strike Zone for 2026 Season',
		description:
			'Major League Baseball announced that "Robot Umpires" will handle balls...',
		url: 'https://www.espn.com/mlb/story/_/id/automated-strike-zone-2026',
		urlToImage:
			'https://images.unsplash.com/photo-1508344928928-7165b67de128?q=80&w=800',
		publishedAt: '2026-02-24T11:45:00Z',
		content: 'The decision comes...',
		category: 'Sports',
	},
	{
		source: { id: 'bbc-news', name: 'BBC News' },
		author: 'Katya Adler',
		title: 'EU Proposes Universal Basic Income Pilot for Member States',
		description:
			'A new legislative framework aims to test UBI in selected regions...',
		url: 'https://www.bbc.com/news/world-europe-684201',
		urlToImage:
			'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=800',
		publishedAt: '2026-02-24T07:30:00Z',
		content: 'The European Commission...',
		category: 'World',
	},
	{
		source: { id: 'wired', name: 'Wired' },
		author: 'Lauren Goode',
		title: 'The End of Passwords? Biometric Implants Gain Popularity',
		description:
			'A growing number of tech enthusiasts are opting for sub-dermal chips...',
		url: 'https://www.wired.com/story/biometric-implants-2026/',
		urlToImage:
			'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800',
		publishedAt: '2026-02-23T19:10:00Z',
		content: 'While security experts...',
		category: 'Technology',
	},
	{
		source: { id: 'the-guardian', name: 'The Guardian' },
		author: 'Oliver Holmes',
		title: 'Sahara Forest Project Reaches Massive Reforestation Milestone',
		description:
			'By using saltwater-cooled greenhouses, a vast area of the desert...',
		url:
			'https://www.theguardian.com/environment/2026/feb/sahara-forest-milestone',
		urlToImage:
			'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=800',
		publishedAt: '2026-02-24T13:00:00Z',
		content: 'The project now...',
		category: 'Science',
	},
	{
		source: { id: 'variety', name: 'Variety' },
		author: 'Cynthia Littleton',
		title: 'James Cameron Announces "Avatar 4" Filming is Complete',
		description:
			'The director confirmed that the fourth installment in the Pandora saga...',
		url: 'https://variety.com/2026/film/news/james-cameron-avatar-4-wrap',
		urlToImage:
			'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800',
		publishedAt: '2026-02-22T21:45:00Z',
		content: 'Cameron teased...',
		category: 'Entertainment',
	},
	{
		source: { id: 'space-com', name: 'Space.com' },
		author: 'Elizabeth Howell',
		title:
			'NASA’s Artemis V Mission Successfully Lands on Lunar South Pole',
		description:
			'Astronauts have begun establishing the first permanent lunar habitat...',
		url: 'https://www.space.com/artemis-v-moon-landing-success-2026',
		urlToImage:
			'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800',
		publishedAt: '2026-02-24T04:20:00Z',
		content: 'The mission marks...',
		category: 'Science',
	},
	{
		source: { id: 'bloomberg', name: 'Bloomberg' },
		author: 'Zeke Faux',
		title: 'Bitcoin Hits $150k as Institutional Adoption Surges',
		description:
			'The world’s largest cryptocurrency reached a new all-time high today...',
		url:
			'https://www.bloomberg.com/news/articles/2026-02-24/bitcoin-new-high-150k',
		urlToImage:
			'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=800',
		publishedAt: '2026-02-24T06:50:00Z',
		content: 'Analysts suggest...',
		category: 'Business',
	},
	{
		source: { id: 'al-jazeera', name: 'Al Jazeera' },
		author: 'Usaid Siddiqui',
		title: 'New Peace Treaty Signed in East Africa Summit',
		description:
			'Leaders from five nations have signed a historic agreement...',
		url:
			'https://www.aljazeera.com/news/2026/2/24/east-africa-peace-treaty',
		urlToImage:
			'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=800',
		publishedAt: '2026-02-24T09:30:00Z',
		content: 'The "Nairobi Accord"...',
		category: 'World',
	},
	{
		source: { id: 'rolling-stone', name: 'Rolling Stone' },
		author: 'Rob Sheffield',
		title: 'Daft Punk Reunites for "One Last Ride" Virtual Tour',
		description:
			'The legendary duo will return as hyper-realistic avatars...',
		url:
			'https://www.rollingstone.com/music/news/daft-punk-reunion-virtual-tour-2026',
		urlToImage:
			'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800',
		publishedAt: '2026-02-23T18:00:00Z',
		content: 'The tour will...',
		category: 'Entertainment',
	},
	{
		source: { id: 'scientific-american', name: 'Scientific American' },
		author: 'Tanya Lewis',
		title: 'First Successful Lab-Grown Heart Transplant Performed',
		description:
			'Surgeons in Switzerland have successfully transplanted a heart...',
		url:
			'https://www.scientificamerican.com/article/first-lab-grown-heart-transplant-2026',
		urlToImage:
			'https://images.unsplash.com/photo-1576086213369-97a306dca664?q=80&w=800',
		publishedAt: '2026-02-24T14:15:00Z',
		content: 'This breakthrough...',
		category: 'Science',
	},
	{
		source: { id: 'the-atlantic', name: 'The Atlantic' },
		author: 'Derek Thompson',
		title: 'The "Four-Day Work Week" is Now the Global Standard',
		description:
			'Two years after the massive 2024 trials, productivity data shows...',
		url:
			'https://www.theatlantic.com/ideas/archive/2026/02/four-day-work-week-success',
		urlToImage:
			'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=800',
		publishedAt: '2026-02-24T11:00:00Z',
		content: 'Companies are reporting...',
		category: 'Business',
	},
	{
		source: { id: 'hbr', name: 'Harvard Business Review' },
		author: 'Amy Bernstein',
		title: 'Managing the AI-Human Hybrid Workforce',
		description: 'As AI agents take over middle management roles...',
		url: 'https://hbr.org/2026/02/managing-ai-human-hybrid-workforce',
		urlToImage:
			'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800',
		publishedAt: '2026-02-23T15:45:00Z',
		content: 'The new corporate...',
		category: 'Technology',
	},
	{
		source: { id: 'vogue', name: 'Vogue' },
		author: 'Nicole Phelps',
		title: 'Digital-Only Fashion Week: Why Physical Runways are Fading',
		description:
			'High-fashion brands are shifting budgets toward ultra-detailed 3D clothing...',
		url: 'https://www.vogue.com/article/digital-only-fashion-week-2026',
		urlToImage:
			'https://images.unsplash.com/photo-1523381235312-df591785982c?q=80&w=800',
		publishedAt: '2026-02-24T10:00:00Z',
		content: 'Consumers are now...',
		category: 'Entertainment',
	},
];
