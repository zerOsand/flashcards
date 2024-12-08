function tagsMatchExpression(expression, tags) {
	const tokens = tokenize(expression)
	return evaluateExpression(tokens, tags)
}

function evaluateExpression(tokens, tags) {
    const stack = []

    for (const token of tokens) {
        if (['&', '|', '!', '^'].includes(token)) {
            stack.push(token)
        } else if (token === '(') {
            stack.push(token)
        } else if (token === ')') {
            let parenExpression = [];
            while (stack.length && stack[stack.length - 1] !== '(') {
                parenExpression.unshift(stack.pop())
            }
            stack.pop()
            const result = Descend(parenExpression)
            stack.push(result)
        } else {
            stack.push(tags.includes(token))
        }
    }

    return Descend(stack)
}

/**
 * Expression ::= Term '|' Term
 *            ::= Term '^' Term
 * Term       ::= Factor '&' Factor
 * Factor     ::= id
 *            ::= ! Factor
 */
function Descend(stack) {

	function Expression() {
		let left = Term()
		while (['|', '^'].includes(stack[0])) {
			const operator = stack.shift()
			const right = Term()
			if (operator === '|')
				left = left || right
			else {
				left = left != right
			}
		}
		return left
	}

	function Term() {
		let left = Factor()
		while (stack[0] === '&') {
			stack.shift()
			const right = Factor()
			left = left && right
		}
		return left
	}

	/**
	 * Evaluates to TRUE if
	 * input is invalid.
	 */
	function Factor() {
		let token = stack.shift()
		if (token === undefined) return true
		else if (token === '!')
			return !Factor()
		else if (typeof token === 'boolean')
			return token
		else
			return true
	}

	return Expression()
}

function tokenize(input) {
    const regex = /\s*(&|\||\^|!|[()])\s*|(\w+)/g;
    return input.match(regex).map(token => token.trim()).filter(token => token.length > 0);
}


export { tokenize, tagsMatchExpression }
