import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuthForm from '../components/Login';

// Mock the onLogin function using Vitest's vi.fn()
const mockOnLogin = vi.fn();

describe('AuthForm', () => {
  test('should render login form by default', () => {
    render(<AuthForm onLogin={mockOnLogin} />);

    // Check that the form initially shows "Login"
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
  });

  test('should switch to register form when clicking "Register here"', () => {
    render(<AuthForm onLogin={mockOnLogin} />);

    // Check that initially the form is in login state
    expect(screen.getByText('Login')).toBeInTheDocument();

    // Click the "Register here" button to switch to registration form
    fireEvent.click(screen.getByText('Register here'));

    // Now the form should switch to "Register"
    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your full name')).toBeInTheDocument();
  });

  test('should show login form after successful registration', () => {
    render(<AuthForm onLogin={mockOnLogin} />);

    // Switch to register form
    fireEvent.click(screen.getByText('Register here'));

    // Fill out the registration form
    fireEvent.change(screen.getByPlaceholderText('Your full name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('you@example.com'), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'password123' },
    });

    // Submit registration form
    fireEvent.click(screen.getByText('Register'));

    // After successful registration, the form should switch back to login
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('should show an alert when invalid login credentials are provided', async () => {
    // Use mock to spy on the global alert function
    window.alert = vi.fn();

    render(<AuthForm onLogin={mockOnLogin} />);

    // Fill out login form with incorrect credentials
    fireEvent.change(screen.getByPlaceholderText('you@example.com'), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'wrongpassword' },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Login'));

    // Ensure alert is called with the expected message
    expect(window.alert).toHaveBeenCalledWith('Invalid email or password');
  });

  test('should call onLogin with true on successful login', async () => {
    render(<AuthForm onLogin={mockOnLogin} />);

    // Fill out the login form with valid credentials
    fireEvent.change(screen.getByPlaceholderText('you@example.com'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'password123' },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Login'));

    // Wait for onLogin to be called
    await waitFor(() => expect(mockOnLogin).toHaveBeenCalledWith(true));
  });

  test('should show alert when registering with missing fields', async () => {
    render(<AuthForm onLogin={mockOnLogin} />);

    // Switch to the register form
    fireEvent.click(screen.getByText('Register here'));

    // Leave name or email blank and submit
    fireEvent.change(screen.getByPlaceholderText('you@example.com'), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: '' },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Register'));

    // Check if the alert shows "Please fill in all fields"
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Please fill in all fields'));
  });
});
