import Markdown from 'react-markdown';

export default function ArticleSummary({ content }: { content: string }) {
	if (!content) return null;

	return (
		<div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
			{/* This is your ONLY title */}
			{/* <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">
				AI Summary
			</h3> */}

			<article className="prose prose-slate prose-sm max-w-none prose-p:mt-0 prose-ul:mt-0">
				<Markdown>{content}</Markdown>
			</article>
		</div>
	);
}
