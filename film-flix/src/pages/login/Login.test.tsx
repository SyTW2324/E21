import { shallow } from "enzyme";
import Login from "./Login";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

describe("Login Component", () => {
  it("renders form elements", () => {
    const wrapper = shallow(<Login />);

    expect(wrapper.find("form").length).toBe(1);

    expect(wrapper.find("input#email").length).toBe(1);
    expect(wrapper.find('input#email[type="email"]').length).toBe(1);
    expect(wrapper.find('input#email[autoComplete="email"]').length).toBe(1);
    expect(wrapper.find("input#email[required]").length).toBe(1);
    expect(
      wrapper.find('input#email[placeholder="email@example.com"]').length
    ).toBe(1);
    expect(wrapper.find("input#email.w-full").length).toBe(1);

    expect(wrapper.find("input#password").length).toBe(1);
    expect(wrapper.find('input#password[type="password"]').length).toBe(1);
    expect(
      wrapper.find('input#password[autoComplete="current-password"]').length
    ).toBe(1);
    expect(wrapper.find("input#password[required]").length).toBe(1);
    expect(
      wrapper.find('input#password[placeholder="• • • • • • • •"]').length
    ).toBe(1);
    expect(wrapper.find("input#password.w-full").length).toBe(1);

    expect(wrapper.find('[aria-label="Username"]').length).toBe(0);
    expect(wrapper.find('[aria-label="Password"]').length).toBe(0);
  });
});
