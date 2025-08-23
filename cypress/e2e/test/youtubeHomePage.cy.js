


describe('youtube search engine', () => {
  beforeEach(() => {
        cy.visit('https://www.youtube.com/');
    })
  it('[TS-001] Validate the search button', () => {
    //1. Validate the visibility of Search text field
      cy.get('[name="search_query"]').should('be.visible').and('be.enabled');
    //2. Validate the visibility of Search button
      cy.get('[class="ytSearchboxComponentSearchButton ytSearchboxComponentSearchButtonDark"]').should('be.visible');
    //3. Verify if the search text field can input some text ="cypress"
      cy.get('[name="search_query"]').type("cypress");
    //4. Verify if the search button is clickable
      cy.get('[class="ytSearchboxComponentSearchButton ytSearchboxComponentSearchButtonDark"]').click();
      
  });

})