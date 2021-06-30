describe("user can navigate to profiles page", () => {
    beforeEach(() => {
        cy.visit('localhost:3000');
    });
    it("profile card got rendered", () => {
        cy.get('[data-testid="profiles"]').should("exist");
        cy.get('[data-testid="profile"]').should("exist").should('have.length', 60);
    });

    it("Profiles get ordered properly", () => {
        cy.get('[data-testid="ddlOrder"]').should("exist");
    })
})