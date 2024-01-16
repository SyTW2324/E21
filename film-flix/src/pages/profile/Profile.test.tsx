import { shallow, ShallowWrapper } from "enzyme";
import Profile from "./Profile";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock('../../components/navbar/navbar', () => ({
  __esModule: true,
  ...jest.requireActual('../../components/navbar/navbar'),
  footer: jest.fn()
}));

jest.mock('../../components/footer/footer', () => ({
  __esModule: true,
  ...jest.requireActual('../../components/footer/footer'),
  footer: jest.fn()
}));

describe("Profile Component", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Profile />);
  });

  it("renders without crashing", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders profile elements", () => {
    expect(wrapper.find("section").length).toBe(1);
    expect(wrapper.find("h2").length).toBe(1);
    expect(wrapper.find("p").length).toBe(1);
    expect(wrapper.find("div").length).toBe(11);
    expect(wrapper.find("label").length).toBe(4);
  });

  afterEach(() => {
      wrapper.unmount();
  });
});
