/**
 * Evaluates a search expression against a list of tags.
 * It tokenizes the expression and uses logical operators (`&`, `|`, `^`, `!`) 
 * to check if the tags match the expression.
 * 
 * @param {string} expression - The search expression with logical operators and tag names.
 * @param {string[]} tags - The list of tags to compare against the expression.
 * 
 * @returns {boolean} `true` if the tags match the expression, otherwise `false`.
 */
function tagsMatchExpression(expression, tags) {
	const tokens = tokenize(expression)
	return evaluateExpression(tokens, tags)
}

/**
 * Processes tokens and evaluates a logical expression 
 * using operators like AND (`&`), OR (`|`), XOR (`^`), and NOT (`!`).
 * 
 * @param {string[]} tokens - The list of tokens representing the logical expression.
 * @param {string[]} tags - The tags to match against the tokens.
 * 
 * @returns {boolean} The result of the logical expression.
 */
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
 * Processes the logical expression, 
 * applying logical operations based on the following
 * grammar:
 *
 * Expression ::= Term '|' Term
 *            ::= Term '^' Term
 * Term       ::= Factor '&' Factor
 * Factor     ::= id
 *            ::= ! Factor
 * 
 * @param {Array} stack - The tokens to evaluate.
 * 
 * @returns {boolean} The result of the evaluated expression.
 */
function Descend(stack) {

	/**
     * Parses and evaluates a logical OR (`|`) or XOR (`^`) expression.
     * 
     * @returns {boolean} The result of the evaluated expression.
     */
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

	/**
     * Parses and evaluates AND (`&`) expressions.
     * 
     * @returns {boolean} The result of the evaluated term.
     */
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
     * Processes individual tokens and applies the NOT (`!`) operator.
     * Returns `true` if the token is invalid.
     * 
     * @returns {boolean} The result of the evaluated factor.
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

/**
 * Splits a string expression into individual tokens (operators, tags, parentheses).
 * 
 * @param {string} input - The expression to tokenize.
 * 
 * @returns {string[]} An array of tokens from the input string.
 */
function tokenize(input) {
    const regex = /\s*(&|\||\^|!|[()])\s*|(\w+)/g;
    return input.match(regex).map(token => token.trim()).filter(token => token.length > 0);
}


export { tokenize, tagsMatchExpression }
