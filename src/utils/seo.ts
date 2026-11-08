export const SITE_ORIGIN = "https://www.2xwin.com.hk";

export const DEFAULT_DESCRIPTION =
	"幫中小企擺脫黑箱 Agency，用透明 Meta 廣告穩陣放大生意。唔靠花巧術語，唔靠死約留客。由商業分析、帳戶透明，到投放節奏，都會同你講人話、講真話。";

export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og.jpg`;

/** Production canonical, independent of the GitHub Pages `base` used in some builds. */
export function canonicalUrl(pathname: string): string {
	const base = import.meta.env.BASE_URL || "/";
	const basePrefix = base.endsWith("/") ? base.slice(0, -1) : base;
	let path = pathname || "/";

	if (basePrefix && basePrefix !== "/" && (path === basePrefix || path.startsWith(`${basePrefix}/`))) {
		path = path.slice(basePrefix.length) || "/";
	}

	if (!path.startsWith("/")) path = `/${path}`;
	if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);

	return path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
}

export function jsonLd(data: unknown): string {
	return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function faqPageSchema(items: { question: string; answer: string }[]) {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: items.map((item) => ({
			"@type": "Question",
			name: item.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: item.answer,
			},
		})),
	};
}

export function organizationSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "Double Win Marketing",
		alternateName: "2xWin",
		url: `${SITE_ORIGIN}/`,
		logo: `${SITE_ORIGIN}/logo.png`,
		email: "info@2xwin.com",
		description: "幫中小企擺脫黑箱 Agency，用透明 Meta 廣告穩陣放大生意。",
		sameAs: [
			"https://www.facebook.com/2xwin.marketing",
			"https://www.instagram.com/2xwin.marketing",
		],
		contactPoint: {
			"@type": "ContactPoint",
			telephone: "+852-5223-2817",
			contactType: "customer service",
			areaServed: "HK",
			availableLanguage: ["en", "zh-Hant"],
		},
	};
}
