export class FormTyping{
    typeUsername (username) {
        cy.get('#username')
                .focus()
                .type(username)
    }
    typePassword (password) {
        cy.get('#password')
                .focus()
                .type('string')
    }
}

export const FormTypingEx = new FormTyping