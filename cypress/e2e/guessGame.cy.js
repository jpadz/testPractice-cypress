///<reference types="cypress" />
import gamePage from './pages/gamePage'

describe('Guess Game Home Page', () => {
  beforeEach(() => {
    // gamePage.loadPage()//
    cy.loadGuessNumber(12)
  })
  it.only('TS888-001: Verify Initial Application State on Load', () => {
    // gamePage.initialLoad()
    gamePage.getButtonGuess().should('have.text', 'GUESS')
    gamePage.getGuessField1()
    gamePage.getGuessField2()
    gamePage.getGuessField3()
  })
  it('**TS888-002: Verify "GUESS" Button Enables/Disables with Input', () => {
    //1.  Observe the initial state of the "GUESS" button.
    //*   Verify it is **disabled**.
    gamePage.guessButtonDisabled()
    //2.  Enter the value "1" into the input field.
    gamePage.typeGuessField('1')
    //*   Verify the button becomes **enabled**.
    cy.get('[data-testid="guessButton"]').should('be.enabled')
    //3.  Clear the input field.
    gamePage.clear()
    //*   Verify the button becomes **disabled** again.
    gamePage.guessButtonDisabled()
  })
  it('TS888-003: Verify Correct Guess on First Attempt (Win Condition)', () => {
    //1.  Enter the correct number `12`.
    gamePage.typeGuessField('12')
    //2.  Click the "GUESS" button.
    gamePage.clickGuessButton()
    //*   Verify the card flips (element `#card` has class `flipped`), revealing the number 12.
    cy.get('.flipped').should('contain.text', '12')
    //*   Verify the message area displays: **"Congratulations! You guessed the number!"**.
    gamePage.displayMessage('Congratulations! You guessed the number!')
    //*   Verify the "GUESS" button is replaced with a "RESET" button.
    cy.get('[data-testid="reset"]').should('contain.text', 'RESET')
    //*   Verify the guess `12` appears in the previous guesses area with a special `.guessed` class.
    gamePage.displayPreviousGuess('12')
    //*   Verify the input field is disabled.
    cy.get('#guessField').should('be.disabled')
    //*   Verify the attempts counter shows **"1 / 10"**.
    gamePage.attemptsCount('1 / 10')
  })
  it('TS888-004: Verify "My number is larger" Feedback (Too Low)', () => {
    //1.  Enter a valid number less than 12 (e.g., `5`).
    gamePage.typeGuessField('5')
    //2.  Click the "GUESS" button.
    gamePage.clickGuessButton()
    //cy.get('[data-testid="guessButton"]').click()
    //*   Verify the message area displays: **"My number is larger.\n Try Again!"**.
    gamePage.displayMessage('My number is larger. Try Again!')
    //*   Verify the guess `5` is added to the previous guesses list.
    gamePage.displayPreviousGuess('5')
    //*   Verify the attempts counter increments (e.g., to "1 / 10").
    gamePage.attemptsCount('1 / 10')
    //*   Verify the input field is cleared and retains focus.
    gamePage.clear()
    gamePage.focused()
  })
  it('TS888-005: Verify "My number is smaller" Feedback (Too High)', () => {
    //1.  Enter a valid number greater than 12 (e.g., `20`).
    gamePage.typeGuessField('20')
    //2.  Click the "GUESS" button.
    gamePage.clickGuessButton()
    //*   Verify the message area displays: **"My number is smaller.\n Try Again!"**.
    gamePage.displayMessage('My number is smaller. Try Again!')
    //*   Verify the guess `20` is added to the previous guesses list.
    gamePage.displayPreviousGuess('20')
    // *   Verify the attempts counter increments.
    gamePage.attemptsCount('1 / 10')
    //*   Verify the input field is cleared and retains focus.
    gamePage.clear()
    gamePage.focused()
  })
  it('TS888-006: Validate Input Boundary (Lower): Number 1', () => {
    //1.  Enter the value `1`.
    gamePage.typeGuessField('1')
    //2.  Click the "GUESS" button.
    gamePage.clickGuessButton()
    //*   Verify the input is processed as a valid guess (no error message).
    gamePage.displayNoError()
    //*   Verify the attempts counter increments.
    gamePage.attemptsCount('1 / 10')
  })
  it('TS888-007: Validate Input Boundary (Upper): Number 50', () => {
    //1.  Enter the value `50`.
    gamePage.typeGuessField('50')
    //2.  Click the "GUESS" button.
    gamePage.clickGuessButton()
    // *   Verify the input is processed as a valid guess (no error message).
    gamePage.displayNoError()
    // *   Verify the attempts counter increments.
    gamePage.attemptsCount('1 / 10')
  })
  it('TS888-008: Verify Error for Out-of-Range Input (Low: 0)', () => {
    //1.  Enter the value `0`.
    gamePage.typeGuessField('0')
    //2.  Click the "GUESS" button.
    gamePage.clickGuessButton()
    //*   Verify the message area displays: **"ERROR:\nInput should be between 1 & 50"**.
    gamePage.displayErrorMessage()
    //*   Verify the attempts counter does **not** increment.
    gamePage.notCount()
    //*   Verify the guess is **not** added to the previous guesses list.
    gamePage.notDisplayPreviousGuess('0')
  })
  it('TS888-009: Verify Error for Out-of-Range Input (High: 51)', () => {
    //1.  Enter the value `51`.
    gamePage.typeGuessField('51')
    //2.  Click the "GUESS" button.
    gamePage.clickGuessButton()
    //*   Verify the message area displays: **"ERROR:\nInput should be between 1 & 50"**.
    gamePage.displayErrorMessage()
    //*   Verify the attempts counter does **not** increment.
    gamePage.notCount()
    //*   Verify the guess is **not** added to the previous guesses list.
    gamePage.notDisplayPreviousGuess('51')
  })
  it('TS888-010: Verify Error for Negative Input', () => {
    //1.  Enter a negative value (e.g., `-5`).
    gamePage.typeGuessField('-5')
    //2.  Click the "GUESS" button.
    gamePage.clickGuessButton()
    //*   Verify the message area displays the out-of-range error message.
    gamePage.displayErrorMessage()
    //*   Verify the attempts counter does **not** increment.
    gamePage.notCount()
    //*   Verify the guess is **not** added to the previous guesses list.
    gamePage.notDisplayPreviousGuess()
  })
  it('TS888-011: Verify Error for Non-Numeric Input', () => {
    //1.  Enter a non-numeric value (e.g., `abc`).//2.  Click the "GUESS" button.
    cy.Guess('abc')
    //*   Verify the application displays an error.
    gamePage.displayErrorMessage()
    //*   Verify the attempts counter does **not** increment.
    gamePage.notCount()
    //*   Verify the guess is **not** added to the previous guesses list.
    gamePage.notDisplayPreviousGuess()
  })
  it('TS888-012: Verify Game Over After 10 Incorrect Attempts (Lose Condition)', () => {
    //1.  Enter 10 incorrect guesses (e.g., numbers that are not 12).
    for (let index = 0; index < 11; index++) {
      cy.Guess(index)
    }
    //*   Verify on the 10th attempt, the card flips, revealing the secret number (12).
    cy.get('#cardValue').should('contain.text', '12')
    //*   Verify the message area displays: **"Game Over! You've used all your attempts."**.
    gamePage.displayMessage("Game Over! You've used all your attempts.")
    //*   Verify the "GUESS" button is replaced with a "RESET" button.
    cy.get('#reset').should('contain.text', 'RESET')
    //*   Verify the input field is disabled.
    cy.get('#guessField').should('be.disabled')
    //*   Verify the attempts counter shows **"10 / 10"**.
    gamePage.attemptsCount('10 / 10')
  })
  it('TS888-013: Verify "RESET" Button Functionality After Win', () => {
    //1.  Complete a winning game (e.g., guess `12`).
    cy.Guess('12')
    //2.  Click the `[data-testid="reset"]` button.
    gamePage.clickReset()
    //*   Verify the page reloads and returns to the initial state described in TS888-001.
    gamePage.initialLoad()
  })
  it('TS888-014: Verify "RESET" Button Functionality After Loss', () => {
    //1.  Complete a losing game (e.g., 10 wrong guesses).
    for (let index = 0; index < 11; index++) {
      cy.Guess(index)
    }
    //2.  Click the `[data-testid="reset"]` button.
    gamePage.clickReset()
    //*   Verify the page reloads and returns to the initial state described in TS888-001.
    gamePage.initialLoad()
  })
  it('TS888-015: Verify Attempts Counter Increments Only on Valid Guesses', () => {
    //1.  Enter `0` (invalid). Click "GUESS".
    cy.Guess('0')
    //*   Verify attempts counter remains unchanged from initial state (e.g., " / 10").
    gamePage.notCount()
    //2.  Enter `60` (invalid). Click "GUESS".
    cy.Guess('60')
    //*   Verify attempts counter remains unchanged.
    gamePage.notCount()
    //3.  Enter `5` (valid). Click "GUESS".
    cy.Guess('5')
    //*   Verify attempts counter now reads "1 / 10".
    gamePage.attemptsCount('1 / 10')
    //4.  Enter `30` (valid). Click "GUESS".
    cy.Guess('30')
    //*   Verify attempts counter now reads "2 / 10".
    gamePage.attemptsCount('2 / 10')
    //5.  Enter `12` (valid). Click "GUESS".
    cy.Guess('12')
    //*   Verify attempts counter now reads "3 / 10".
    gamePage.attemptsCount('3 / 10')
  })
  it('TS888-016: Verify Sequential Guesses with Mixed Feedback', () => {
    //1.  Guess `5`.
    cy.Guess('5')
    //*   Verify message is "My number is larger.\n Try Again!".
    gamePage.displayMessage('My number is larger. Try Again!')
    //2.  Guess `20`.
    cy.Guess('20')
    //*   Verify message is "My number is smaller.\n Try Again!".
    gamePage.displayMessage('My number is smaller. Try Again!')
    //3.  Guess `12`.
    cy.Guess('12')
    //*   Verify message is "Congratulations! You guessed the number!".
    gamePage.displayMessage('Congratulations! You guessed the number!')
    //*   Verify previous guesses list contains `5`, `20`, and `12` in that order.
    cy.get('.boxed').should('contain.text', '5')
    cy.get('.boxed').should('contain.text', '20')
    cy.get('.boxed.guessed').should('contain.text', '12')

    //*   Verify final attempts counter is `3 / 10`.
    gamePage.attemptsCount('3 / 10')
  })
  it('**TS888-017: Verify Input via Keyboard "Enter" Key', () => {
    //1.  Enter a value (e.g., `10`) into the input field.
    gamePage.typeGuessField('10')
    //2.     Press the `Enter` key on the keyboard.
    gamePage.typeGuessField('{enter}')
    //*   Verify the guess is submitted and feedback is provided, identical to clicking the "GUESS" button.
    gamePage.displayPreviousGuess('10')
  })
  it('TS888-018: Verify Previous Guesses Styling and Order', () => {
    //1.  Make guesses in this order: `25`, `10`, `12`.
    cy.Guess('25')
    cy.Guess('10')
    cy.Guess('12')
    //*   Verify the `#guesses` container displays the guesses in the order: `25`, `10`, `12`.
    cy.get('.boxed').should('contain.text', '25')
    cy.get('.boxed').should('contain.text', '10')
    cy.get('.boxed.guessed').should('contain.text', '12')
    //*   Verify guesses `25` and `10` have only the class `.boxed`.
    cy.get('.boxed').should('contain.text', '25')
    cy.get('.boxed').should('contain.text', '10')
    //*   Verify guess `12` has the classes `.boxed.guessed`.
    cy.get('.boxed.guessed').should('contain.text', '12')
  })
  it('TS888-019: Verify Mixed Out-of-Range and Valid Attempts Count', () => {
    //1.  Enter `0` (invalid).
    cy.Guess('0')
    //*   Expect error message.
    gamePage.displayErrorMessage('ERROR:Input should be between 1 & 50')
    //*   Verify attempts counter still = initial state (e.g., " / 10") (invalid inputs should not count).
    gamePage.notCount()
    //2.  Enter `60` (invalid).
    cy.Guess('60')
    //*   Same expectation. Counter should remain unchanged.
    gamePage.displayErrorMessage('ERROR:Input should be between 1 & 50')
    gamePage.notCount()
    //3.  Enter `5` (valid), `30` (valid), `12` (valid).
    cy.Guess('5')
    cy.Guess('30')
    cy.Guess('12')
    //*   Attempts counter increments only for these valid guesses → should read **"3 / 10"**.
    gamePage.attemptsCount('3 / 10')
  })
})
