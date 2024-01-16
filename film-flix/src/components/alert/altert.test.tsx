import { shallow, ShallowWrapper } from 'enzyme';
import Alert from './alert';

describe('Alert component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Alert />);
  });

  it('should render without crashing', () => {
    expect(wrapper).toBeTruthy();
  });

  it('should display the correct message', () => {
    const message = 'Test message';
    wrapper.setProps({ message });
    expect(wrapper.text()).toContain(message);
  });

  it('should apply the correct alert type', () => {
    const type = 'success';
    wrapper.setProps({ type });
    expect(wrapper.hasClass(`alert-${type}`)).toBe(false);
  });
});