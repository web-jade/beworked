export default class User {
    constructor(
        id,
        email,
        emailVerified,
        displayName,
        confirmRegistration,
        firstName,
        lastName
    ) {
        this.id = id
        this.email = email
        this.emailVerified = emailVerified
        this.displayName = displayName
        this.confirmRegistration = confirmRegistration
        this.firstName = firstName
        this.lastName = lastName
    }
}
