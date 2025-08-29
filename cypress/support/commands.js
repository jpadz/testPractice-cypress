import gamePage from "../e2e/pages/gamePage"

Cypress.Commands.add('Guess', (type) => {
    gamePage.typeGuessField(type)
    gamePage.clickGuessButton()
})