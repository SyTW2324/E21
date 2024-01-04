import { shallow, ShallowWrapper } from 'enzyme';
import ForgotPassword from "./ForgotPassword";

// Mockear useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // Mantén las implementaciones no mockeadas
  useNavigate: jest.fn(),
}));

describe('ForgotPassword Component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<ForgotPassword />);
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders content', () => {
    expect(wrapper.find('div').length).toBe(8);
  });

  it ('renders content elements', () => {
    expect(wrapper.find('div').length).toBe(8);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('p').length).toBe(0);
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('h1').length).toBe(0);
    expect(wrapper.find('ul').length).toBe(0);
  });

  it('renders buttons', () => {
    expect(wrapper.find('button').length).toBe(1);
  });

  afterEach(() => {
    wrapper.unmount();
  });
});