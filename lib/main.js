exports.activate = function () {
  if (!atom.grammars.addInjectionPoint) return

  atom.grammars.addInjectionPoint('source.js', {
    type: 'call_expression',

    language (callExpression) {
      const {firstChild} = callExpression
      switch (firstChild.type) {
        case 'identifier':
          return languageStringForTemplateTag(firstChild.text)
        case 'member_expression':
          if (firstChild.startPosition.row === firstChild.endPosition.row) {
            return languageStringForTemplateTag(firstChild.text)
          }
      }
    },

    content (callExpression) {
      const {lastChild} = callExpression
      if (lastChild.type === 'template_string') {
        return lastChild
      }
    }
  })

  atom.grammars.addInjectionPoint('source.js', {
    type: 'assignment_expression',

    language (callExpression) {
      const {firstChild} = callExpression
      if (firstChild.type === 'member_expression') {
        if (firstChild.lastChild.text === 'innerHTML') {
          return 'html'
        }
      }
    },

    content (callExpression) {
      const {lastChild} = callExpression
      if (lastChild.type === 'template_string') {
        return lastChild
      }
    }
  })

  atom.grammars.addInjectionPoint('source.js', {
    type: 'regex_pattern',
    language (regex) { return 'regex' },
    content (regex) { return regex }
  })

  atom.grammars.addInjectionPoint('source.js', {
    type: 'comment',
    language (regex) { return 'comment' },
    content (comment) { return comment }
  })
}

const STYLED_REGEX = /\bstyled\b/i
const GRAPHQL_REGEX = /\gql\b/i

function languageStringForTemplateTag (tag) {
  if (STYLED_REGEX.test(tag)) {
    return 'CSS'
  } else if (GRAPHQL_REGEX.test(tag)) {
    return 'graphql'
  } else {
    return tag
  }
}
