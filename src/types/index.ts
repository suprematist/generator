export interface Author {
	fullname: string
	hashtags: string[]
	alias?: string
}

export interface AuthorsList {
	[key: string]: Author
}

export type Hashtags = string[]
