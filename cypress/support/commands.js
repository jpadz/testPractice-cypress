import gamePage from '../e2e/pages/gamePage'

Cypress.Commands.add('Guess', (guess) => {
  gamePage.typeGuessField(guess)
  gamePage.clickGuessButton()
})


Cypress.Commands.add('loadGuessNumber', (param) => {
  cy.visit(`https://mapleqa.com/js22/?randomParam=${param}`)
  // cy.visit(`https://mapleqa.com/${param}`)
})

// Cypress.Commands.add('loadGuessNumber23', (param) => {
//   cy.visit(`https://mapleqa.com/js23/?randomParam=${param}`)
// })
