import { shallow, ShallowWrapper } from 'enzyme';
import ContentInfo from "./contentInfo";

jest.mock('../../components/footer', () => ({
  __esModule: true,
  ...jest.requireActual('../../components/footer'),
  footer: jest.fn()
}));

jest.mock('../../components/navbar', () => ({
  __esModule: true,
  ...jest.requireActual('../../components/navbar'),
  footer: jest.fn()
}));

// Mockear useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // Mantén las implementaciones no mockeadas
  useNavigate: jest.fn(),
}));

describe('ContentInfo Component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    // Configurar el componente antes de cada prueba
    wrapper = shallow(<ContentInfo type='movies' />);
  });

  it('renders without crashing', () => {
    // Verificar que el componente se renderiza correctamente
    expect(wrapper.exists()).toBe(true);
  });

  it('renders content', () => {
    expect(wrapper.find('div').length).toBe(19);
  });

  it ('renders content elements', () => {
    expect(wrapper.find('div').length).toBe(19);
    expect(wrapper.find('h2').length).toBe(9);
    expect(wrapper.find('p').length).toBe(8);
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('h1').length).toBe(1);
    expect(wrapper.find('ul').length).toBe(0);
  });

  it('renders buttons', () => {
    expect(wrapper.find('button').length).toBe(1);
  });

  afterEach(() => {
      wrapper.unmount();
  });
});