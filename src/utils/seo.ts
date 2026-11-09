export const SITE_ORIGIN = "https://www.2xwin.com.hk";

/** Confirmed NAP. Do not add opening hours or extra phone numbers. */
export const LEGAL_NAME = "Double Win Marketing HK Limited／雙贏營銷香港有限公司";
export const BUSINESS_EMAIL = "info@2xwin.com";
export const PHONE_DIGITS = "85252232817";
export const PHONE_DISPLAY = "+852 5223 2817";
export const BUSINESS_ADDRESS =
	"Room 1003, 10/F, Office Tower Two, Grand Plaza, 625-639 Nathan Rd, Mong Kok, Kowloon";
export const GBP_URL = "https://share.google/sgANCXWx2fL8VlZAn";
export const FACEBOOK_URL = "https://www.facebook.com/2xwin.marketing";
export const INSTAGRAM_URL = "https://www.instagram.com/2xwin.marketing";
export const THREADS_URL = "https://www.threads.com/@2xwin.marketing";

const SAME_AS = [FACEBOOK_URL, INSTAGRAM_URL, THREADS_URL, GBP_URL];

function postalAddress() {
	return {
		"@type": "PostalAddress",
		streetAddress: "Room 1003, 10/F, Office Tower Two, Grand Plaza, 625-639 Nathan Rd",
		addressLocality: "Mong Kok",
		addressRegion: "Kowloon",
		addressCountry: "HK",
	};
}

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

export interface BreadcrumbItem {
	name: string;
	/** Site path such as `/faq`. JSON-LD resolves it to the www canonical URL. */
	path: string;
}

/** BreadcrumbList for a real trail. Every `path` must already exist on the site. */
export function breadcrumbListSchema(items: BreadcrumbItem[]) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: canonicalUrl(item.path),
		})),
	};
}

/** WebSite node. Publisher points at the Organization already emitted by Layout. */
export function websiteSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"@id": `${SITE_ORIGIN}/#website`,
		name: "Double Win Marketing",
		url: `${SITE_ORIGIN}/`,
		inLanguage: "zh-HK",
		publisher: { "@id": `${SITE_ORIGIN}/#organization` },
	};
}

/**
 * BlogPosting for an existing post. Author is the company, never a person.
 * Pass dateModified only when the page has a real revision date; otherwise
 * the caller should reuse datePublished or omit it.
 */
export function blogPostingSchema(post: {
	headline: string;
	description: string;
	url: string;
	image: string;
	datePublished: string;
	dateModified?: string;
}) {
	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.headline,
		description: post.description,
		image: post.image,
		datePublished: post.datePublished,
		...(post.dateModified ? { dateModified: post.dateModified } : {}),
		author: {
			"@type": "Organization",
			"@id": `${SITE_ORIGIN}/#organization`,
			name: "Double Win Marketing HK Limited",
			alternateName: ["2xWin", "Double Win Marketing"],
			url: `${SITE_ORIGIN}/`,
		},
		publisher: { "@id": `${SITE_ORIGIN}/#organization` },
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": post.url,
		},
		url: post.url,
		inLanguage: "zh-HK",
	};
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

/** HowTo for an existing page. Do not add cost, duration, or outcome guarantees. */
export function howToSchema(howto: {
	name: string;
	description: string;
	url?: string;
	steps: { name: string; text: string }[];
}) {
	return {
		"@context": "https://schema.org",
		"@type": "HowTo",
		name: howto.name,
		description: howto.description,
		inLanguage: "zh-HK",
		...(howto.url ? { url: howto.url } : {}),
		step: howto.steps.map((step, index) => ({
			"@type": "HowToStep",
			position: index + 1,
			name: step.name,
			text: step.text,
		})),
	};
}

export function organizationSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		"@id": `${SITE_ORIGIN}/#organization`,
		name: LEGAL_NAME,
		alternateName: ["Double Win Marketing", "2xWin"],
		url: `${SITE_ORIGIN}/`,
		logo: `${SITE_ORIGIN}/logo.png`,
		email: BUSINESS_EMAIL,
		telephone: PHONE_DISPLAY,
		description: "幫中小企擺脫黑箱 Agency，用透明 Meta 廣告穩陣放大生意。",
		address: postalAddress(),
		sameAs: SAME_AS,
		contactPoint: {
			"@type": "ContactPoint",
			telephone: PHONE_DISPLAY,
			email: BUSINESS_EMAIL,
			contactType: "customer service",
			areaServed: "HK",
			availableLanguage: ["en", "zh-Hant"],
		},
	};
}

export function localBusinessSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "LocalBusiness",
		"@id": `${SITE_ORIGIN}/#localbusiness`,
		name: LEGAL_NAME,
		url: `${SITE_ORIGIN}/`,
		logo: `${SITE_ORIGIN}/logo.png`,
		image: `${SITE_ORIGIN}/logo.png`,
		email: BUSINESS_EMAIL,
		telephone: PHONE_DISPLAY,
		address: postalAddress(),
		sameAs: SAME_AS,
		parentOrganization: { "@id": `${SITE_ORIGIN}/#organization` },
	};
}
