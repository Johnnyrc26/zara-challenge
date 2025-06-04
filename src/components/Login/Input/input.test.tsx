import { render, screen, fireEvent } from '@testing-library/react';
import Input from './input';
import '@testing-library/jest-dom';

describe('Input Component', () => {
  it('renders input field with label and placeholder', () => {
    render(
      <Input
        id="test-input"
        label="Test Label"
        placeholder="Test Placeholder"
        inputType="text"
        onChange={jest.fn()}
      />
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Test Placeholder')).toBeInTheDocument();
  });

  it('renders email icon for email input type', () => {
    render(
      <Input
        id="email-input"
        inputType="email"
        onChange={jest.fn()}
      />
    );
    expect(screen.getByTestId('fa-envelope-icon')).toBeInTheDocument(); 
  });

  it('renders lock icon and password toggle for password input type', () => {
    render(
      <Input
        id="password-input"
        inputType="password"
        onChange={jest.fn()}
      />
    );
    expect(screen.getByTestId('fa-lock-icon')).toBeInTheDocument(); 
    expect(screen.getByRole('button', { name: /mostrar contraseña/i })).toBeInTheDocument();
  });

  it('updates input value on change', () => {
    const handleChange = jest.fn();
    render(
      <Input
        id="test-input"
        inputType="text"
        onChange={handleChange}
      />
    );

    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'Test Value' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('toggles password visibility', () => {
    render(
      <Input
        id="password-input"
        inputType="password"
        onChange={jest.fn()}
      />
    );

    const passwordInput = screen.getByLabelText(/contraseña/i) as HTMLInputElement; 
    const toggleButton = screen.getByRole('button', { name: /mostrar contraseña/i });

    expect(passwordInput.type).toBe('password');

    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('text');
    expect(screen.getByRole('button', { name: /ocultar contraseña/i })).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('password');
    expect(screen.getByRole('button', { name: /mostrar contraseña/i })).toBeInTheDocument();
  });

  it('displays error message and applies error styles', () => {
    render(
      <Input
        id="error-input"
        inputType="text"
        onChange={jest.fn()}
        error="This is an error message"
      />
    );

    expect(screen.getByText('This is an error message')).toBeInTheDocument();
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass('input-field--error');
  });

  it('does not render label if not provided', () => {
    render(<Input id="no-label-input" inputType="text" onChange={jest.fn()} />);
    expect(screen.queryByLabelText(/.*/)).not.toBeInTheDocument(); 
  });

  it('renders with custom className', () => {
    render(
      <Input
        id="custom-class-input"
        inputType="text"
        onChange={jest.fn()}
        className="my-custom-class"
      />
    );
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass('my-custom-class');
  });
});


jest.mock('react-icons/fa', () => ({
  ...jest.requireActual('react-icons/fa'),
  FaEnvelope: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} data-testid="fa-envelope-icon" />,
  FaLock: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} data-testid="fa-lock-icon" />,
}));
