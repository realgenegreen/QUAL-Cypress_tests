export class FormTyping{
    typeUsername (username) {
        cy.get('#username')
                .focus()
                .type(username)
    }
    typePassword (password) {
        cy.get('#password')
                .focus()
                .type(password)
    }
}

export const FormTypingEx = new FormTyping

