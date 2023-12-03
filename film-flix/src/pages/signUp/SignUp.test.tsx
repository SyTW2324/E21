// src/pages/SignUp.test.tsx
import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import SignUp from './SignUp';

// Mockear useNavigate
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // Mantén las implementaciones no mockeadas
    useNavigate: jest.fn(),
}));

const mockResult = {
    data: { /* ... */ },
    error: null,
    loading: false,
};

describe('SignUp Component', () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        // Configurar el componente antes de cada prueba
        wrapper = shallow(<SignUp />);
    });

    it('renders without crashing', () => {
        // Verificar que el componente se renderiza correctamente
        expect(wrapper.exists()).toBe(true);
    });

    it ('renders form elements', () => {
        expect(wrapper.find('form').length).toBe(1);
        expect(wrapper.find('input[type="text"]').length).toBe(1);
        expect(wrapper.find('input[type="password"]').length).toBe(2);
        expect(wrapper.find('button[type="submit"]').length).toBe(1);
    });

    // Después de cada prueba, limpia el componente
    // afterEach(() => {
    //     wrapper.unmount();
    // });
});