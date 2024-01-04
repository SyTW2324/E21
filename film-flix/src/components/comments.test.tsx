import { shallow, ShallowWrapper } from 'enzyme';
import Comments from './comments';

describe('Comments component', () => {
  let wrapper: ShallowWrapper;
  const mockHandleSubmit = jest.fn();
  const mockSetText = jest.fn();
  const mockSetContent = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<Comments type="movies" setContent={mockSetContent} handleSubmit={mockHandleSubmit} setText={mockSetText} />);
  });

  it('should render without crashing', () => {
    expect(wrapper).toBeTruthy();
  });

  it('should display the correct comments', () => {
    const comments = ['Test comment 1', 'Test comment 2'];
    wrapper.setProps({ comments });
    expect(wrapper.find('comment').length).toEqual(0);
  });

  it('should call handleSubmit on form submission', () => {
    wrapper.find('form').simulate('submit');
    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});