import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />);
});

test('renders the contact form header', () => {
    //Arrange
    render(<ContactForm />);

    //Act
    const header = screen.getByText(/Contact Form/i);

    //Assert
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    //Arrange
    render(<ContactForm />);

    //Act
    const firstNameInput = screen.queryByLabelText(/First Name*/i);
    userEvent.type(firstNameInput, 'A');

    //Assert
    await waitFor(() => {
        const firstNameFeedback = screen.queryByText(/Error: firstName must have at least 5 characters/i);
        expect(firstNameFeedback).toBeInTheDocument();
    })
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    //Arrange
    render(<ContactForm />);

    //Act
    const submitBtn = screen.getByRole('button');
    userEvent.click(submitBtn);

    //Assert
    await waitFor(() => {
        const firstNameFeedback = screen.queryByText(/Error: firstName must have at least 5 characters/i);
        const lastNameFeedback = screen.queryByText(/Error: lastName is a required field/i);
        const emailFeedback = screen.queryByText(/Error: email must be a valid email address/i);
        expect(firstNameFeedback).toBeInTheDocument();
        expect(lastNameFeedback).toBeInTheDocument();
        expect(emailFeedback).toBeInTheDocument();
    })
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    //Arrange
    render(<ContactForm />);

    //Act
    const firstNameInput = screen.queryByLabelText(/First Name*/i);
    userEvent.type(firstNameInput, 'George');

    const lastNameInput = screen.queryByLabelText(/Last Name*/i);
    userEvent.type(lastNameInput, 'Washington');

    const submitBtn = screen.getByRole('button');
    userEvent.click(submitBtn);

    // Assert 
    await waitFor(() => {
        const emailFeedback = screen.queryByText(/Error: email must be a valid email address/i);
        expect(emailFeedback).toBeInTheDocument();
    })

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    //Arrange
    render(<ContactForm />);

    //Act
    const firstNameInput = screen.queryByLabelText(/First Name*/i);
    userEvent.type(firstNameInput, 'George');

    const lastNameInput = screen.queryByLabelText(/Last Name*/i);
    userEvent.type(lastNameInput, 'Washington');

    const emailInput = screen.queryByLabelText(/Email*/i);
    userEvent.type(emailInput, 'george.washington');

    const submitBtn = screen.getByRole('button');
    userEvent.click(submitBtn);

    // Assert 
    await waitFor(() => {
        const emailFeedback = screen.queryByText(/Error: email must be a valid email address/i);
        expect(emailFeedback).toBeInTheDocument();

    });
})

// test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

// });

// test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {

// });

// test('renders all fields text when all fields are submitted.', async () => {

// });
