export const existingAccounts = [
    {
        _id: "667a07de7ef68e8b25ffa8d8",
        email: "test1@email.com",
        username: "testuser1",
        password: "testpass",
        icon: 0,
    },
    {
        _id: "667a088b9c6f69cef857c71f",
        email: "test2@email.com",
        username: "testuser2",
        password: "testpass",
        icon: 1,
    },
    {
        _id: "667a088f1d6a5c44d340c587",
        email: "test3@email.com",
        username: "testuser3",
        password: "testpass",
        icon: 2,
    },
    {
        _id: "667a0892ac12e6c3b167fe15",
        email: "test4@email.com",
        username: "testuser4",
        password: "testpass",
        icon: 3,
    },
    {
        _id: "667a08958a1fb3fde2cf583f",
        email: "test5@email.com",
        username: "testuser5",
        password: "testpass",
        icon: 4,
    }
];


export const testLogins = {
    withEmail: {
        identifier: "test1@email.com",
        password: "testpass",
    },
    withUsername: {
        identifier: "testuser1",
        password: "testpass",
    },
    withNoMatch: {
        identifier: "testuser99",
        password: "testpass",
    },
    withWrongPass: {
        identifier: "testuser1",
        password: "wrongPass",
    },
}

export const newAccounts = {
    valid: {
        username: "newTestUser",
        email: "newTestUser@email.com",
        password: "newTestPass"
    },
    
    noUsername: {
        email: "newTestUser@email.com",
        password: "newTestPass"
    },
    emptyUsername: {
        username: "",
        email: "newTestUser@email.com",
        password: "newTestPass"
    },
    
    noEmail: {
        username: "newTestUser",
        password: "newTestPass"
    },
    emptyEmail: {
        username: "newTestUser",
        email: "",
        password: "newTestPass"
    },
    invalidEmail: {
        username: "newTestUser",
        email: "newTestUser",
        password: "newTestPass"
    },
    
    noPassword: {
        username: "newTestUser",
        email: "newTestUser@email.com",
    },
    emptyPassword: {
        username: "newTestUser",
        email: "newTestUser@email.com",
        password: ""
    },
    
    existingUsername: {
        username: "testuser1",
        email: "newTestUser@email.com",
        password: "newTestPass"
    },
    existingEmail: {
        username: "newTestUser",
        email: "test1@email.com",
        password: "newTestPass"
    },
};