/// <reference types="Cypress" />

describe('reglog-forms-tests', () => {
    
    context('register_form', () => {

        it('runs', () => {

            cy.visit ('localhost:8080/register')

            cy.get('.register-btn')
                .click()
                // .get('.user-card')
                // .should('contain.text', 'Ошибка')
                // .wait(2000)
            cy.contains('Ошибка')
                .wait(500)

            cy.get('#username')
                .focus()
                .type('string')
            
            cy.get('#password')
                .focus()
                .type('string')
                .should('be.empty')
                .get('.input-group-append > .btn')
                .click()
                .get('#password')
                .should('be.empty')
                .should('have.value', 'string')
            
            cy.intercept('POST', 'http://localhost:5001/register').as('getData')

            cy.get('.d-flex > .btn')
                .click()
                // .wait(2000)
            
            cy.wait('@getData', {timeout: 1000})
                .then(interception => {
                    expect(interception.response.statusCode).to.equal(200)
                    })
                
        })

    })

    context('login_form', () => {

        it('runs', () => {

            cy.visit ('localhost:8080/login')

            cy.get('#username')
                .focus()
                .type('string')

            cy.get('#password')
                .focus()
                .type('string')

            cy.intercept('POST', 'http://localhost:5001/login').as('getData')

            cy.get('.btn')
                .click()

            cy.wait('@getData', {timeout: 1000})
                .then(interception => {
                    expect(interception.response.statusCode).to.equal(200)
                    })

        })
    })
})