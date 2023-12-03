import { shallow, ShallowWrapper } from 'enzyme';
import Profile from './Profile';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('Profile Component', () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        // Configurar el componente antes de cada prueba
        wrapper = shallow(<Profile />);
    });

    it('renders without crashing', () => {
        // Verificar que el componente se renderiza correctamente
        expect(wrapper.exists()).toBe(true);
    });

    it ('renders profile elements', () => {
        expect(wrapper.find('section').length).toBe(1);
        expect(wrapper.find('h2').length).toBe(1);
        expect(wrapper.find('p').length).toBe(1);
        expect(wrapper.find('div').length).toBe(4);
        expect(wrapper.find('label').length).toBe(3);
        expect(wrapper.find('div').length).toBe(4);
    });

    // Después de cada prueba, limpia el componente
    // afterEach(() => {
    //     wrapper.unmount();
    // });
});