
import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import LoginForm from './loginform';
import { vi } from 'vitest';

// Mockear useNavigate
vi.mock('react-router-dom', () =>{
    return{useNavigate: vi.fn()}
})  

describe('LoginForm', () =>{

    // Tests that an error message is displayed when an invalid email is submitted
    test("Email invalid", async () => {
        const { getByPlaceholderText, getByText} = render(<LoginForm />);
    
        fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'invalidemail' } });
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password' } });
        fireEvent.click(getByText('Submit'));
    
        await waitFor(() => expect(getByText('Invalid email')).toBeInTheDocument());
    });

    // Tests that an error message is displayed when an invalid password is submitted
    test("Password invalid", async () => {
        const { getByPlaceholderText, getByText } = render(<LoginForm />);
    
        fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test@test.com' } });
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: '' } });
        fireEvent.click(getByText('Submit'));
    
        await waitFor(() => expect(getByText('Password required')).toBeInTheDocument());
    });

    test('should render the form', () => {
        render(<LoginForm />);
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const submitButton = screen.getByText('Submit');        
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    }); 
})










