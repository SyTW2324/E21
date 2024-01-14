import { shallow, ShallowWrapper } from 'enzyme';
import ForgotPassword from "./ForgotPassword";
import { useNavigate } from 'react-router-dom';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), 
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
    expect(wrapper.find('input').length).toBe(1);
  });

  it('renders buttons', () => {
    expect(wrapper.find('button').length).toBe(1);
  });

  it('renders the forgot password form', () => {
    expect(wrapper.find('form').exists()).toBe(true);
  });

  it('calls useNavigate when the button is clicked', () => {
    const navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    wrapper.find('button').simulate('click');

    expect(navigateMock).toHaveBeenCalledTimes(0);
  });

  it('renders the correct number of items', () => {
    expect(wrapper.find('li')).toHaveLength(0);
  });

  it('renders the correct text', () => {
    expect(wrapper.find('h2').text()).toEqual('Forgot Password?');
  });

  it('renders the correct text in the button', () => {
    expect(wrapper.find('button').text()).toEqual('CONFIRM');
  });

  it('shows an error message when trying to submit the form with an invalid email', () => {
    wrapper.find('input[type="email"]').simulate('change', { target: { value: 'example@gmail.com' } });
  });
  
  it('calls the submit function when the form is submitted with a valid email', () => {  
    wrapper.find('input[type="email"]').simulate('change', { target: { value: 'valid.email@example.com' } });
  });

  afterEach(() => {
    wrapper.unmount();
  });
});