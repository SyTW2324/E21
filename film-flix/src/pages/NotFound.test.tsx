import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import NotFound from './NotFound';

describe('NotFound Component', () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        // Configurar el componente antes de cada prueba
        wrapper = shallow(<NotFound />);
    });

    it('renders without crashing', () => {
        // Verificar que el componente se renderiza correctamente
        expect(wrapper.exists()).toBe(true);
    });

    it ('renders 404 error message', () => {
        expect(wrapper.find('h1').text()).toBe('404');
        expect(wrapper.find('p').length).toBe(2);
        expect(wrapper.find('a').length).toBe(1);
    });

    // Después de cada prueba, limpia el componente
    // afterEach(() => {
    //     wrapper.unmount();
    // });
});
