import { ClerkAPIError } from '@clerk/types'

interface ParserErrors {
	fieldErrors: ClerkAPIError[]
	globalErrors: ClerkAPIError[]
}

export function parseErrors(errors: ClerkAPIError[]): ParserErrors {
	return (errors || []).reduce(
		(memo, err) => {
			if (err.meta!.paramName && err.meta?.paramName !== 'identifier') {
				memo.fieldErrors.push(err)
			} else {
				memo.globalErrors.push(err)
			}
			return memo
		},
		{
			fieldErrors: Array<ClerkAPIError>(0),
			globalErrors: Array<ClerkAPIError>(0)
		}
	)
}
