 class gamePage {
    guessButton = '[data-testid="guessButton"]'
    guessField = '#guessField'
    messageArea = '[data-testid="messageArea"]'
    previousGuess = '#guesses'
    attempts = '#showAttempts'
    website = 'http://mapleqa.com:8070/js22/?randomParam=12'
    reset = '#reset'

    clickGuessButton () {
        cy.get(this.guessButton).click()
    }
    typeGuessField(value) {
        cy.get(this.guessField).type(value)
        
    }
    guessButtonDisabled () {
        cy.get(this.guessButton).should('be.disabled')
    }
    displayMessage(value) {
        cy.get(this.messageArea).should('contain.text', value)
    }
    displayPreviousGuess(value) {
        cy.get(this.previousGuess).should('contain.text', value)
    }
    clear() {
        cy.get(this.guessField).clear()
    }
    focused() {
        cy.get(this.guessField).should('be.focused')
    }
    attemptsCount(value) {
        cy.get(this.attempts).should('contain.text',  value)
    }
    displayNoError() {
        cy.get(this.messageArea).should('not.contain', 'ERROR:')
    }
    loadPage() {
        cy.visit(this.website)
    }
    displayErrorMessage(){
        cy.get(this.messageArea).should('contain.text', 'ERROR:Input should be between 1 & 50')
    }
    notDisplayPreviousGuess(value) {
        cy.get(this.previousGuess).should('not.contain', value)
    }
    notCount() {
        cy.get(this.attempts).should('contain.text', ' / 10')
    }
    clickReset () {
        cy.get(this.reset).click()
    }
    initialLoad() {
        //Verify the card front displays "Guess the card value" and "**".
          cy.get('#frontCardTitle').should('contain.text', 'Guess the card value' )
          cy.get('#frontCardValue').should('contain.text','**')
        //Verify the input field `[data-testid="guessField"]` is empty, enabled, and has focus.
          cy.get(this.guessField).should('be.focused')
          cy.get('#guessField').should('be.empty')
          cy.get('#guessField').should('be.enabled')
        //Verify the `[data-testid="guessButton"]` button displays "GUESS" and is **disabled**.
          cy.get('[data-testid="guessButton"]').should('contain.text', 'GUESS').and('be.disabled')
        //Verify the `[data-testid="messageArea"]` is empty.
          cy.get('[data-testid="messageArea"]').should('be.empty')
        //Verify the `[data-testid="guesses"]` container is empty.
          cy.get('[data-testid="guesses"]').should('be.empty')
        //Verify the `[data-testid="showAttempts"]` attempts counter is in its initial state (e.g., " / 10").
          cy.get(`[data-testid="showAttempts"]`).should('contain.text', '')
    }
}
export default new gamePage()