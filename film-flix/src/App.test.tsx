import { shallow, ShallowWrapper } from 'enzyme';
import App from './App';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

describe('App component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should render without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a div with the class App', () => {
    expect(wrapper.find('div.App').exists()).toBe(true);
  });

  it('should render a BrowserRouter component', () => {
    expect(wrapper.find('BrowserRouter').exists()).toBe(true);
  });

  it('should render a Routes component', () => {
    expect(wrapper.find('Routes').exists()).toBe(true);
  });

  it('should render a Route component with the path "/"', () => {
    expect(wrapper.find('Route[path="/"]').exists()).toBe(true);
  });

  it('should render a Route component with the path "/movies"', () => {
    expect(wrapper.find('Route[path="/movies"]').exists()).toBe(true);
  });

  it('should render a Route component with the path "/movies/:id"', () => {
    expect(wrapper.find('Route[path="/movies/:id"]').exists()).toBe(true);
  });

  it('should render a Route component with the path "/series"', () => {
    expect(wrapper.find('Route[path="/series"]').exists()).toBe(true);
  });

  it('should render a Route component with the path "/series/:id"', () => {
    expect(wrapper.find('Route[path="/series/:id"]').exists()).toBe(true);
  });

  it('should render a Route component with the path "/profile"', () => {
    expect(wrapper.find('Route[path="/profile"]').exists()).toBe(true);
  });

  it('should render a Route component with the path "/login"', () => {
    expect(wrapper.find('Route[path="/login"]').exists()).toBe(true);
  });

  it('should render a Route component with the path "/register"', () => {
    expect(wrapper.find('Route[path="/register"]').exists()).toBe(true);
  });

  it('should render a Route component with the path "/reset-password/:resetToken"', () => {
    expect(wrapper.find('Route[path="/reset-password/:resetToken"]').exists()).toBe(true);
  });

  it('should render a Route component with the path "/forgot-password"', () => {
    expect(wrapper.find('Route[path="/forgot-password"]').exists()).toBe(true);
  });

  it('should render a Route component with the path "/404"', () => {
    expect(wrapper.find('Route[path="/404"]').exists()).toBe(true);
  });

  it('should render a Route component with the path "*"', () => {
    expect(wrapper.find('Route[path="*"]').exists()).toBe(true);
  });

  it('should render a Home component', () => {
    expect(wrapper.find('Home').exists()).toBe(false);
  });

  it('should render a Content component with the type prop "movies"', () => {
    expect(wrapper.find('Content[type="movies"]').exists()).toBe(false);
  });

  it('should render a ContentInfo component with the type prop "movies"', () => {
    expect(wrapper.find('ContentInfo[type="movies"]').exists()).toBe(false);
  });

  it('should render a Content component with the type prop "series"', () => {
    expect(wrapper.find('Content[type="series"]').exists()).toBe(false);
  });

  it('should render a ContentInfo component with the type prop "series"', () => {
    expect(wrapper.find('ContentInfo[type="series"]').exists()).toBe(false);
  });

  it('should render a Profile component', () => {
    expect(wrapper.find('Profile').exists()).toBe(false);
  });

  it('should render a Login component', () => {
    expect(wrapper.find('Login').exists()).toBe(false);
  });

  it('should render a SignUp component', () => {
    expect(wrapper.find('SignUp').exists()).toBe(false);
  });

  it('should render a ResetPassword component', () => {
    expect(wrapper.find('ResetPassword').exists()).toBe(false);
  });

  it('should render a ForgotPassword component', () => {
    expect(wrapper.find('ForgotPassword').exists()).toBe(false);
  });

  it('should render a NotFound component', () => {
    expect(wrapper.find('NotFound').exists()).toBe(false);
  });
});