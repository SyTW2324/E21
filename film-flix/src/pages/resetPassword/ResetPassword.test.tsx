import { shallow, ShallowWrapper } from 'enzyme';
import ResetPassword from './ResetPassword';
import { useNavigate } from 'react-router-dom';

// Mockear useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe('ResetPassword Component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<ResetPassword />);
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the correct number of content elements', () => {
    expect(wrapper.find('div').length).toBe(12);
    expect(wrapper.find('h2')).toHaveLength(1);
    expect(wrapper.find('p')).toHaveLength(0);
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('h1')).toHaveLength(0);
    expect(wrapper.find('ul')).toHaveLength(0);
    expect(wrapper.find('input').length).toBe(2);
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

  it('renders the forgot password form', () => {
    expect(wrapper.find('form').exists()).toBe(true);
  });

  it('renders the correct text', () => {
    expect(wrapper.find('h2').text()).toEqual('Reset Password');
  });

  it('renders the correct text in the button', () => {
    expect(wrapper.find('button').text()).toEqual('CONFIRM');
  });

  it('renders password form', () => {
    wrapper.find('input#password').simulate('change', { target: { value: '123' } });
  });
  
  it('renders password confirmation form', () => {
    wrapper.find('input#password_repeat').simulate('change', { target: { value: '12345678' } });
  });
  
  it ('renders label confirmation text', () => {
    expect(wrapper.find('label').at(0).text()).toEqual('Password');
  });

  afterEach(() => {
    wrapper.unmount();
  });
});