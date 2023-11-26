// src/pages/Login.test.tsx
import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Login from './Login';

// Esto es otra forma de poder implementar los distintos test de un componente
describe('Login Component', () => {
    it('renders form elements', () => {
        // Renderiza el componente Login
        const wrapper = shallow(<Login />);

        // Verifica que el formulario existe
        expect(wrapper.find('form').length).toBe(1);

        // Verifica que hay un campo de entrada de texto con las propiedades específicas
        expect(wrapper.find('input#email').length).toBe(1);
        expect(wrapper.find('input#email[type="email"]').length).toBe(1);
        expect(wrapper.find('input#email[autoComplete="email"]').length).toBe(1);
        expect(wrapper.find('input#email[required]').length).toBe(1);
        expect(wrapper.find('input#email[placeholder="email@example.com"]').length).toBe(1);
        expect(wrapper.find('input#email.w-full').length).toBe(1);

        // Verifica que hay un campo de entrada de contraseña con las propiedades específicas
        expect(wrapper.find('input#password').length).toBe(1);
        expect(wrapper.find('input#password[type="password"]').length).toBe(1);
        expect(wrapper.find('input#password[autoComplete="current-password"]').length).toBe(1);
        expect(wrapper.find('input#password[required]').length).toBe(1);
        expect(wrapper.find('input#password[placeholder="• • • • • • • •"]').length).toBe(1);
        expect(wrapper.find('input#password.w-full').length).toBe(1);
    });
});