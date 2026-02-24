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
		content:
			'Horses whinny to find new friends, greet old ones and celebrate happy moments. How exactly they produce that sound has long eluded scientists. [+600 chars]',
	},
	{
		source: { id: 'cbs-news', name: 'CBS News' },
		author: 'CBS Staff',
		title:
			'Former U.K. ambassador Peter Mandelson arrested weeks after latest Epstein files release',
		description:
			"London's Metropolitan Police arrested the 72-year-old former diplomat on suspicion of misconduct in public office.",
		url:
			'https://www.cbsnews.com/news/peter-mandelson-arrested-former-uk-ambassador-to-us-epstein-files/',
		urlToImage:
			'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800',
		publishedAt: '2026-02-23T16:00:00Z',
		content:
			'Officers arrested the man in Camden on Monday. This follows search warrants at addresses in Wiltshire and Camden. Mandelson has been released on bail. [+500 chars]',
	},
	{
		source: { id: 'si', name: 'Sports Illustrated' },
		author: 'Jacob Punturi',
		title: 'Team USA Women Decline White House Invite',
		description:
			"After capturing gold at the 2026 Winter Olympics in Milan, the U.S. women's hockey team has declined an invitation to the State of the Union address.",
		url:
			'https://www.si.com/onsi/breakaway/team-usa-women-decline-white-house-invite',
		urlToImage:
			'https://images.unsplash.com/photo-1580748141549-71748ddf0bdc?q=80&w=800',
		publishedAt: '2026-02-23T20:00:00Z',
		content:
			"USA Hockey cited 'timing and previously scheduled academic and professional commitments' as the reason the athletes are unable to participate. [+400 chars]",
	},
	{
		source: { id: 'techmeme', name: 'Techmeme' },
		author: 'Lora Kolodny',
		title: 'Waymo opens its robotaxi service to 10 US cities',
		description:
			'Waymo is expanding operations to Dallas, Houston, San Antonio, and Orlando, bringing its total footprint to 10 major markets.',
		url: 'https://www.techmeme.com/260224/p4#a260224p4',
		urlToImage:
			'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=800',
		publishedAt: '2026-02-24T09:00:00Z',
		content:
			"Waymo is opening service to 'select riders' in four new Texas and Florida cities. This marks a significant nationwide expansion for the Alphabet subsidiary. [+550 chars]",
	},
];
