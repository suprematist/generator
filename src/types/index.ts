export interface Author {
	fullname: string
	hashtags: string[]
	alias?: string
}

export type AuthorsList = Record<string, Author>

export type Hashtags = string[]
