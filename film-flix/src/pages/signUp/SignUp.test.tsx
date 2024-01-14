import { shallow, ShallowWrapper } from "enzyme";
import SignUp from "./SignUp";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("SignUp Component", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<SignUp />);
  });

  it("renders without crashing", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders form elements", () => {
    expect(wrapper.find("form").length).toBe(1);
    expect(wrapper.find('input[type="text"]').length).toBe(1);
    expect(wrapper.find('input[type="password"]').length).toBe(2);
    expect(wrapper.find('button[type="submit"]').length).toBe(1);
  });
});
